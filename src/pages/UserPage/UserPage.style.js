import { Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    body: {
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        color: colors.green,
        fontSize: 14,
        fontFamily: "Manrope-Bold",

    },
    innerCont: {
        flexDirection: 'column',
        maxWidth: windowWidth - 88,
        flex: 1,
        marginBottom: 2,
        justifyContent: "center",
    },
    container: {
        backgroundColor: colors.lightgreen,
        marginTop: 12,
        width: windowWidth - 40,
        borderRadius: 8,
        padding: 16,
        marginRight: 6,
        marginLeft: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flexDirection: "column"
    },
    button: {
        backgroundColor: colors.green,
        marginTop: 16,
        marginBottom: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        fontFamily: "Manrope-Bold",
        fontSize: 12,
        marginLeft: 6,
        marginBottom: 2,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Saydam arka plan
    },
    modalContent: {
        width: windowWidth - 32,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 0.8,
        borderColor: colors.green
    },
    modalText: {
        fontSize: 14,
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
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 14,
        color: colors.white,
        fontFamily: "Manrope-Bold",
        marginBottom: 2,
    },
    NavCont: {
        borderWidth: 0.4, 
        borderColor: colors.gray,
        flexDirection: "row",
        width: windowWidth - 32,
        backgroundColor: colors.lightgreen,
        borderRadius: 4,
        marginTop: 8,
        justifyContent: "space-between",
        padding: 16,
        alignItems: "center"
    },
    desc: {
        color: colors.black,
        fontSize: 12,
        fontFamily: "Manrope-Medium",
        marginTop: 2,
        width: windowWidth - 120,
    },
    /*** */
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: 1,
    },
    modalViewDate: {
        backgroundColor: colors.lightgreen,
        borderRadius: 0,
        borderTopWidth: 1,
        borderColor: colors.green,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: windowWidth,
        height: 286,
        justifyContent: "space-between",
    },
    buttonClose: {
        backgroundColor: colors.lightgreen,
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 12,
        marginTop: 10,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    buttonOpen: {
        marginBottom: 28,
        backgroundColor: colors.green,
        borderRadius: 6,
        width: (windowWidth - 54) / 2,
        height: 44,
        justifyContent: "center",
        alignSelf: "center",
    },
    textStyle: {
        color: colors.white,
        fontSize: 14,
        marginBottom: 2,
        fontFamily: "Manrope-Bold",
        textAlign: 'center',
    },
    closeButton: {
        alignSelf: "center",
        height: 20,
        width: 20,
        tintColor: colors.gray,
    },
    datePicker: {
        height: 140,
        width: windowWidth - 96,
        alignSelf: "center",
        justifyContent: "center",
    },
    dateContainer: {
        justifyContent: "center",
        backgroundColor: colors.green,
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 6,
        marginTop: 0,
        width: windowWidth - 36,
        marginBottom: -4,
    },
});
