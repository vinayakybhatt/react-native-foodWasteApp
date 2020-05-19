import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Ticket from "../../components/UI/Ticket";
import Card from "../../components/UI/Card";
import Colors from "../../constants/colors";
const SearchScreen = (props) => {
  const search = props.route.params.search.toLowerCase();
  const res = useSelector((state) => state.details.allDetails);

  const filterData = () => {
      return (res.filter((food) => {
          const hasFoodName = food.foodName.toLowerCase().includes(search);
          const hasTypeOfFood = food.typeOfFood.toLowerCase().includes(search);
          return (hasFoodName || hasTypeOfFood);
    }));
  };
  const filter = filterData();
  const renderInfo = (item, name,from) => {
      props.navigation.navigate("info", {
          item,
          name,
          from
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {filter.length > 0 ? (
            filter.map((item,index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                style={styles.ticket}
                onPress={() => renderInfo(item, item.foodName,'search')}
              >
                <Ticket item={item} />
              </TouchableOpacity>
            ))
          ) : (
            <Card style={styles.errorCard}>
              <Text style={styles.errorMessage}> No result found </Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ticket: {
    height: 200,
  },
  errorCard: {
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  errorMessage: {
    color: Colors.danger,
    fontSize: 16,
    fontFamily: "roboto",
  },
});

export default SearchScreen;
