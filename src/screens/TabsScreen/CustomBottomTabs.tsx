import { View, Text, TouchableOpacity, Pressable, Animated } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { Image } from "react-native";
import i18n from "../../i18n";
import { Chat, Home, Profile } from "../../../assets";
// import { useSharedValue } from 'react-native-reanimated';

const CustomBottomTabs = (props: any) => {
    const { colors } = useTheme();
    const map =
    {
        "insets": { "bottom": 48, "left": 0, "right": 0, "top": 31.619047164916992 },
        "state": {
            "history": [[Object]], "index": 0, "key": "tab-UE2IgzT_RX1AiAjgMQxxG", "preloadedRouteKeys": [], "routeNames": ["Home"],
            "routes": [[Object]], "stale": false, "type": "tab"
        }
    }
    return (
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.card }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                }}
            >
                {props.state.routes.map((route: any, i: any) => {
                    console.log('route', route);
                    const isActive: boolean = i === props.state.index;
                    return (
                        <TabItem
                            key={i}
                            isActive={isActive}
                            routeName={route.name}
                            navigation={props.navigation}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

export default CustomBottomTabs;

const TabItem = ({
    routeName,
    isActive,
    navigation,
}
    :
    {
        routeName: string;
        isActive: boolean;
        navigation: any;
    }
) => {
    // const { colors } = useTheme();
    const colors = {
        // primary: "#000000",
        card: "#FFC600",
        text: "#000000",
    }
    const onTap = () => {
        navigation.navigate(routeName);
    };

    return (
        <Pressable
            onPress={onTap}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingVertical: 8,
            }}
        >
            <Image
                source={
                    routeName === "Home"
                        ? Home
                        : routeName === "Chats"
                            ? Chat
                            : Profile
                }
                style={{
                    width: 24,
                    height: 24,
                    tintColor: isActive ? colors.card : colors.text,
                }}
            />
            {isActive && (
                <Text
                    style={{
                        marginLeft: 4,
                        fontSize: 12,
                        fontWeight: "600",
                        color: colors.card,
                    }}
                >

                    {i18n.t(routeName)}
                </Text>
            )}
        </Pressable>
    );
};
