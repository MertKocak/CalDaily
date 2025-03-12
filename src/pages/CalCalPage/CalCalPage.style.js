import { Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        padding: 16,
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    input: {
        marginTop: 16,
        height: 48,
        paddingLeft: 16,
        justifyContent: "center",
        backgroundColor: colors.lightgreen,
        borderRadius: 6,
        width: windowWidth - 32,
        borderWidth: 0.4,
        borderColor: colors.gray,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        color: colors.black,
    },
});
