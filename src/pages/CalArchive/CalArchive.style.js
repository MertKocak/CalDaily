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
        height: windowHeight / 2,
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 0.6,
        borderColor: colors.gray,
    },
    containerTitle: {
        textAlign: 'left',
        fontSize: 14,
        color: colors.green,
        marginLeft: 12,
        marginTop: -11,
        backgroundColor: colors.white,
        width: 162,
        paddingLeft: 6,
        marginBottom: 8,

    },
    sumBox: {
        marginTop: 0,
        backgroundColor: colors.green,
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: windowWidth - 31,
        height: 48,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 12,
        alignSelf: 'center'
    },
    sumText: {
        textAlign: 'left',
        fontSize: 14,
        color: colors.white,
    },
    addButton: {
        marginTop: 12,
        backgroundColor: colors.lightgreen,
        borderWidth: 0.8,
        borderColor: colors.green,
        borderRadius: 8,
        width: windowWidth - 32,
        height: 48,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center'
    },
    addButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.green,

    },

});
