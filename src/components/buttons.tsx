import { useTheme } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

export const PrimaryButton = ({
    onPress,
    label,
    style
}: {
    onPress: (e: any) => void,
    label: string,
    style?: any
}) => {
    const { colors } = useTheme();
    return <TouchableOpacity
        style={{
            backgroundColor: colors.primary,
            height: 44,
            width: 94,
            borderRadius: 64,
            alignItems: "center",
            position: "relative",
            padding: 12,
            alignSelf: "center",
            ...style
        }}
        onPress={
            onPress
        }>

        <Text style={{ color: colors.text, fontFamily: 'bold' }}>
            {label}
        </Text>
    </TouchableOpacity>

}