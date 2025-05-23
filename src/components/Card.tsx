import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const Card = ({
    navigation, item, user
}
    : any
) => {
    return (
        <TouchableOpacity
            onPress={
                () => {
                    navigation.navigate('OneProduct', { item: item, user: user });
                }
            }
            style={{
                flex: 1,
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
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
            />
            <View
                style={{
                    position: "absolute",
                    left: 12,
                    top: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderRadius: 100,
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
                    ${item.price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Card;