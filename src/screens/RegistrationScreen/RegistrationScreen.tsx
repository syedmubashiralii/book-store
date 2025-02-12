import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, Modal, ScrollView, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from '../../utils/LoadingModal';
import i18n from '../../i18n';
import { UserType } from '../../types/types/user.types';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../api/auth';
import { RegisterRequestType } from '../../types/types/auth.types';
import { TextInputForm } from '../../components/Texts';
import { onSubmit } from '../../BackEnd/helpers';
import { RegisterValidator } from '../../types/validators/auth.validator';
import { Check, RegisterScreenImage } from '../../../assets';
import { useTheme } from 'react-native-paper';
import { CheckBox } from "react-native-elements";

export default function RegistrationScreen({ navigation }: any) {
    const [formData, setFormData] = useState<RegisterRequestType>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [showTerms, setShowTerms] = useState(false);
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const TermsDialog = () => (
        <Modal
            visible={showTerms}
            transparent
            animationType="slide"
            onRequestClose={() => setShowTerms(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.termsTitle}>
                            {i18n.t('termsAndConditions')}
                        </Text>
                        {
                            i18n.t('termsAndConditionsText').split('\n').map((item, index) => {
                                return (
                                    <Text key={index} style={styles.termsText}>
                                        {item}
                                    </Text>
                                );
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity onPress={
                        async (e: any) => {
                            setShowTerms(false);
                        }
                    } style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {i18n.t('close')}
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>
    );

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (user: UserType) => {
            navigation.navigate('Home', { user });
        },
    });

    const handleSubmit = () => {
        if (!formData.termsAccepted) {
            setErrors({ ...errors, terms: 'You must accept the terms and conditions' });
            return;
        }
        // Existing submit logic
        mutation.mutate(formData);
    };

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
                    <Image
                        source={RegisterScreenImage}
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1.7, // aspect ratio is 1.5:1
                            resizeMode: 'cover', // Adjust based on how you want the image to behave
                        }}
                    />
                </View>

                <View style={{ width: '70%', alignSelf: 'center' }}>

                    <TextInputForm
                        itemValue={formData.fullName}
                        setItemValue={(text: any) => setFormData({ ...formData, fullName: text })}
                        error={errors.fullName}
                        placeholder={i18n.t('fullName')}
                        value={formData.fullName}
                    />

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

                    <TextInputForm
                        itemValue={formData.confirmPassword}
                        setItemValue={(text: any) => setFormData({ ...formData, confirmPassword: text })}
                        error={errors.confirmPassword}
                        placeholder={i18n.t('confirmPassword')}
                        value={formData.confirmPassword}
                        secureTextEntry={true}
                    />

                    <View style={styles.termsContainer}>

                        <TouchableOpacity
                            style={[styles.checkbox]}
                            onPress={() =>
                                setFormData({ ...formData, termsAccepted: !formData.termsAccepted })
                            }
                        >
                            {
                                formData.termsAccepted
                                && <Image
                                    source={Check}
                                    style={{ width: 12, height: 12 }}
                                />
                            }

                        </TouchableOpacity>
                        <Text>{i18n.t("iaccept")} </Text>
                        <TouchableOpacity onPress={() => setShowTerms(true)}>

                            <Text style={styles.termsLink}>{i18n.t('termsAndConditions')}</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.termsAccepted
                        && <Text style={styles.errorText}>{errors.termsAccepted}</Text>}
                    <TermsDialog />
                    {mutation.error?.message ?
                        (
                            <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{
                                mutation.error?.message
                            }</Text>
                        )
                        : null}
                    <TouchableOpacity onPress={
                        async (e: any) => {
                            onSubmit(mutation, formData, setErrors, RegisterValidator, e);
                        }
                    } style={{ backgroundColor: '#FFC600', marginTop: 40, padding: 15, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {i18n.t('createAccount')}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 5 }}>
                        <Text style={{ color: '#6C6A6A' }}>
                            {i18n.t('alreadyHaveAccount')}
                        </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text style={{ color: '#FFC600' }}>
                                {i18n.t('login')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView >
            <LoadingModal isVisible={mutation.isPending} />
        </View >
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    termsLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    termsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    termsText: {
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    checkboxContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        margin: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#000",
        marginLeft: 10,
        backgroundColor: "transparent",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxChecked: {
        backgroundColor: "#2196F3",
    },
    checkboxText: {
        fontSize: 16,
    },

});
