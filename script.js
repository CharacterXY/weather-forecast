const apiKey = "DIg3trcMMwiKkO52sCHzwUGs3fJpom64zoQ5NmjbgI4";
const accessKey = "6kT-9mKGJqyJ7VKghlMVlRgvpWJU8wMP5E1sazYpljM";

/*
 */
setInterval(function () {
  let date = new Date();
  let time = date.toLocaleTimeString("hr-HR");

  const dayOrNightTag = time.slice(0, 2);
  tag = time > 12 ? "PM" : "AM";
  let watch = document.getElementById("clock");
  watch.textContent = `${time} ${tag}`;
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  // const form = document.getElementById("weather");

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      console.log("Stisli ste enter");
      const city = document.getElementById("input-location").value;
      const apiKey = "80e6402a2008e81f361c273705156873";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hr`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Grad nije pronađen");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Tu ide funkcija koja ucita karticu
          let location = document.getElementById("location");
          let temperature = document.getElementById("temperature");
          let humidity = document.getElementById("humidity");
          let WindSpeed = document.getElementById("windSpeed");

          location.innerHTML = `Location name:  <strong>${data.name}</strong>`;
          temperature.innerHTML = `${data.main.temp}°C <i class="fa-solid fa-temperature-three-quarters"></i>`;
          let humidityIconHTML = `<img src="humidity.svg" alt="Vlažnost" style="height: 20px; width: 20px" />`;
          let windSpeedIcon = `<img src="wind.svg" alt="Vlažnost" style="height: 20px; width: 20px" />`;
          humidity.innerHTML = `${data.main.humidity} % ${humidityIconHTML}`;
          WindSpeed.innerHTML = `${data.wind.speed} km/h ${windSpeedIcon}`;

          let unslpash = `https://api.unsplash.com/search/photos?query=${city}&client_id=6kT-9mKGJqyJ7VKghlMVlRgvpWJU8wMP5E1sazYpljM`;

          fetch(unslpash)
            .then((response) => {
              if (!response.ok) {
                throw new Erorr(`Doslo je do greske !`);
              }
              return response.json();
            })
            .then((images) => {
              let imageUrl = images.results[0].urls.regular;
              let image = document.getElementById("weatherImage");
              image.src = imageUrl;
              console.log(unslpash);
            })
            .catch((error) => {
              console.error("Greska", error);
            });
        })
        .catch((error) => {
          console.error("Došlo je do greške", error);
        });

      e.preventDefault();
    } else {
      console.log("Niste stisli enter");
    }
  });
});
