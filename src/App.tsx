import "./style.scss";
import Card from "./Card";
import axios from "axios";
import { useState, FormEvent } from "react";

export interface Weather {
  date: string;
  icon: string;
  temperature: number;
}

function App() {
  // State
  const [searchValue, setSearchValue] = useState("");
  const [city, setCity] = useState("");
  const [weathers, setWeathers] = useState<Weather[]>([]); // Ajouter l'annotation de type Weather[] ici
  const [photoUrl, setPhotoUrl] = useState("");

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  // Comportement
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    const enteredValue = searchValue;
    setSearchValue(enteredValue);

    try {
      // Requête à l'API OpenWeather
      const weatherResponse = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: enteredValue,
            appid: "0782a9b7d335a8491b0f238077e40d6c",
            cnt: 5,
            units: "metric",
          },
        },
      );

      setCity(weatherResponse.data.city.name);

      const weatherData = weatherResponse.data.list.map(
        (item: {
          dt_txt: any;
          weather: { icon: any }[];
          main: { temp: number };
        }) => ({
          date: formatDate(item.dt_txt),
          icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          temperature: Math.round(item.main.temp),
        }),
      );

      console.log(weatherData); // Affiche les données météorologiques extraites pour les 5 prochains jours dans la console
      setWeathers(weatherData); // Met à jour le state avec les données reçues de l'API

      // Requête à l'API Unsplash
      const unsplashResponse = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: enteredValue,
            client_id: "tX_xxd5dtGTYtRGTllfH1aMMBZYdfpTWlkGBOw3JvfE",
          },
        },
      );

      const firstPhoto = unsplashResponse.data.results[0];
      if (firstPhoto) {
        const photoUrl = firstPhoto.urls.regular;
        console.log(photoUrl); // Affiche l'URL de la photo
        setPhotoUrl(photoUrl); // Met à jour le state avec l'URL de la photo
      } else {
        console.log("No suitable photo found for the city");
        setPhotoUrl(""); // Réinitialise l'URL de la photo si aucune photo convenable n'est trouvée
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setSearchValue(""); // Réinitialise le champ de texte après la soumission
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button id="submit" type="submit">
          Search
        </button>
      </form>
      {city && <h2>{city}</h2>}
      {photoUrl && (
        <div className="img-container">
          <img src={photoUrl} alt="City" />
        </div>
      )}
      <div className="cards">
        {weathers.map((card, index) => (
          <Card key={`${card.date}-${index}`} weather={card} />
        ))}
      </div>
    </>
  );
}

export default App;
