import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Categories, COLORS, Languages } from "../BackEnd/Gets";
import i18n from "../i18n";
import Chip from "./Chip";
import { Forward } from "../../assets";
import { set } from "@react-native-firebase/database";

const MAX_PRICE = 5000;

const FilterView = ({ closeFilterModal, setFilter }:
    {
        closeFilterModal: any, setFilter: any
    }
) => {

    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const [copiedFilter, setCopiedFilter] = useState<{
        categories: string[],
        languages: string[],
    }>(
        {
            categories: [],
            languages: [],
        }
    );

    return (
        <View style={{ flex: 1 }}>
            <BottomSheetScrollView style={{ flex: 1 }}>
                <View style={{ paddingVertical: 24, gap: 24 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 24,
                        }}
                    >
                        <Text
                            style={{

                                fontSize: 20,
                                fontWeight: "700",
                                color: theme.colors.text,
                            }}
                        >
                            {i18n.t("filter")}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setCopiedFilter({
                                    categories: [],
                                    languages: [],
                                })
                            }}
                            style={{
                                marginLeft: "auto",
                                padding: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.colors.text,
                                    opacity: 0.5,
                                }}
                            >
                                {i18n.t("reset")}
                            </Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ paddingHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("language")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            <Chip
                                label={i18n.t("all")}
                                isSelected={copiedFilter.languages.length === 0}
                                onClick={() => {
                                    setCopiedFilter({
                                        categories: [],
                                        languages: [],
                                    })
                                }}
                            />
                            {Languages.map((item) => {
                                return (
                                    <Chip
                                        label={i18n.t(item)}
                                        isSelected={copiedFilter.languages.includes(item)}
                                        onClick={() => {
                                            if (copiedFilter.languages.includes(item)) {
                                                setCopiedFilter({
                                                    categories: copiedFilter.categories,
                                                    languages: copiedFilter.languages.filter((i) => i !== item),
                                                })
                                            } else {
                                                setCopiedFilter({
                                                    categories: copiedFilter.categories,
                                                    languages: copiedFilter.languages.concat(item),
                                                })
                                            }
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
                            {i18n.t("categories")}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                            <Chip
                                label={i18n.t("all")}
                                isSelected={copiedFilter.categories.length === 0}
                                onClick={() => {
                                    setCopiedFilter({
                                        categories: [],
                                        languages: [],
                                    })
                                }}
                            />
                            {Categories.map((item: string, i: number) => {
                                return (
                                    <Chip
                                        label={i18n.t(item)}
                                        isSelected={copiedFilter.categories.includes(item)}
                                        onClick={() => {
                                            if (copiedFilter.categories.includes(item)) {
                                                setCopiedFilter({
                                                    categories: copiedFilter.categories.filter((i) => i !== item),
                                                    languages: copiedFilter.languages,
                                                })
                                            } else {
                                                setCopiedFilter({
                                                    categories: copiedFilter.categories.concat(item),
                                                    languages: copiedFilter.languages,
                                                })
                                            }
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>

                </View>
            </BottomSheetScrollView>
            <View
                style={{
                    padding: 24,
                    paddingBottom: 24 + insets.bottom,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFC600',// theme.colors.primary,
                        height: 64,
                        borderRadius: 64,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                    onPress={() => {
                        closeFilterModal()
                        setFilter(copiedFilter)
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: theme.colors.text,
                        }}
                    >
                        {i18n.t("apply")}
                    </Text>

                    <View
                        style={{
                            backgroundColor: theme.colors.card,
                            width: 40,
                            aspectRatio: 1,
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bottom: 12,
                        }}
                    >
                        <Image source={Forward} style={{ width: 24, height: 24 }} />
                        {/* <Icons name="arrow-forward" size={24} color={theme.colors.text} /> */}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FilterView;
