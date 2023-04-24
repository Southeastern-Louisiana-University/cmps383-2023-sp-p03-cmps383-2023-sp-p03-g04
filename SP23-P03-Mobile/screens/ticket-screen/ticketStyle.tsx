import { StyleSheet } from "react-native";

const ticketStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 5,
    color: "#5359d1",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FDBA74",
    textTransform: "uppercase",
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#555555",
    marginRight: 10,
  },
  value: {
    flex: 2,
    fontSize: 18,
    textAlign: "right",
    color: "#5359d1",
  },
});

export default ticketStyle;
