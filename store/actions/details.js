import { AsyncStorage } from 'react-native'
import { ALLREQUESTS, BOOKING } from "../../env";

export const SET_DETAILS = "SET_DETAILS";
export const SET_BOOKINGS = "SET_BOOKINGS";
export const COMPLETE_DETAILS = "COMPLETE_DETAILS";

export const fetchDetails = () => {
  return async (dispatch) => {
    const response = await fetch(ALLREQUESTS);
    const resData = await response.json();
    const data = Object.entries(resData);

    const details = [];
    for (let i = 0; i < data.length; i++) details.push(data[i][1]);

    dispatch({
      type: SET_DETAILS,
      details,
    });
  };
};
export const fetchCompleteDetails = () => {
  return async (dispatch) => {
    const response = await fetch(ALLREQUESTS);
    const resData = await response.json();
    console.log(resData,'response');

    dispatch({
      type: COMPLETE_DETAILS,
        resData,
    });
  };
};

export const fetchMyBookings = () => {
  return async dispatch => {
    const response = await fetch(BOOKING);
    const resData = await response.json();
    const data = Object.entries(resData);

    const details = []
    for (let i=0; i < data.length; i++) details.push(data[i][1]);

    const localId = await AsyncStorage.getItem('@localId')
    const myBookings = details.filter(bookings => bookings.localId === localId)
    
    dispatch({
      type: SET_BOOKINGS,
      details: myBookings
    })
  }
}
