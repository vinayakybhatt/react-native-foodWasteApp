import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {  fetchDetails } from "../../store/actions/details";
import styles from "./styles";
import Colors from "../../constants/colors";
import Ticket from "../../components/UI/Ticket";
const Home = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const allDetails = useSelector((state) => state.details.allDetails);
    const {localId} = useSelector((state) => state.auth.user);
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
    const renderInfo = (item, name,from) => {
        props.navigation.navigate("info", {
            item,
            name,
            from
        });
    };
    const filterData =()=>{
      return(allDetails.filter(e=>{
          return(e.userId===localId)
      }));
    };
    let filteredData = filterData();
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
                  onPress={() => renderInfo(booking, booking.foodName,'booking')}>
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
