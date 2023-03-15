import { StyleSheet} from "react-native";

const loginStyle=StyleSheet.create({
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
      },
      title: {
        borderWidth: 4,
        backgroundColor: "#fdba74",
        marginTop: 30,
        marginRight: 30,
        marginLeft: 30,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },

      welcomeTitle: {
        flex: 1,
        padding: 74,
        textAlign: 'center',
        fontSize: 50,
        fontWeight: "bold",
      },

      subCaption: {
        padding: 20,
        textAlign: "center",
        fontSize: 20,
      }
});

export default loginStyle;