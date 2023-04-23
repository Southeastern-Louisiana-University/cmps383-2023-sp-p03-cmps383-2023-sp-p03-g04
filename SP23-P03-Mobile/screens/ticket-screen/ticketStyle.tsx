import { StyleSheet} from "react-native";

const ticketStyle=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
});

export default ticketStyle;