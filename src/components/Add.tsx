import { useTheme } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

const AddButton = (
    { openAddModel }:
        { openAddModel: () => void }
) => {
    const { colors } = useTheme();

    return <TouchableOpacity style={{
        position: 'absolute',
        bottom: 20, // Adjust as needed
        right: 20,  // Adjust as needed
        width: 60, // Circle diameter
        height: 60, // Circle diameter
        borderRadius: 30, // Half of the diameter to make it circular
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 1000,
    }} onPress={openAddModel}
    >
        <Text style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
        }}>+</Text>
    </TouchableOpacity>

}

export default AddButton;