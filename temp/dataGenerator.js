const axios = require("axios");
const { v4 } = require("uuid");
// const data = {
//   id: v4(),
//   foodName: "apple",
//   typeOfFood: "lunch",
//   quantity: '7',
//   expiry: new Date().toDateString(),
//   userId: '',
//   pickupLocation: "83, kanak vihar",
//   status: 'pending' //pickedup, pending, expired
// };

const generator = async (details) => {
    try {
        const { data } = await axios.post("https://reactnative-foodwasteapp.firebaseio.com/allRequests.json", details);
        console.log(data)
    } catch (e) {   
        console.log (`e -> ${e.message}`)
    }
};

generator(data);

// const getDetails = async () => {
//     try {
//         const { data } = await axios.get("https://train-booking-tfd.firebaseio.com/trains.json")
//         console.log(data)
//     } catch (e) {
//         console.log (`e -> ${e.message}`)
//     }
// }
// getDetails()