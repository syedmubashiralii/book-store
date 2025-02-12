import { Text, TextInput, View } from "react-native";
import i18n from "../i18n";

export const TextInputForm = ({
    itemValue,
    setItemValue,

    error,
    ...props
}: {
    itemValue: string,
    setItemValue: any,
    error: string | undefined,
    [key: string]: any
}) => {
    return (
        <View>
            <TextInput
                style={{
                    marginTop: 20, height: 50, borderColor: error ? 'red' : '#6C6A6A',
                    borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
                    color: 'black', textAlign: 'right'
                }}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setItemValue(text)}
                value={itemValue}
                autoCapitalize="none"
                {...props}
            />
            {error ? <Text style={{
                color: 'red',
                marginTop: 10, marginBottom: 10
            }}>{error}</Text> : null}
        </View>

    );
}

export const ErrorText = ({ error }: { error: string | undefined }) => {
    return (

        <>

            {
                error && <Text style={{
                    color: 'red'
                    , marginTop: 10, marginBottom: 10
                }}>{error}</Text>
            }
        </>

    );
}
