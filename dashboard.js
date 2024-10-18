const apiKey = "95f499f84083db31be902cb4a9e0f6f5"; // OpenWeather API key

// DOM Elements
const searchBar = document.querySelector(".search-bar");
const weatherInfo = document.querySelector(".weather-info");

let temperatureChart;
let weatherConditionChart;
let temperatureLineChart;

// Function to fetch weather data
async function getWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("City not found");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayWeatherData(currentData);
    updateBackground(currentData.weather[0].main);
    createTemperatureChart(forecastData);
    createWeatherConditionChart(forecastData);
    createTemperatureLineChart(forecastData);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

// Function to display weather data with added design classes
function displayWeatherData(data) {
  const { name, main, weather, wind } = data;
  weatherInfo.innerHTML = `
        <div class="weather-card">

            <div class="weather-details">
                <div class="weather-head">
                    <h2 class="city-name">${name}</h2>
                    <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
                </div>
                <p><strong>Temperature:</strong> ${main.temp} °C</p>
                <p><strong>Humidity:</strong> ${main.humidity} %</p>
                <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                <p><strong>Weather:</strong> ${weather[0].description}</p>
            </div>
        </div>
    `;

  // Add custom styling for weather card
  const weatherCard = document.querySelector(".weather-card");
  weatherCard.style.display = "flex";
  weatherCard.style.flexDirection = "column";
  weatherCard.style.justifyContent = "space-around";
  weatherCard.style.alignItems = "center";
  weatherCard.style.backgroundColor = "#ffffff";
  weatherCard.style.borderRadius = "8px";
  weatherCard.style.padding = "10px";
  weatherCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  //Style weather head
  const weatherHead = document.querySelector(".weather-head");
  weatherHead.style.display = "flex";

  // Styling for weather details
  const weatherDetails = document.querySelector(".weather-details");
  weatherDetails.style.display = "flex";
  weatherDetails.style.flexDirection = "column";
  weatherDetails.style.backgroundColor = "#dfe3f2";
  weatherDetails.style.paddingLeft = "55px";
  weatherDetails.style.paddingRight = "55px";
  weatherDetails.style.borderRadius = "10px";
  weatherDetails.style.gap = "10px";
  weatherDetails.style.color = "black";
}

// Function to update the background based on the weather
function updateBackground(weatherCondition) {
  console.log(weatherCondition);
  const weatherCard = document.querySelector(".weather-card");
  switch (weatherCondition.toLowerCase()) {
    case "clear":
      weatherCard.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1717446586299-41283dbe7e87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsZWFyJTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D')";
      break;
    case "clouds":
      weatherCard.style.backgroundImage =
        "url('https://plus.unsplash.com/premium_photo-1674834298045-e405bc99076b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWRzfGVufDB8fDB8fHww')";
      break;
    case "rain":
      weatherCard.style.backgroundImage =
        "url('https://unsplash.com/photos/closeup-photography-of-water-drops-on-body-of-water-22x7fxFpl_8')";
      break;
    case "snow":
      weatherCard.style.backgroundImage =
        "url('https://unsplash.com/photos/ground-covered-with-snow-cFplR9ZGnAk')";
      break;
    case "thunderstorm":
      weatherCard.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1593525798209-60097dfde974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ2fHx8ZW58MHx8fHx8')";
      break;
    case "mist":
      weatherCard.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      break;

    case "fog":
      weatherCard.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      break;

    case "haze":
      weatherCard.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      break;
    default:
      weatherCard.style.backgroundImage =
        "url('https://www.istockphoto.com/photo/blue-sky-with-sun-gm491701259-39697816?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunny&utm_medium=affiliate&utm_source=unsplash&utm_term=sunny%3A%3Areduced-affiliates%3Ahalf')";
      break;
  }
  weatherCard.style.backgroundSize = "cover";
  weatherCard.style.backgroundPosition = "center";
  weatherCard.style.opacity = 0.8;
}

// Function to create the temperature chart
function createTemperatureChart(forecastData) {
  const dailyData = forecastData.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );
  const dates = dailyData.map((reading) =>
    new Date(reading.dt * 1000).toLocaleDateString()
  );
  const temperatures = dailyData.map((reading) => reading.main.temp);

  const ctx = document.getElementById("temperatureChart").getContext("2d");

  // Check if a chart already exists and destroy it
  if (temperatureChart) {
    temperatureChart.destroy();
  }

  temperatureChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "5-Day Temperature Forecast",
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
  });
}

// Function to create the weather condition doughnut chart
function createWeatherConditionChart(forecastData) {
  const dailyData = forecastData.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );
  const weatherConditions = dailyData.map((reading) => reading.weather[0].main);

  const conditionCounts = weatherConditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(conditionCounts);
  const data = Object.values(conditionCounts);

  const ctx = document.getElementById("weatherConditionChart").getContext("2d");

  // Check if a chart already exists and destroy it
  if (weatherConditionChart) {
    weatherConditionChart.destroy();
  }

  weatherConditionChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "5-Day Weather Condition Distribution",
        },
      },
    },
  });
}

// Function to create the temperature line chart
function createTemperatureLineChart(forecastData) {
  const hourlyData = forecastData.list.slice(0, 40); // Get 5 days of 3-hour forecasts
  const times = hourlyData.map((reading) =>
    new Date(reading.dt * 1000).toLocaleString()
  );
  const temperatures = hourlyData.map((reading) => reading.main.temp);

  const ctx = document.getElementById("temperatureLineChart").getContext("2d");

  // Check if a chart already exists and destroy it
  if (temperatureLineChart) {
    temperatureLineChart.destroy();
  }

  temperatureLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "5-Day Temperature Changes",
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 5, // Limit the number of x-axis labels for readability
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
  });
}

// Event listener for search bar
searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBar.value.trim();
    if (city !== "") {
      getWeatherData(city);
    }
  }
});
