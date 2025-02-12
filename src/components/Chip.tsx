import { useTheme } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const Chip = ({
    isSelected,
    label,
    onClick,
}
    :
    {
        isSelected: boolean,
        label: string,
        onClick: any
    }
) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            onPress={onClick}
            style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 100,
                backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.background,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 14,
                    // fontWeight: "600",
                    color: isSelected
                        ? theme.colors.text
                        : theme.colors.text,

                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};


export default Chip;