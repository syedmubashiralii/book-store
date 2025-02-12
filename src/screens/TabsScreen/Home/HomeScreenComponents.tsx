

import React, { useCallback, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../../components/CustomBackdrop';
import FilterView from '../../../components/FilterView';
import i18n from '../../../i18n';
import { Minus, Setting } from "../../../../assets";
import Chip from '../../../components/Chip';
import { logout } from '../../../api/auth';
import { auth } from '../../../firebase/config';


export const FilterButton = (
    { setFilter, filter }:
        {
            setFilter: any, filter: {
                categories: string[],
                languages: string[],
            }
        }
) => {
    const { colors } = useTheme();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openFilterModal = useCallback(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, []);

    const closeFilterModal = useCallback(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    }, []);
    const existFilter = filter.categories.length > 0 || filter.languages.length > 0;

    return <>
        <TouchableOpacity
            style={{
                width: '90%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 52,
                shadowColor: "#000",
                backgroundColor: existFilter ? colors.primary : 'white',
                elevation: 5,
                alignSelf: 'center',
            }}
            onPress={() =>
                existFilter ?
                    setFilter({
                        categories: [],
                        languages: [],
                    })
                    :
                    openFilterModal()
            }
        >

            <View
                style={{
                    flex: 1,
                    display: 'flex',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: existFilter ? 'white' : 'black',
                        textAlign: 'center',
                    }}
                >
                    {
                        existFilter ?
                            i18n.t('removeFilter')
                            :
                            i18n.t('filter')
                    }
                </Text>
            </View>
            <View
                style={{
                    width: 52,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 52,
                    backgroundColor: existFilter ? 'white' : colors.primary,
                }}
            >
                <Image
                    source={existFilter ? Minus : Setting}
                    style={{
                        width: 24, aspectRatio: 1, borderRadius: 24,
                        height: 24
                    }}
                    resizeMode="contain"
                />

            </View>

        </TouchableOpacity>
        <BottomSheetModal
            snapPoints={["50%", "85%"]} // Example snap points
            index={0}
            ref={bottomSheetModalRef}
            backdropComponent={(props) => <CustomBackdrop {...props} />}
            backgroundStyle={{
                borderRadius: 24,
                backgroundColor: 'white',
            }}
            handleIndicatorStyle={{ backgroundColor: 'black' }}
            keyboardBehavior="interactive" // or "extend" based on the library
            enablePanDownToClose={true}

        >
            <BottomSheetScrollView>
                <FilterView
                    closeFilterModal={closeFilterModal}
                    setFilter={setFilter}
                />
            </BottomSheetScrollView>
        </BottomSheetModal>
    </>
}


export const Header = ({
    profileName, navigation
}: {
    profileName: string, navigation: any
}) => {
    const { colors } = useTheme();
    const isAnonymous = auth.currentUser?.isAnonymous;

    return <View
        style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            padding: 10,
            paddingTop:30
        }}
    >
        <Chip
            isSelected={true}
            onClick={async () => {
                await logout();
            }
            }
            label={isAnonymous ? i18n.t('login') : i18n.t('logout')}
        />
        <View style={{ flex: 1, padding: 10, paddingHorizontal: 20 }}>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 8,
                    color: colors.text,
                }}
                numberOfLines={1}
            >
                {
                    profileName ? i18n.t('hi') + ', ' + profileName + ' 👋' :
                        i18n.t('hi') + ' 👋 '
                }
            </Text>
            <Text
                style={{ color: colors.text, opacity: 0.75 }}
                numberOfLines={1}
            >
                {
                    i18n.t('findYourBook')
                }
            </Text>

        </View>


    </View>
}

