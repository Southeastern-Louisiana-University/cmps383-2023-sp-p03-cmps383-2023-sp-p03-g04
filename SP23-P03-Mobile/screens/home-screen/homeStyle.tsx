import { StyleSheet} from "react-native";

const homeStyle=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: "#ffffff",
      },
      entrack:{
        backgroundColor: "#ffffff",
        marginTop: 50,
        marginRight: 0,
        marginLeft: 0,
        paddingVertical: 50,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
      },
});

export default homeStyle;