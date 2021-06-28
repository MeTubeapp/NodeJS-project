const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const day = document.getElementById('day');
const today_data = document.getElementById('today_data');

//for data and time

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    console.log(day);
    return day;
};

const getCurrentTime = () => {

    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];


    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    console.log(months[month]);
    var orgmonths = months[month];

    let mins = now.getMinutes();
    let hours = now.getHours();

    let perios = "AM";

    if (hours > 11) {
        perios = "PM";
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }

    console.log(hours + ":" + mins);
    return `${orgmonths} ${day} | ${hours}:${mins} ${perios}`;

}

day.innerText = getCurrentDay();
today_data.innerText = getCurrentTime();




//get info for the temp
const getInfo = async (event) => {
    event.preventDefault();
    // alert(cityName.value);
    let cityVal = cityName.value;
    if (cityVal == "") {
        city_name.innerText = 'Plz write before the search';

    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=fc7a389b1a9c60ecfc337e511e027033`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            temp.innerText = arrData[0].main.temp;
            const status = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;

            if (status == "sunny") {
                temp_status.innerHTML = "<i class='fas fa - sun' style='color: #eccc68'></i>"
            } else if (status == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (status == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }

        } catch (error) {
            city_name.innerText = 'Plz enter the city name properly';
            console.log(error);

        }
    }
}
submitBtn.addEventListener('click', getInfo);