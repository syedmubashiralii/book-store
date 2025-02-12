import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import Chip from "../../components/Chip";
import i18n from "../../i18n";
import { Languages, Categories } from "../../BackEnd/Gets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingModal from "../../utils/LoadingModal";
import { ProductType } from "../../types/types/product.types";
import { onSubmit } from "../../BackEnd/helpers";
import { ProductValidator } from "../../types/validators/product.validator";
import { useMutation } from "@tanstack/react-query";
import { uploadImage, uploadProduct } from "../../api/products";
import { ErrorText } from "../../components/Texts";
import { UploadImage } from "../../../assets";
import { PrimaryButton } from "../../components/buttons";
import { styles } from "./style";
import { requestCameraPermission } from "../../components/Permissions";

const AddProductScreen = ({ navigation }:
    any
) => {
    const { colors } = useTheme();
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [formData, setFormData] = useState<ProductType>({
        id: "",
        bookName: "",
        description: "",
        imageUrl: "",
        language: "",
        category: "",
        userId: "",
    })
    const mutationUploadProduct = useMutation({
        mutationFn: uploadProduct,
        onSuccess: () => {
            // navigation.navigate(-1)
            navigation.goBack();
        },
        onError: (error) => {
            console.log('Error:', error);
            
            // Alert.alert(i18n.t('error'), i18n.t('maxBookPerMonth'), [
            //     { text: i18n.t('understood'), style: 'default' }
            // ]);
        }
    });
    const mutationUploadPicture = useMutation({
        mutationFn: uploadImage,
        onSuccess: (imageUrl: string) => {
            setFormData({ ...formData, imageUrl });
        },
    })


    // useEffect(() => {
    //     const checkPermissions = async () => {
    //         const hasPermission = await requestCameraPermission();
    //         if (!hasPermission) {
    //             console.log('Permission denied');
    //             return;
    //         }
    //     };
    
    //     checkPermissions();
    // }, []);

    return (
        <>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <View style={{ padding: 6, gap: 16, flex: 1, flexGrow: 1, paddingBottom: 14, backgroundColor: 'white', paddingTop: 60 }}>
                    <TouchableOpacity
                        onPress={async () => { mutationUploadPicture.mutate() }}
                        style={[styles.pickImageButton, { backgroundColor: colors.background }]}
                    >
                        <Image
                            source={formData.imageUrl ? { uri: formData.imageUrl } : UploadImage}
                            style={{
                                width: "100%",
                                height: '100%',
                                borderRadius: 16,
                            }}
                        // contain

                        />
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 14 }}>
                        {mutationUploadPicture.error?.message ? <Text style={{
                            color: 'red'

                            , textAlign: 'center', marginTop: 10, marginBottom: 10
                        }}>{mutationUploadPicture.error?.message}</Text> : null}

                        <ErrorText error={errors.imageUrl && i18n.t("chooseImage")} />
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("bookName")}
                        </Text>
                        <TextInput
                            placeholder={i18n.t("bookName")}
                            style={[styles.input]}
                            onChangeText={(text) =>
                                setFormData({ ...formData, bookName: text })
                            }
                        />
                        <ErrorText error={errors.bookName && i18n.t("enterBookName")} />
                    </View>

                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("language")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            {Languages.map((item, i) => {
                                return (
                                    <Chip
                                        label={i18n.t(item)}
                                        isSelected={formData.language === item}
                                        onClick={() => {
                                            setFormData({ ...formData, language: item })
                                        }}
                                    />
                                );
                            })}
                        </View>
                        <ErrorText error={errors.language && i18n.t("chooseLanguage")} />

                    </View>

                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("categories")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            {Categories.map((item, i) => {
                                return (
                                    <Chip
                                        label={i18n.t(item)}
                                        isSelected={formData.category === item}
                                        onClick={() => {
                                            setFormData({ ...formData, category: item })
                                        }}
                                    />
                                );
                            })}
                        </View>
                        <ErrorText error={errors.category && i18n.t("chooseCategory")} />

                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("description")}
                        </Text>

                        <TextInput
                            placeholder={i18n.t("description")}
                            style={[styles.input, { height: 80, width: '80%' }]}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={150}
                            onChangeText={
                                (text) => {
                                    setFormData({ ...formData, description: text })
                                }
                            }
                        />
                        <ErrorText error={errors.description && i18n.t("enterDescription")} />
                    </View>
                    <PrimaryButton label={i18n.t("save")} onPress={(e: any) => {
                        
                        
                        onSubmit(mutationUploadProduct, formData, setErrors, ProductValidator, e); }} />

                    {
                        mutationUploadProduct.error?.message ? <Text style={{
                            color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 10
                        }}>{mutationUploadProduct.error?.message}</Text> : null
                    }
                </View>
            </KeyboardAwareScrollView>
            <LoadingModal isVisible={
                mutationUploadProduct.isPending || mutationUploadPicture.isPending
            } />
        </>
    )
}

export default AddProductScreen;
