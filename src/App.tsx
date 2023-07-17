import "./style.scss";
import Card from "./Card";

function App() {
  return (
    <>
      <h1>Weather</h1>
      <form id="form">
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default App;
