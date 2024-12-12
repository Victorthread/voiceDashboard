function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
  }
  
  setInterval(updateTime, 1000); // Update time every second
  updateTime(); // Initial call
  
  // Voice Recognition Setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onstart = () => console.log('Voice recognition started...');
recognition.onerror = (e) => console.error('Error:', e.error);
recognition.onresult = (e) => {
  const command = e.results[0][0].transcript.toLowerCase();
  handleVoiceCommand(command);
};

// Start Listening on Click
document.body.onclick = () => recognition.start();

function handleVoiceCommand(command) {
  if (command.includes('weather')) {
    fetchWeather();
  } else if (command.includes('add task')) {
    const task = command.replace('add task', '').trim();
    addTask(task);
  } else {
    alert(`Unknown command: "${command}"`);
  }
}
const API_KEY = 'b430a4cf850c37d8a7b910618692a556';

function fetchWeather() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const weatherElement = document.getElementById('weather');
    weatherElement.textContent = `Weather: ${data.weather[0].description}, ${data.main.temp}°C`;
  });
}
function addTask(task) {
    const taskInput = document.getElementById('taskInput');
    const tasks = document.getElementById('tasks');
  
    if (task || taskInput.value.trim()) {
      const li = document.createElement('li');
      li.textContent = task || taskInput.value.trim();
      tasks.appendChild(li);
      taskInput.value = '';
    }
  }
  
  document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  