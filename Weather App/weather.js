let cityNameTextBox = document.getElementById("cityNameTextBox")
let submitButton = document.getElementById("submitButton")
let weatherUL = document.getElementById("weatherUL")


function getWeather(completion) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=18ddfc7710eb419dd96fff604e42525a&units=imperial')
        .then((response) => {
            console.log(response)
            return response.json()
        }).then((json) => {
            completion(json) // Passing this data to the callback function
        })
        .catch((error) => {
            console.log(error)
        })

}
// Allows us to have acccess to the data outside of this function:
getWeather((weathers) => {
    displayData(weathers)
})

function displayData(weathers) {

    weatherUL.innerHTML =
        ` 
    <li>City: ${weathers.name}</li>
    <img src="${descriptionIcon()}"></img>
    <li>Min Temperature: ${weathers.main.temp_min} &#x2109 </li>
    <li>Max Temperature: ${weathers.main.temp_max} &#x2109 </li>
    <li>Pressure: ${weathers.main.pressure}
    <hr>
    `
    console.log(weathers.main.temp_min)

}

submitButton.addEventListener('click', () => {
    console.log('fired')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameTextBox.value}&APPID=18ddfc7710eb419dd96fff604e42525a&units=imperial`)
        .then((response) => {
            console.log(response)
            return response.json()
        }).then((json) => {
            displayData(json)
        })
        .catch((error) => {
            console.log(error)
        })

})

function descriptionIcon(weathers) {
    if (weathers === "light rain") {

        return src = "015-rain-3.png"

    }
    else if (weathers === "sunny") {

        return src = "045-sun.jpg"

    }
    else {
        return src = "017-thermometer-1.png"
    }
}

getLocationButton.addEventListener('click', () => {
    let location = document.getElementById("location");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            location.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        location.innerHTML = "<h3>My Current Location:</h3> " + "<br>Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude + `<hr></hr>`;
    }
getLocation()
})