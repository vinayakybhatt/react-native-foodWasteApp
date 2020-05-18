import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Ticket = (props) => {
  return (
    <View style={{ ...styles.items, ...props.style }}>
      <View style={styles.mainInfo}>
        <View style={styles.info}>
          <Text style={styles.name}>{props.item.foodName}</Text>
          <Text style={styles.owner}>{props.item.typeOfFood}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.time}>{props.item.quantity}</Text>
          <Text style={styles.date}> {props.item.expiry} </Text>
        </View>
      </View>
      <View style={styles.location}>
        <Text style={{ ...styles.grid, ...styles.source }}>
          {props.item.pickupLocation}
        </Text>
        <FontAwesome
          style={{ ...styles.grid, ...styles.arrowIcon }}
          name='long-arrow-right'
          size={24}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    height: 180,
    marginVertical: 10,
    elevation: 2,
    borderRadius: 5,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  mainInfo: {
    flexDirection: "row",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: wp("6%"),
    fontFamily: "roboto-bold",
    color: Colors.dark,
  },
  owner: {
    fontSize: wp("3%"),
    fontFamily: "roboto-light",
  },
  time: {
    fontSize: wp("5%"),
    fontFamily: "roboto-light",
  },
  date: {
    fontSize: wp("3%"),
    textAlign: "right",
    fontFamily: "roboto",
  },
  location: {
    flexDirection: "row",
    marginVertical: 10,
  },
  grid: {
    width: "33%",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "bebas",
    fontSize: wp("5%"),
  },
  amountWrapper: {
    alignItems: "center",
  },
  amount: {
    fontFamily: "bebas",
    fontSize: wp("7%"),
    color: Colors.primary,
  },
  source: {
    color: Colors.primary,
  },
  destination: {
    color: Colors.danger,
  },
  arrowIcon: {
    color: Colors.dark,
  },
  stations: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-evenly",
  },
  midway: {
    color: Colors.ltGray,
    fontFamily: "roboto-light",
    flexWrap: 'wrap'
  },
  midwayStation: {
    color: Colors.ltGray,
    fontFamily: "roboto",
  },
});

export default Ticket;
