async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city.");
        return;
    }

    const apiKey = '84072ba115974791844150512251903'; // Your API Key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weather-info").innerHTML = `<p>Error: ${data.error.message}</p>`;
        } else {
            const { name, region, country } = data.location;
            const { temp_c, temp_f, condition, humidity, wind_kph } = data.current;

            const weatherHtml = `
                <h2>${name}, ${region}, ${country}</h2>
                <p><strong>Temperature:</strong> ${temp_c}°C (${temp_f}°F)</p>
                <p><strong>Condition:</strong> ${condition.text}</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind_kph} km/h</p>
            `;
            document.getElementById("weather-info").innerHTML = weatherHtml;
        }
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
}
