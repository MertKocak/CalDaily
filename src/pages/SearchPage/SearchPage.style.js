import { Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        justifyContent: 'center',
      },
      input: {
        padding: 10,
        marginBottom: 20,
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: colors.gray,
        marginTop: 0,
        backgroundColor: colors.lightgreen,
        height: 44,
        width: windowWidth - 122,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      button: {
        width: 88,
        //marginLeft: 4,
        backgroundColor: colors.green,
        alignContent: 'center',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: 44,
        borderWidth: 0.6,
        borderColor: colors.gray,
        borderLeftWidth: 0,
        borderRadius: 6,
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
      },
      addButton: {
        width: windowWidth - 64,
        marginTop: 12,
        backgroundColor: colors.green,
        alignContent: 'center',
        height: 44,
        borderRadius: 8,
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
      },
      error: {
        color: 'red',
        marginTop: 10,
      },
      resultContainer: {
        marginTop: -16,
      },
      result: {
        backgroundColor: colors.lightgreen,
        borderWidth: 0.6,
        borderColor: colors.gray,
        padding: 16,
        paddingTop: 12,
        marginTop: 12,
        borderRadius: 8,
        borderBottomColor: '#ccc',
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.black,
      },
      desc: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.gray,
        marginTop: 2,
        width: windowWidth / 1.8
      },
});
