import {
    View,
    Text,
    ScrollView,
    Image,
    RefreshControl,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { FlaTCategories, Items } from "../../../components/AllItems"
import { BestChoice } from "../../../../assets";
import i18n from "../../../i18n";
import AddButton from "../../../components/Add";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "../../../utils/LoadingModal";
import { ProductType } from "../../../types/types/product.types";
import { FilterButton, Header } from "./HomeScreenComponents";
import { fetchProducts } from "../../../api/products";
import { auth } from "../../../firebase/config";


const HomeScreen = ({ navigation, extraData }: any) => {
    const { colors } = useTheme();

    const [profileName, setProfileName] = useState(extraData?.fullName);
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const productQuery = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });
    // Refresh data whenever the screen is focused
    useFocusEffect(
        useCallback(() => {
            productQuery.refetch();
        }, [])
    );

    const isAnonymous = auth.currentUser?.isAnonymous;




    const [filter, setFilter] = useState<
        {
            categories: string[],
            languages: string[],
        }>
        ({
            categories: [],
            languages: [],
        });


    return (
        <View style={{ flex: 1 ,margin:10}}>
            {
                !isAnonymous &&
                <AddButton openAddModel={() => {
                    navigation.navigate('AddProduct')
                }} />}

            <ScrollView

                refreshControl={
                    <RefreshControl
                        refreshing={productQuery.isFetching}
                        onRefresh={() => {
                            productQuery.refetch()
                            setFilter({
                                categories: [],
                                languages: [],
                            })
                        }}
                    />
                }
                style={{ flex: 1, backgroundColor: colors.background, paddingTop: 25 }}
            >
                <Header profileName={profileName}
                    navigation={navigation}
                />
                <FilterButton setFilter={setFilter} filter={filter} />
                <View style={{ paddingHorizontal: 24 }}>
                    <Text
                        style={{ fontSize: 20, fontWeight: "700", color: colors.text, paddingTop: 10 }}
                    >
                        {i18n.t('thebestChoice')}
                    </Text>
                    <Image
                        source={BestChoice}
                        style={{
                            width: '100%', aspectRatio: 1.5, borderRadius: 24, marginTop: 8
                            , height: undefined
                        }}
                        resizeMode="contain"
                    />

                </View>
                {/* <FlaTCategories
                    filter={filter}
                    setFilter={setFilter}

                /> */}
                <Items navigation={navigation} products={(productQuery.data || []).filter((item: ProductType) => {
                    const categoryFlag = filter.categories.length === 0 || filter.categories.includes(item.category);
                    const languageFlag = filter.languages.length === 0 || filter.languages.includes(item.language);
                    return categoryFlag && languageFlag;
                })}
                />
            </ScrollView>



        </View>
    );
};





export default HomeScreen;
