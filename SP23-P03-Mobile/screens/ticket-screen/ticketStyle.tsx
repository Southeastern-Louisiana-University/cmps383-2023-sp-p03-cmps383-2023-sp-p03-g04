import { StyleSheet} from "react-native";

const ticketStyle=StyleSheet.create({
  title: {
    marginTop: 20,
    paddingVertical: 5,
    color: '#5359d1',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignContent: "center",      
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 10,
    color: '#FDBA74',
    textTransform: 'uppercase',
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    flex: 1,
    color: '#555555',
  },
  value: {
    fontSize: 18,
    flex: 2,
    textAlign: "right",
    color: '#5359d1',
  },
});

export default ticketStyle;
