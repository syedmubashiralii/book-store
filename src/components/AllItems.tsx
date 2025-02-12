import { FlatList, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Categories, downloadAndSavePhoto } from "../BackEnd/Gets";
import i18n from "../i18n";
import { ProductType } from "../types/types/product.types";

const FlaTCategories = (
    { filter, setFilter }:
        {
            filter: {
                categories: string[],
                languages: string[],
            }, setFilter: any
        }
) => {
    const { colors } = useTheme();

    return <FlatList
        data={Categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
        }}
        scrollEnabled={false}
        renderItem={({ item, index }) => {

            const isSelected = filter.categories.includes(item)
            const isAll = filter.categories.length === 0
            return (
                <>
                    {
                        index === 0 &&
                        <TouchableOpacity
                            onPress={() =>

                                setFilter({
                                    ...filter,
                                    categories: [],
                                })
                            }
                            style={{
                                backgroundColor: isAll ? colors.primary : colors.card,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                borderRadius: 100,
                                shadowColor: "#000",
                                elevation: 5,
                                margin: 5,

                            }}
                        >
                            <Text
                                style={{
                                    color: isAll ? colors.background : colors.text,
                                    fontWeight: "600",
                                    fontSize: 14,
                                    opacity: isAll ? 1 : 0.5,
                                }}
                            >
                                {i18n.t('all')}
                            </Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={() => {

                            setFilter({
                                ...filter,
                                categories: filter.categories.includes(item) ?
                                    filter.categories.filter((i) => i !== item) : filter.categories.concat(item)
                            })
                        }
                        }
                        style={{
                            backgroundColor:
                                isSelected
                                    && item !== 'add' ? colors.primary : colors.card,
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            borderRadius: 100,
                            shadowColor: "#000",
                            elevation: 5,
                            margin: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: isSelected ? colors.background : colors.text,
                                fontWeight: "600",
                                fontSize: 14,
                                opacity: isSelected ? 1 : 0.5,
                            }}
                        >
                            {i18n.t(item)}
                        </Text>
                    </TouchableOpacity>
                </>
            );
        }}
    />

}

const Items = ({ products, navigation }: { products: ProductType[], navigation: any }) => {
    if (products.length === 0) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, paddingTop: 50 }}>{i18n.t('noProducts')}</Text>
    </View>
    return <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 20, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (

            <TouchableOpacity style={{ padding: 6, width: '50%' }}
                onPress={() => {
                    console.log("item ", item)
                    navigation.navigate('OneProduct', { id: item.id });
                }}
            >
                <View
                    style={{
                        aspectRatio: 2 / 3,//index % 3 === 0 ? 1 : 2 / 3,
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 24,
                    }}
                >
                    <Image
                        source={{
                            uri: item.imageUrl,
                        }}
                        resizeMode="cover"
                        style={StyleSheet.absoluteFill}
                    />


                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                padding: 12,
                            },
                        ]}
                    >


                        <View style={{ flex: 1 }} />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 6,
                                borderRadius: 100,
                                overflow: "hidden",
                                backgroundColor: "rgba(0,0,0,0.2)",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                                numberOfLines={1}
                            >
                                {item.bookName}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )}
        onEndReachedThreshold={0.1}
    />
}
export { Items, FlaTCategories }

