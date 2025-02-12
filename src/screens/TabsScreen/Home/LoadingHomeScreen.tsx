import { View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";

const LoadingHomeScreen = () => {
    return (<>
            <SafeAreaView style={{paddingVertical: 24, gap: 24}}>
                {/* Header Section */}
                <View style={{
                    margin: 24, flexDirection: "row", alignItems: "center",
                    backgroundColor: 'lightgrey', height: 52, gap: 8,
                }}
                />
                <View style={{
                    flexDirection: "row", paddingHorizontal: 24, height: 12,
                    backgroundColor: 'lightgrey', marginLeft: 24, marginRight: 24
                }}
                />
                <View style={{
                    flexDirection: "row", paddingHorizontal: 24, height: 12,
                    backgroundColor: 'lightgrey', marginLeft: 24, marginRight: 24
                }}
                />
                <View style={{
                    flexDirection: "row", paddingHorizontal: 24, height: 190,
                    backgroundColor: 'lightgrey', marginLeft: 24, marginRight: 24
                }}
                />
                <View style={{
                    flexDirection: "row", paddingHorizontal: 24, height: 52,
                    backgroundColor: 'lightgrey', marginLeft: 24, marginRight: 24
                }}
                />
                <View style={{
                    flexDirection: "row", paddingHorizontal: 24, height: 290,
                    backgroundColor: 'lightgrey', marginLeft: 24, marginRight: 24
                }}
                />
            </SafeAreaView>

        </>

    );
}
export default LoadingHomeScreen;
