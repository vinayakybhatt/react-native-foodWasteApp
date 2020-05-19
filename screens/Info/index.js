import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
const images = [
  require("../../assets/images/0.jpg"),
  require("../../assets/images/1.jpg"),
  require("../../assets/images/2.jpg"),
  require("../../assets/images/3.jpg")
];
const Info = (props) => {
  const details = useSelector((state) => state.details.allDetails);
  const { item, from } = props.route.params;
  let selectedItem = {};
  details.forEach(e=>{
    if(e.foodName === item.foodName && e.foodName===item['foodName'] && e.quantity===item['quantity']&& e.pickupLocation ===item['pickupLocation']){
      selectedItem = e;
    }
  });
  const random = Math.floor((Math.random() * images.length - 1) + 1);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.screen}>
          <Image
            style={styles.image}
            source={images[random]}
          />
          <View style={styles.itemView}>
            <View style={styles.mainInfo}>
              <Text style={styles.owner}>
                {selectedItem.foodName.toUpperCase()}
              </Text>
              <Text style={styles.name}> {selectedItem.typeOfFood} </Text>
            </View>
            <View style={styles.location}>
              <Text style={styles.source}>
                {selectedItem.pickupLocation}
              </Text>
              <Text style={styles.arrow}>
                <FontAwesome name='long-arrow-right' size={36} />
              </Text>
              <Text style={styles.destination}>
                Quantity: {selectedItem.quantity}
              </Text>
            </View>

            <View style={styles.incomingDetails}>
              <Text style={styles.timings}> Expiry </Text>
              <Text style={styles.time}> { selectedItem.expiry } </Text>
            </View>
              {from!=='booking'? <View style={styles.fabButton}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.fab}
                onPress={() => {
                  props.navigation.navigate("bookingForm", {
                    item: selectedItem,
                  });
                }}
              >
                <Text style={styles.fabText}> Pick Up </Text>
                <FontAwesome name='plus' size={30} color={Colors.light} />
              </TouchableOpacity>
            </View>: null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Info;
