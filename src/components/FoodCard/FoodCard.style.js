import { Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../pages/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        backgroundColor: colors.lightgreen,
        marginLeft: 16,
        marginBottom: 8,
        width: windowWidth - 64,
        borderRadius: 6,
        padding: 12,
        paddingLeft: 12,
        paddingRight: 12,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flexDirection: "column"
    },
    innerCont: {
        flexDirection: 'column',
        maxWidth: windowWidth - 88,
        flex: 1,
        marginBottom: 2,
        justifyContent: "center",

    },
    title: {
        color: colors.black,
        fontSize: 14,
        fontFamily: "Manrope-Bold",
        marginTop: -2
    },
    desc: {
        color: colors.gray,
        fontSize: 12,
        fontFamily: "Manrope-Medium",
        marginTop: 2,
        paddingRight: 20,
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
        fontSize: 14,
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
    addButtonFull: {
        marginTop: 16,
        backgroundColor: colors.green,
        height: 44,
        width: windowWidth - 72,
        justifyContent: "center",
        borderRadius: 8,
    },
    addButtonHalf: {
        marginTop: 16,
        backgroundColor: colors.green,
        height: 44,
        width: (windowWidth - 88) / 2,
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
})