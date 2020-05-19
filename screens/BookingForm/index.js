import React, {useState, useReducer} from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import styles from "./styles";
import Input from "../../components/UI/Input";
import Ticket from "../../components/UI/Ticket";
import {BOOKING} from "../../env";
import {fetchMyBookings, fetchCompleteDetails} from "../../store/actions/details";
import {useSelector, useDispatch} from "react-redux";

const formReducer = (state, {key, payload}) => {
    switch (key) {
        case "NAME":
            return {...state, name: payload};
        case "AGE":
            return {...state, age: payload};
        case "PHONE":
            return {...state, phone: payload};
        case "GENDER":
            return {...state, gender: payload};
        case "ADDRESS":
            return {...state, address: payload};
        default:
            return state;
    }
};

const BookingForm = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadDetails = async () => {
            await dispatch(fetchCompleteDetails());
        };
        loadDetails();
    }, [dispatch]);
    const {item} = props.route.params;
    const user = useSelector((state) => state.auth.user);
    const completeDetails = useSelector((state) => state.details.completeDetails);

    const [formState, formDispatch] = useReducer(formReducer, {
        name: "",
        age: null,
        phone: "",
        gender: "",
        address: 1,
    });

    const inputHandler = ({key, payload}) => {
        formDispatch({
            key,
            payload,
        });
    };
    const mapItemToFood = () => {
        for(let key in completeDetails)
        {

            if(completeDetails.hasOwnProperty(key)&&completeDetails[key].foodName===item['foodName'] && completeDetails[key].quantity===item['quantity']&& completeDetails[key].pickupLocation ===item['pickupLocation'] ){
               fetchHandler(key);
            }
        }
    };
    const fetchHandler = async (key) => {
        item.status = 'pickedup';
        const dataObj = {
            ...item
        };
        const response = await fetch(`https://reactnative-foodwasteapp.firebaseio.com/allRequests/${key}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataObj),
        });
        const res = await response.json();
    };
    const bookingHandler = async () => {
        mapItemToFood();
        if (
            formState.name &&
            formState.phone
        ) {
            const dataObj = {
                user: {...formState},
                food: {...item},
                email: user.email,
                localId: user.localId,
            };
            const response = await fetch(BOOKING, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj),
            });
            const res = await response.json();
            await dispatch(fetchMyBookings());
            Alert.alert(
                "Pickup Applied!",
                "Pickup has been confirmed",
                [
                    {
                        text: "OK",
                    },
                ],
                {cancelable: false}
            );
        } else {
            Alert.alert("Error", "Please fill all the fields", [{text: "OK"}], {
                cancelable: false,
            });
        }
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.screen}>
                    <View>
                        <View style={styles.form}>
                            <Ticket item={item}/>
                            <Input
                                style={styles.input}
                                placeholder={"Full name"}
                                onChangeText={(payload) =>
                                    inputHandler({key: "NAME", payload})
                                }
                                value={formState.name}
                                returnKeyType='next'
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Age"}
                                keyboardType={"number-pad"}
                                maxLength={2}
                                onChangeText={(payload) =>
                                    inputHandler({ key: "AGE", payload })
                                }
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Phone Number"}
                                keyboardType={"number-pad"}
                                onChangeText={(payload) =>
                                    inputHandler({key: "PHONE", payload})
                                }
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Gender"}
                                onChangeText={(payload) => {
                                    inputHandler({key: "GENDER", payload});
                                }}
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Address"}
                                onChangeText={(payload) => {
                                    inputHandler({key: "ADDRESS", payload});
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.fabButton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.fab}
                            onPress={() => {
                                bookingHandler();
                            }}
                        >
                            <Text style={styles.fabText}> Confirm Pickup </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookingForm;
