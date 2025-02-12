// src/api/chat.ts
import { collection, query, where, orderBy, addDoc, serverTimestamp, getDocs, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Chat, Message } from '../types/types/chat.type';
import database from '@react-native-firebase/database'; // For Realtime Database
import { getCurrentUser } from './auth';
import Email from 'react-native-email-link';
import axios from 'axios';
import i18n from '../i18n';
import { getUserById } from './products';


export const getChats = async (userId: string): Promise<Chat[]> => {
  if (!userId) {
    throw new Error('UserId is required');
  }
  const currentUser = await getCurrentUser();
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const participantsNames: string[] = doc.data().participantsNames;
      const OtherUserName = participantsNames.filter(name => name !== currentUser?.fullName)[0];
      return {
        id: doc.id,
        OtherUserName,
        ...doc.data()
      }
    }
    ) as Chat[];
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
export const getOneToOneChatId = async (userId1: string, userId2: string, OtherUserName: string): Promise<string> => {
  const chatId = [userId1, userId2].sort().join('_');
  const chatRef = doc(db, 'chats', chatId);
  const chatDoc = await getDoc(chatRef);
  const currentUser = await getCurrentUser();
  if (chatDoc.exists()) {
    return chatDoc.id;
  }
  await setDoc(chatRef, {
    participants: [userId1, userId2],
    participantsNames: [currentUser?.fullName, OtherUserName],
    createdAt: new Date().toISOString(),
    lastMessage: "",
    lastMessageTime: "",
    messages: []
  });

  return chatId;
};

export const getMessages = async (chatId: string): Promise<Message[]> => {
  if (!chatId) {
    throw new Error('ChatId is required');
  }

  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('sentAt', 'desc'));
    const snapshot = await getDocs(q);
    const messages = snapshot.docs.map(doc => (doc.data())) as Message[];
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (messageToSend: Message, chatId: string) => {
  const { message, receiverId, senderId } = messageToSend;
  const id = database().ref().push().key;
  console.log('chatId:', chatId);
  const messageData = {
    message,
    receiverId,
    sentAt: new Date().toISOString(),
    senderId,
    id
  };



  // Add message to chat
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(messagesRef, messageData);

  // Update chat's last message
  const chatRef = doc(db, 'chats', chatId);
  await updateDoc(chatRef, {
    lastMessage: message,
    lastMessageTime: new Date().toISOString()
  });


  // Send email to receiver
  const receiver = await getUserById(receiverId);
  if (receiver?.email) {
    await sendEmail(receiver.email);
  }
};

const sendEmail = async (email: string) => {
  try {
    const response = await axios.post(
      "https://us-central1-book-store-c2ded.cloudfunctions.net/sendEmail",
      {
        to: email,
        subject: i18n.t('appName'),
        text: i18n.t('gotNewMessage')
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};