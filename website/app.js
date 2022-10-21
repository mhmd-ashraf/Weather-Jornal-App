/* Global Variables */
// const apiKey = "b0cf3394c0a327f9e0e50819defcf645";
const Url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const server = "http://127.0.0.1:4000";
const ApiKey = ",&appid=b0cf3394c0a327f9e0e50819defcf645&units=imperial";

// https://api.openweathermap.org/data/2.5/weather?zip=b0cf3394c0a327f9e0e50819defcf645

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const btn = document.getElementById('generate');

const generateApp = () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getData(zipCode).then((data) => {
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ descprition }],
            } = data;
            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                // descprition,
                feelings,
            };
            postData(server + "/add", info);

            // postData("/postData", {
            //     content: myFeelings,
            //     temp: data.main.temp,
            //     date: newDate,
            // });
            retriveData();
        }
        
    });
    
};

btn.addEventListener('click', generateApp);

const getData = async (zipCode) => {
    try {
        const res = await fetch(Url + zipCode + ApiKey);
        const data = await res.json();
        if (data.cod != 200) {
            window.alert("Please Enter Right Data !");
        }
        return data;
    }
    catch (error) {
        console.log(error);
    }
};


const postData = async (url = "", pData = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pData),
    });

    try {
        const nData = await res.json();
        console.log(nData);
        return nData;
    } catch (error) {
        console.log(error);
    }
};


const retriveData = async () => {
    const res = await fetch(server + "/all");
    try {
        const sData = await res.json();
        // console.log(`your : ${sData.city} , ${sData.temp}`);
        document.getElementById("date").innerHTML = sData.newDate;
        document.getElementById("city").innerHTML = sData.city;
        document.getElementById("temp").innerHTML = sData.temp + '&degC';
        document.getElementById("content").innerHTML = sData.feelings;

    }
    catch (error) {
        console.log("error", error);
    }
};