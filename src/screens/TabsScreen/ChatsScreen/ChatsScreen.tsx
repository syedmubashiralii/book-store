// src/screens/ChatsScreen/ChatsScreen.tsx
import React, { useCallback, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../api/auth';
import { getChats } from '../../../api/chat';
import { Chat } from '../../../types/types/chat.type';
import { NoData } from '../../../../assets';
import LoadingModal from '../../../utils/LoadingModal';
import i18n from '../../../i18n';
import { toArabicNumbers } from '../../../BackEnd/helpers';

const ChatsScreen = ({ navigation }: {
  navigation: any
}) => {
  const { colors } = useTheme();
  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  });

  const chatsQuery = useQuery({
    queryKey: ['chats', userQuery.data?.id],
    queryFn: () => getChats(userQuery.data?.id || ''),
    enabled: !!userQuery.data?.id
  });

  useFocusEffect(
    useCallback(() => {
      chatsQuery.refetch();

    }, []))
  useEffect(() => {
    // Initial fetch
    chatsQuery.refetch();

    // Set up interval for periodic refresh
    const intervalId = setInterval(() => {
      chatsQuery.refetch();
      console.log('Chats refreshed');
    }, 60000); // 60000ms = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount


  const renderChatItem = ({ item }: {
    item: Chat
  }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatRoom', {
        chatId: item.id,
        otherUserId: item.participants.filter(id => id !== userQuery.data?.id)[0]
      })}
    >
      <View style={styles.chatContainer}>
        <View style={styles.avatarContainer}>
          {/* Replace with actual avatar component */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.OtherUserName?.[0]?.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.userName}>{item.OtherUserName}</Text>
            <Text style={styles.timestamp}>
              {formatTimestamp(item.lastMessageTime)}
            </Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage || i18n.t('noMessagesYet')}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {
        chatsQuery.data?.length === 0 &&
        <>
          <Image
            source={NoData}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              alignSelf: 'center',
              marginTop: 200
            }}
          />
          <Text style={{ textAlign: 'center', color: colors.text, fontSize: 30 }}>
            {i18n.t('noChats')}
          </Text>
        </>

      }

      <FlatList
        data={chatsQuery.data}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
      />
      <LoadingModal isVisible={chatsQuery.isLoading} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  chatItem: {
    padding: 16,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: '#666',
  },
  unreadDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 16,
  },
  chatInfo: {
    flex: 1,
  },
});

export default ChatsScreen;


function formatTimestamp(lastMessageTime: any): string {
  const dateTime = new Date(lastMessageTime);
  const now = new Date();
  const diff = now.getTime() - dateTime.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return i18n.t('time.justNow');
  }
  if (minutes < 60) {
    return `${toArabicNumbers(minutes)} ${i18n.t(`time.minute_${minutes === 1 ? 'one' : 'other'}`)}`;
  }
  if (hours < 24) {
    return `${toArabicNumbers(hours)} ${i18n.t(`time.hour_${hours === 1 ? 'one' : 'other'}`)}`;
  }
  return `${toArabicNumbers(days)} ${i18n.t(`time.day_${days === 1 ? 'one' : 'other'}`)}`;
}