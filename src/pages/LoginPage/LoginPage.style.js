import { Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        padding: 16,
        paddingTop: 64,
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        fontSize: 16,
        color: colors.green,
        marginTop: 40,
        fontFamily: "Manrope-Bold"
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
    registerButton: {
        marginTop: 16,
        backgroundColor: colors.green,
        height: 48,
        width: windowWidth - 32,
        justifyContent: "center",
        borderRadius: 8,
    },
    registerButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold"
    },
    registerText: {
        fontSize: 12,
        color: colors.green,
        marginLeft: 4,
        marginTop: 12,
        fontFamily: "Manrope-Medium"

    },
    text: {
        fontSize: 12,
        color: colors.black,
        marginRight: 2,
        marginTop: 12,
        fontFamily: "Manrope-Medium"
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Saydam arka plan
      },
      modalContent: {
        width: windowWidth - 32,
        padding: 20,
        backgroundColor: colors.lightgreen,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.green
      },
      modalText: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 8,
        color: colors.black,
        fontFamily: "Manrope-Medium",
        textAlign: "center"
      },
      modalTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.green,
        fontFamily: "Manrope-Bold",
        textAlign: "center"
      },
      addButton: {
        marginTop:16,
        backgroundColor: colors.green,
        height: 48,
        width: windowWidth - 72,
        justifyContent: "center",
        borderRadius: 8,
    },
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
    },

});
