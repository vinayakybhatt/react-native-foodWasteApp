import React, { useState, useReducer } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import styles from "./styles";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Ticket from "../../components/UI/Ticket";
import { BOOKING } from "../../env";
import { fetchMyBookings } from "../../store/actions/details";
import { useSelector, useDispatch } from "react-redux";
const formReducer = (state, { key, payload }) => {
    switch (key) {
        case "NAME":
            return { ...state, name: payload };
        case "AGE":
            return { ...state, age: payload };
        case "ID":
            return { ...state, id: payload };
        case "GENDER":
            return { ...state, gender: payload };
        case "QTY":
            return { ...state, qty: payload };
        default:
            return state;
    }
};

const CreateBooking = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [formState, formDispatch] = useReducer(formReducer, {
        name: "",
        age: null,
        id: "",
        gender: "",
        localId: user.localId,
        qty: 1,
    });

    const inputHandler = ({ key, payload }) => {
        formDispatch({
            key,
            payload,
        });
    };

    const fetchHandler = async () => {

    };

    const bookingHandler = async () => {
        if (
            formState.name &&
            formState.age &&
            formState.id &&
            formState.gender &&
            formState.qty
        ) {
            const dataObj = {
                user: { ...formState },
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
                "Ticket Booked!",
                "Tickets has been booked",
                [
                    {
                        text: "OK",
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert("Error", "Please fill all the fields", [{ text: "OK" }], {
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
                            <Input
                                style={styles.input}
                                placeholder={"Full name"}
                                onChangeText={(payload) =>
                                    inputHandler({ key: "NAME", payload })
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
                                placeholder={"Govt. Issued ID Proof"}
                                onChangeText={(payload) => {
                                    inputHandler({ key: "ID", payload });
                                }}
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Gender"}
                                onChangeText={(payload) => {
                                    inputHandler({ key: "GENDER", payload });
                                }}
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Ticket quantity"}
                                keyboardType={"number-pad"}
                                maxLength={2}
                                onChangeText={(payload) => {
                                    inputHandler({ key: "QTY", payload });
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
                            <Text style={styles.fabText}> Confirm Ticket </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateBooking;
