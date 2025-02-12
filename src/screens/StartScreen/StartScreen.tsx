import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import StartImage from '../../../assets/startScreenImage.png';
import i18n from '../../i18n';
export default function StartScreen({ navigation }: any) {

    return (
        <View style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: 'white' }}>
            <Image source={StartImage} style={{ width: '100%', height: '60%', alignSelf: 'center' }} />
            <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 20 }}>
                {i18n.t('welcome')}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center', margin: 20 }}>
                {i18n.t('slogan')}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%', backgroundColor: 'white' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFD700',
                        width: '70%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginBottom: 20
                    }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: 'black', fontSize: 20 }}>
                        {i18n.t('letsStart')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
