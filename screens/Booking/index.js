import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { fetchMyBookings, fetchDetails } from "../../store/actions/details";
import styles from "./styles";
import Colors from "../../constants/colors";
import Card from "../../components/UI/Card";
import Ticket from "../../components/UI/Ticket";
const Home = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.details.bookings);
  const allDetails = useSelector((state) => state.details.allDetails);
    const { email, localId } = useSelector((state) => state.auth.user);
    useEffect(() => {
    const loadBookings = async () => {
      try {
        setisLoading(true);
        // await dispatch(fetchMyBookings());
        await dispatch(fetchDetails());
        setisLoading(false);
      } catch (e) {
        setisLoading(false);
      }
    };
    loadBookings();
  }, [dispatch]);
    allDetails?console.log({allDetails}):null;
    const filterData =()=>{
      return(allDetails.filter(e=>{
          return(e.userId===localId)
      }));
    };
    let filteredData = filterData();
    console.log({filteredData});
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {filteredData &&
          filteredData.map((booking, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => {
                    props.navigation.navigate("bookingInfo", {
                      item: booking.user,
                      id: booking.train.id,
                      name: booking.train.name,
                      email: booking.email,
                    });
                  }}
                >
                  <Ticket item={booking} />
                </TouchableOpacity>
              );
            })}
          <View style={styles.fabButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.fab}
                onPress={() => {
                    props.navigation.navigate("createRequest")
                }}
            >
              <Text style={styles.fabText}> Request </Text>
              <FontAwesome name='plus' size={30} color={Colors.light} />
            </TouchableOpacity>
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
