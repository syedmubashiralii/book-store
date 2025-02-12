import React, { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import LoadScreen from './src/screens/LoadScreen/LoadScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen } from './src/screens';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import '@react-native-firebase/app';  // Initialize Firebase app
import { auth, db } from './src/firebase/config';
import StartScreen from './src/screens/StartScreen/StartScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n'; // Adjust path to your i18n.js file
import { I18nManager } from 'react-native';
import TabsScreen from './src/screens/TabsScreen/TabsNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddProductScreen from './src/screens/AddProductScreen/AddProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OneProduct from './src/screens/OneProductScreen/OneProduct';
import ChatRoomScreen from './src/screens/ChatRoomScreen/ChatRoomScreen';

// Force RTL and reload app if not already in RTL mode
if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true); // Enables RTL layout
}
const Stack = createStackNavigator();

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  GoogleSignin.configure({
    webClientId: '267775855380-ndf8oh65iupofucjfpg90clgg0tkme22.apps.googleusercontent.com'
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('user:', user);
      if (user) {

        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data() as any;
            setUser(userData);
          } else {
            setUser({});
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadScreen />;
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f5f5f5',
      // text:'#FFC600',
      text: '#191919',
      border: '#D9D9D9',
      primary: '#FFC600',

    },
  }

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{
          flex: 1
        }}>
          <NavigationContainer
            theme={theme}
          >
            <BottomSheetModalProvider>
              <I18nextProvider i18n={i18n}>
                <BottomSheetModalProvider>

                  <Stack.Navigator>
                    {user ? (
                      <>
                        <Stack.Screen
                          name="Tabs"
                          options={{ headerShown: false }}
                        >
                          {props => <TabsScreen {...props} extraData={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="AddProduct"
                          component={AddProductScreen}
                          options={{
                            headerShown: true,
                            title: i18n.t('addProduct'),
                          }}
                        />
                        <Stack.Screen
                          name="OneProduct"
                          component={OneProduct}
                          options={{
                            headerShown: true,
                            title: i18n.t('productDetails')
                          }}
                        />

                        <Stack.Screen
                          name="ChatRoom"
                          component={ChatRoomScreen}
                          options={({ route }: any) => ({
                            headerShown: true,
                            title: route.params?.otherUser?.fullName || i18n.t('chat')
                          })}
                        />

                      </>
                    ) : (
                      <>
                        <Stack.Screen name="Start" component={StartScreen}
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen name="Login" component={LoginScreen}
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen name="Registration" component={RegistrationScreen}
                          options={{ headerShown: false }}
                        />


                      </>
                    )}
                  </Stack.Navigator>
                </BottomSheetModalProvider>
              </I18nextProvider>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
