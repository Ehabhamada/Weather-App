const app =document.querySelector(".weather-app")
const temp =document.querySelector(".temp")
const dateoutput =document.querySelector(".date")
const timeoutput =document.querySelector(".time")
const nameotput =document.querySelector(".name")
const condition =document.querySelector(".condition")
const icon =document.querySelector(".icon")
const cloud =document.querySelector(".cloud")
const humidity =document.querySelector(".humidity")
const wind =document.querySelector(".wind")
const form =document.querySelector("#locationInput")
const search =document.querySelector(".search")
const btn =document.querySelector(".submit")
const cities = document.querySelectorAll(".city")
//defult city
let cityinpt = "egypt";

//add click evint to each city in the panel
cities.forEach(city => {
    city.addEventListener("click", e => {
        cityinpt = e.target.innerHTML;
        fetchweatherdata()
        app.style.opacity = "0";
    });
})

//form submit
form.addEventListener("submit", e => {
    if (search.value.length == 0) {
        alert("Please Type In City Name");
    } else {
        cityinpt = search.value;
        fetchweatherdata();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault()
});
function dayoftheweek(day,month,year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
        
};

function fetchweatherdata() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=a76994112b3e4096b86105402220810&q=${cityinpt}&aqi=yes
`).then(Response => Response.json()).then(data => {
    console.log(data);
    temp.innerHTML = data.current.temp_c + "&#176;";
    condition.innerHTML = data.current.condition.text;

    const date = data.location.localtime;
    const y= parseInt(date.substr(0,4))
    const m= parseInt(date.substr(5,2))
    const d= parseInt(date.substr(8,2))
    const time = date.substr(11)
    dateoutput.innerHTML = `${dayoftheweek(d, m, y)} ${d}, ${m} ${y}`;
    timeoutput.innerHTML = time;
    nameotput.innerHTML = data.location.name;
    const iconid = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    icon.src = "./icon/" + iconid
    cloud.innerHTML = data.current.cloud + "%";
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    
    let timeofday = "Day";
    const code = data.current.condition.code
    if (!data.current.is_day) {
        timeofday="Night"
    }
    if (code == 1000) {
        app.style.backgroundImage = `url(./img/${timeofday}/clear.jpg) `
        btn.style.background = "#e5ba92";
        if (timeofday=="Night") {
            btn.style.background = "#181e27";
        }
    } else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
        
     app.style.backgroundImage = `url(./img/${timeofday}/cloudy.jpg) `
    btn.style.background = "#fa6d1b";
       if (timeofday=="Night") {
            btn.style.background = "#181e27";
        } 
    } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
    ) {
        app.style.backgroundImage = `url(./img/${timeofday}/rainy.jpg) `
        btn.style.background = "#647d75";
       if (timeofday=="Night") {
            btn.style.background = "#325c80";
        } 
    } else {
        app.style.backgroundImage = `url(./img/${timeofday}/snowy.jpg) `
        btn.style.background = "#4d72aa";
       if (timeofday=="Night") {
            btn.style.background = "#1b1b1b";
        } 
    }
    app.style.opacity = "1";
})
        .catch(() => {
            alert("city not found,please try again");
            app.style.opacity = "1";
    })
}
fetchweatherdata()
