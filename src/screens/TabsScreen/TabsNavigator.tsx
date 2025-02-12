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

const TabsStack = createBottomTabNavigator();

export default function TabsScreen(props: any) {

    const { colors } = useTheme();


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
                        options={{
                            headerShown: true,
                            headerTitle: i18n.t('profile'),
                            headerStyle: {
                                backgroundColor: colors.primary
                            },

                        }}
                    >
                        {_ => <ProfileScreen {...props} />}
                    </TabsStack.Screen>
                </>
            }

        </TabsStack.Navigator>
    );
}