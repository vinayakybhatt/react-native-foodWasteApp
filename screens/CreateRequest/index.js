import React, { useState, useReducer } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    Platform,
    Button
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import Input from "../../components/UI/Input";
import { ALLREQUESTS } from "../../env";
import { fetchDetails } from "../../store/actions/details";
import { useSelector, useDispatch } from "react-redux";
const formReducer = (state, { key, payload }) => {
    switch (key) {
        case "foodName":
            return { ...state, foodName: payload };
        case "typeOfFood":
            return { ...state, typeOfFood: payload };
        case "expiry":
            return { ...state, expiry: payload };
        case "quantity":
            return { ...state, quantity: payload };
        case "pickupLocation":
            return { ...state, pickupLocation: payload };
        default:
            return state;
    }
};

const CreateBooking = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [formState, formDispatch] = useReducer(formReducer, {
        foodName: "",
        typeOfFood: '',
        quantity: "",
        expiry: '',
        userId: user.localId,
        pickupLocation: "",
    });
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        formState.expiry = currentDate.toDateString();
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const inputHandler = ({ key, payload }) => {
        formDispatch({
            key,
            payload,
        });
    };

    const bookingHandler = async () => {
        if (
            formState.foodName &&
            formState.quantity &&
            formState.expiry &&
            formState.pickupLocation
        ) {
            const dataObj = {
                ...formState,
            };
            const response = await fetch(ALLREQUESTS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj),
            });
            const res = await response.json();
            await dispatch(fetchDetails());
            Alert.alert(
                "Request Created!",
                "Request have been created successfully",
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
                                placeholder={"Food name"}
                                onChangeText={(payload) =>
                                    inputHandler({ key: "foodName", payload })
                                }
                                returnKeyType='next'
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Food Type"}
                                onChangeText={(payload) =>
                                    inputHandler({ key: "typeOfFood", payload })
                                }
                                returnKeyType='next'
                            />
                            <Input
                                style={styles.input}
                                placeholder={"Quantity"}
                                keyboardType={"number-pad"}
                                onChangeText={(payload) =>
                                    inputHandler({ key: "quantity", payload })
                                }
                            />
                            <View>
                                <View>
                                    <Button onPress={showDatepicker} title="Show date picker!" />
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        mode={mode}
                                        is24Hour={true}
                                        value={date}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <Input
                                style={styles.input}
                                placeholder={"Pickup Location"}
                                onChangeText={(payload) => {
                                    inputHandler({ key: "pickupLocation", payload });
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
                            <Text style={styles.fabText}> Confirm Request </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateBooking;
