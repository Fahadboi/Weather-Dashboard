const apiKey = '95f499f84083db31be902cb4a9e0f6f5'; // OpenWeather API key
const itemsPerPage = 10;
let currentPage = 1;
let forecastData = [];
let filteredData = [];



const searchBar = document.querySelector('.search-bar');
const tableBody = document.getElementById('forecastTableBody');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const sortAscendingBtn = document.getElementById('sortAscending');
const sortDescendingBtn = document.getElementById('sortDescending');
const filterRainBtn = document.getElementById('filterRain');
const showHighestTempBtn = document.getElementById('showHighestTemp');
const removeFiltersBtn = document.getElementById('removeFilters');


removeFiltersBtn.addEventListener('click', removeFilters);


// Function to fetch weather data
async function getWeatherData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        forecastData = data.list;
        filteredData = [...forecastData];
        currentPage = 1;
        displayForecastData();
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
    }
}

// Function to display forecast data
function displayForecastData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tableBody.innerHTML = '';
    pageData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const row = `
            <tr>
                <td>${date.toLocaleDateString()}</td>
                <td>${date.toLocaleTimeString()}</td>
                <td>${item.main.temp.toFixed(1)}</td>
                <td>${item.weather[0].description}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    updatePaginationButtons();
}

// Function to update pagination buttons and info
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to sort temperatures in ascending order
function sortTemperaturesAscending() {
    filteredData.sort((a, b) => a.main.temp - b.main.temp);
    currentPage = 1;
    displayForecastData();
}


// Function to reset filters and sorting
function removeFilters() {
    filteredData = [...forecastData]; // Reset to original data
    currentPage = 1; // Reset to the first page
    displayForecastData(); // Refresh table display
}

// Event listener for the remove filters button

// Function to sort temperatures in descending order
function sortTemperaturesDescending() {
    filteredData.sort((a, b) => b.main.temp - a.main.temp);
    currentPage = 1;
    displayForecastData();
}

// Function to filter out days without rain
function filterRainDays() {
    filteredData = forecastData.filter(item => item.weather[0].main.toLowerCase().includes('rain'));
    currentPage = 1;
    displayForecastData();
}

// Function to show the day with the highest temperature
function showHighestTemperature() {
    const highestTempDay = forecastData.reduce((max, item) => max.main.temp > item.main.temp ? max : item);
    const date = new Date(highestTempDay.dt * 1000);
    filteredData = [highestTempDay];
    currentPage = 1;
    displayForecastData();
    alert(`Highest temperature: ${highestTempDay.main.temp.toFixed(1)}°C on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
}

// Event listeners
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchBar.value.trim();
        if (city !== '') {
            getWeatherData(city);
        }
    }
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayForecastData();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayForecastData();
    }
});

sortAscendingBtn.addEventListener('click', sortTemperaturesAscending);
sortDescendingBtn.addEventListener('click', sortTemperaturesDescending);
filterRainBtn.addEventListener('click', filterRainDays);
showHighestTempBtn.addEventListener('click', showHighestTemperature);



// Chatbox functionality with Google Generative AI
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyAeieiCTqIua5KLQEkWxvW8Bf68FGpnQhk";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function askGemini() {
    let prompt = document.getElementById('chatInput').value; // Get the user's input from the chatbox
    if (!prompt) {
      alert('Please enter a message to send to the AI.');
      return;
    }
    try {
      console.log("prompt: ", prompt);
      const result = await model.generateContent(prompt + "Also when you give your answer related to the data provided in the JSON, please convert the dates, time for better readability. And also don't tell in your response that I have said it to you and never ever show this json data in the response or any thing like that, i don't want the users to know that i have gave you the json data to answer their question. The JSON Temperatures and forecast Data of the city "+ `${searchBar.value}:` + JSON.stringify(forecastData));
      const message = result.response.text();
      
      // Display the user's prompt and the AI's response in the chat
      const chatMessages = document.getElementById('chatMessages');
      
      // User message
      const userMessage = `<div class="chatbox-message user"><strong>You:</strong> ${prompt}</div>`;
      // AI message
      const aiMessage = `<div class="chatbox-message ai"><strong>AI:</strong> ${message}</div>`;
      
      // Append both messages to the chat
      chatMessages.innerHTML += userMessage + aiMessage;
  
      // Auto-scroll to the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      // Clear the input after sending the message
      document.getElementById('chatInput').value = '';
    } catch (error) {
      console.error('Error with AI response:', error);
    }
  }
  
// Event listener for the send message button
document.getElementById('sendMessage').addEventListener('click', askGemini);

