import { StyleSheet} from "react-native";

const loginStyle=StyleSheet.create({
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
      },
      center:{
        width: "100%"
      },
      title: {
        backgroundColor: "#fdba74",
        marginTop: 50,
        marginRight: 0,
        marginLeft: 0,
        paddingVertical: 50,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        }
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: 'black',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default loginStyle;