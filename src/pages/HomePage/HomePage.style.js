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
    container: {
        backgroundColor: colors.white,
        width: windowWidth - 32,
        height: windowHeight / 1.8,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 0.6,
        borderColor: colors.gray,
    },
    containerTitle: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.green,
        marginLeft: 12,
        marginTop: -13,
        backgroundColor: colors.white,
        width: 190,
        marginBottom: 8,
        fontFamily: "Manrope-Bold"

    },
    sumBox: {
        marginTop: 0,
        backgroundColor: colors.green,
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: windowWidth - 31,
        height: 56,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 12,
        alignSelf: 'center'
    },
    sumText: {
        textAlign: 'left',
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginTop: 2,
    },
    addButton: {
        marginTop: 12,
        backgroundColor: colors.green,
        borderWidth: 0.6,
        borderColor: colors.green,
        borderRadius: 8,
        width: windowWidth - 64,
        height: 48,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center'
    },
    addButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold"
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

});
