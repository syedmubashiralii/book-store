import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import styles from './styles';
import { db, auth } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import LoadingModal from '../../utils/LoadingModal';
import { createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import HomeScreen from './Home/HomeScreen';
import CustomBottomTabs from './CustomBottomTabs'
import { Image } from 'react-native';
import ChatsScreen from './ChatsScreen/ChatsScreen';
import i18n from '../../i18n';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import { Button, IconButton } from 'react-native-paper';
import { deleteAccount } from '../../api/auth';

const TabsStack = createBottomTabNavigator();

export default function TabsScreen(props: any) {

    const { colors } = useTheme();
    const navigation = useNavigation();

    const isAnonymous = auth.currentUser?.isAnonymous;
    return (
        <TabsStack.Navigator
            screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >

            <TabsStack.Screen
                name="Home"
                options={{
                    headerShown: false,

                }}
            >
                {_ => <HomeScreen {...props} />}
            </TabsStack.Screen>

            {
                isAnonymous ? null :
                    <>
                        <TabsStack.Screen
                            name="Chats"
                            options={{
                                headerShown: true,
                                headerTitle: i18n.t('allChats'),
                                headerStyle: {
                                    backgroundColor: colors.primary
                                },
                            }}
                        >
                            {_ => <ChatsScreen {...props} />}
                        </TabsStack.Screen>


                        <TabsStack.Screen
                            name="profile"
                            options={({ navigation }) => ({
                                headerShown: true,
                                headerTitle: i18n.t('profile'),
                                headerStyle: {
                                    backgroundColor: colors.primary
                                },
                                headerRight: () => (
                                    <Button
                                        onPress={() => {
                                            Alert.alert(
                                                i18n.t('deleteAccount'),
                                                i18n.t('deleteAccountConfirm'),
                                                [
                                                    {
                                                        text: i18n.t('cancel'),
                                                        style: 'cancel'
                                                    },
                                                    {
                                                        text: i18n.t('delete'),
                                                        style: 'destructive',
                                                        onPress: async () => {
                                                            try {
                                                                await deleteAccount();
                                                                // navigation.replace('Login'); // Navigate after successful deletion
                                                            } catch (error:any) {
                                                                console.error('Account deletion failed:', error);
                                                                // Alert.alert(i18n.t('error'), i18n.t('deleteAccountError'));
                                                                Alert.alert(i18n.t('error'), error.message);
                                                            }
                                                        }
                                                    }
                                                ]
                                            );
                                        }}
                                    >
                                        {i18n.t('deleteAccount')}
                                    </Button>

                                    // <IconButton
                                    //     icon="delete-forever"
                                    //     iconColor="red"
                                    //     size={24}
                                    //     onPress={() => {
                                    //         Alert.alert(
                                    //             i18n.t('deleteAccount'),
                                    //             i18n.t('deleteAccountConfirm'),
                                    //             [
                                    //                 {
                                    //                     text: i18n.t('cancel'),
                                    //                     style: 'cancel'
                                    //                 },
                                    //                 {
                                    //                     text: i18n.t('delete'),
                                    //                     style: 'destructive',
                                    //                     onPress: async () => {
                                    //                         try {
                                    //                             await deleteAccount();
                                    //                             // navigation.replace('Login'); // Navigate after successful deletion
                                    //                         } catch (error) {
                                    //                             console.error('Account deletion failed:', error);
                                    //                             Alert.alert(i18n.t('error'), i18n.t('deleteAccountError'));
                                    //                         }
                                    //                     }
                                    //                 }
                                    //             ]
                                    //         );
                                    //     }}
                                    // />
                                )
                            })}
                        >
                            {(props) => <ProfileScreen {...props} />}
                        </TabsStack.Screen>

                    </>
            }

        </TabsStack.Navigator>
    );
}