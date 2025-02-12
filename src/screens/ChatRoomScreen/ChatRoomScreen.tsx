// src/screens/ChatRoomScreen/ChatRoomScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useQuery, useMutation } from '@tanstack/react-query';
import i18n from '../../i18n';
import { getCurrentUser } from '../../api/auth';
import { getMessages, getOneToOneChatId, sendMessage } from '../../api/chat';
import { Message } from '../../types/types/chat.type';
import LoadingModal from '../../utils/LoadingModal';
import { getUserById } from '../../api/products';
import { toArabicNumbers } from '../../BackEnd/helpers';

const ChatRoomScreen = ({ route, navigation }: any) => {
  const { colors } = useTheme();
  const { otherUserId } = route.params;
  const [messageToSend, setMessageToSend] = useState<Message>({
    message: '',
    receiverId: '',
    senderId: '',
    sentAt: '',
    id: ''
  });

  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  });
  const otherUserQuery = useQuery({
    queryKey: ['otherUser', otherUserId],
    queryFn: () => getUserById(otherUserId),
    enabled: !!otherUserId,

  });



  const getChatIdQuery = useQuery({
    queryKey: ['chatId', userQuery.data?.id, otherUserId],
    queryFn: () => getOneToOneChatId(userQuery.data?.id || "", otherUserId, otherUserQuery.data?.fullName || ""),
    enabled: !!userQuery.data?.id && !!otherUserQuery.data
  });

  const messagesQuery = useQuery({
    queryKey: ['messages', getChatIdQuery.data],
    queryFn: () => getMessages(getChatIdQuery.data || ""),
    enabled: !!getChatIdQuery.data // Only runs after getChatIdQuery completes
  });

  const sendMessageMutation = useMutation({
    mutationFn: () => sendMessage({
      ...messageToSend,
      receiverId: otherUserId,
      senderId: userQuery.data?.id || "",
    }, getChatIdQuery.data || ""),
    onSuccess: () => {
      // messagesQuery.refetch(); // Refresh messages after sending
      setMessageToSend({
        ...messageToSend,
        message: ''
      });
      messagesQuery.refetch()
    }
  });
  //update header 

  useEffect(() => {
    if (!otherUserQuery.data) return;
    navigation.setOptions({
      headerTitle: i18n.t('chatWith') + " " + otherUserQuery.data?.fullName
    });
  }, [otherUserQuery.data]);

  const renderMessage = ({ item }:
    { item: Message }
  ) => {
    const isSender = item.senderId === userQuery.data?.id;
    return (
      <View style={[
        styles.messageContainer,
        isSender ? styles.sentMessage : styles.receivedMessage
      ]}>
        <Text style={
          isSender ? styles.messageTextSender : styles.messageText
        }>{item.message}</Text>
        <Text style={
          isSender ? styles.messageTime : { ...styles.messageTime, color: colors.text }
        }>
          {formatMessageDate(new Date(item.sentAt))} {formatMessageTime(new Date(item.sentAt))}
        </Text>
      </View>
    );
  }

  // console.log(messagesQuery.data);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={messagesQuery.isRefetching}
          onRefresh={() => {
            messagesQuery.refetch()
          }}
        />
      }
      style={{ flex: 1, minHeight: '100%' }}
    >
      <View style={styles.container}>

        {
          messagesQuery.data && messagesQuery.data?.length !== 0 ?
            <FlatList
              data={
                messagesQuery.data || []
              }
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              inverted
              scrollEnabled={false}
            /> : <Text
              style={{
                textAlign: 'center',
                color: colors.text,
                marginTop: 10,
                textAlignVertical: 'center',
                flex: 1
              }}
            >
              {i18n.t('noMessagesYet')}
            </Text>




        }



        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageToSend.message}
            onChangeText={(text) => {
              setMessageToSend({
                ...messageToSend,
                message: text,
              });
            }}
            placeholder={i18n.t('typeMessage')}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              sendMessageMutation.mutate();
            }}
            disabled={sendMessageMutation.isPending || messagesQuery.isRefetching || messageToSend.message === ""}
          >
            {sendMessageMutation.isPending || messagesQuery.isRefetching
              ? (
                <ActivityIndicator color="#007AFF" size={20} />
              ) : (
                <Text style={
                  messageToSend.message === "" ? styles.sendButtonTextDisabled : styles.sendButtonText
                }>{i18n.t('send')}</Text>
              )}
          </TouchableOpacity>
        </View>
        <LoadingModal isVisible={
          messagesQuery.isLoading ||
          getChatIdQuery.isLoading ||
          userQuery.isLoading
        } />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: '100%',
    padding: 30,
  },
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%'
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF'
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA'
  },
  messageTextSender: {
    color: '#fff'
  },
  messageText: {
    color: '#000'
  },

  messageTime: {
    fontSize: 12,
    color: '#rgba(255,255,255,0.7)',
    marginTop: 5
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    color: '#007AFF',
    fontWeight: 'bold'
  },
  sendButtonTextDisabled: {
    color: '#ccc',
    fontWeight: 'bold'
  }

});
export const formatMessageDate = (date: Date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (messageDate >= today) {
    return i18n.t('time.today');
  } else if (messageDate >= yesterday) {
    return i18n.t('time.yesterday');
  } else {
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    return `منذ ${toArabicNumbers(diffDays)} أيام`
  }
};

export const formatMessageTime = (date: Date) => {
  return `${i18n.t('time.at')} ${toArabicNumbers(date.getHours())}:${toArabicNumbers(date.getMinutes())}`;
};
export default ChatRoomScreen;