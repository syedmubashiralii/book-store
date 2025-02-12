
//type of chat
export type Chat = {
    id: string;
    participants: string[];
    lastMessage: string;
    lastMessageTime: number;
    messages: Message[];
    OtherUserName: string;
};

export type Message = {
    id: string;
    receiverId: string;
    senderId: string;
    sentAt: string;
    message: string;

};