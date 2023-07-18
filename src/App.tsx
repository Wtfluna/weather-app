import "./style.scss";
import Card from "./Card";
import axios from "axios";
import React, { useState } from "react";

export interface Weather {
  date: string;
  icon: string;
  temperature: number;
}

function App() {
  // State
  const [searchValue, setSearchValue] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const weathers: Weather[] = [
    { date: "18/07", icon: "./src/assets/sun.png", temperature: 28 },
    { date: "19/07", icon: "./src/assets/sun.png", temperature: 46 },
    { date: "20/07", icon: "./src/assets/sun.png", temperature: 32 },
  ];

  // Comportement
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    const enteredValue = e.target.elements.search.value;
    setSearchValue(enteredValue);

    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: enteredValue,
            appid: "00782a9b7d335a8491b0f238077e40d6c",
            cnt: 5, // Récupérer les données météorologiques pour les 5 prochains jours
          },
        },
      );

      const weatherData = response.data.list.map((item) => ({
        date: item.dt_txt,
        icon: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
        temperature: item.main.temp,
      }));

      console.log(weatherData); // Affiche les données météorologiques extraites pour les 5 prochains jours
    } catch (error) {
      console.log("Error:", error);
    }

    e.target.elements.search.value = ""; // Réinitialise le champ de texte après la soumission
  };

  // Render
  return (
    <>
      <h1>Weather</h1>
      <form id="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Search By Location"
          autoComplete="off"
        />
        <button id="submit" type="submit">
          Search
        </button>
      </form>
      <div className="cards">
        {weathers.map((card) => (
          <Card key={card.date} weather={card} />
        ))}
      </div>
    </>
  );
}

export default App;
