import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import styles from './styles';
import LoadingModal from '../../utils/LoadingModal';
import { LoginImage } from '../../../assets';
import i18n from '../../i18n';
import { useMutation } from '@tanstack/react-query';
import { login, loginAnonymously } from '../../api/auth';
import { UserType } from '../../types/types/user.types';
import { LoginRequestType } from '../../types/types/auth.types';
import { onSubmit } from '../../BackEnd/helpers';
import { LoginValidator } from '../../types/validators/auth.validator';
import { TextInputForm } from '../../components/Texts';

export default function LoginScreen({ navigation }: any) {
    const [formData, setFormData] = useState<LoginRequestType>({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (user: UserType) => {
            try {
                // navigation.navigate('Home');
            } catch { }
        },
    });

    const mutationGuestLogin = useMutation({
        mutationFn: loginAnonymously,
        onSuccess: () => {
            try {
                // navigation.navigate('Home');
            } catch { }
        },
    });


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '267775855380-ndf8oh65iupofucjfpg90clgg0tkme22.apps.googleusercontent.com'
        });
    }, []);

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    };



    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 80 }}>
                    <Image
                        source={LoginImage}
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1.55, // aspect ratio is 1.5:1
                            resizeMode: 'cover', // Adjust based on how you want the image to behave
                        }}
                    />
                </View>
                <View style={{ width: '70%', alignSelf: 'center' }}>
                    <TextInputForm
                        itemValue={formData.email}
                        setItemValue={(text: any) => setFormData({ ...formData, email: text })}
                        error={errors.email}
                        placeholder={i18n.t('email')}
                        value={formData.email}
                    />
                    <TextInputForm
                        itemValue={formData.password}
                        setItemValue={(text: any) => setFormData({ ...formData, password: text })}
                        error={errors.password}
                        placeholder={i18n.t('password')}
                        value={formData.password}
                        secureTextEntry={true}
                    />

                    {mutation.error?.message ? <Text style={{
                        color: 'red'

                        , textAlign: 'center', marginTop: 10, marginBottom: 10
                    }}>{mutation.error?.message}</Text> : null}
                    <TouchableOpacity onPress={async (e: any) => {
                        onSubmit(mutation, formData, setErrors, LoginValidator, e)

                    }} style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {i18n.t('login')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async (e: any) => {
                        mutationGuestLogin.mutate()
                    }} style={{ backgroundColor: 'grey', marginTop: 20, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                            {i18n.t('loginAsGuest')}
                        </Text>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 5 }}>
                        <Text style={{ color: '#6C6A6A' }}>
                            {i18n.t('dontHaveAccount')}
                        </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text style={{ color: '#FFC600' }}>
                                {i18n.t('register')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <LoadingModal isVisible={mutation.isPending} />
        </View>
    );
}
