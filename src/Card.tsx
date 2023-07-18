function Card({ weather }) {
  return (
    <article className="card">
      <h2 className="card__date">{weather.date}</h2>
      <img className="card__picture" src={weather.icon} alt="sun"></img>
      <div className="card__temperature">
        <p>{weather.temperature}&deg;C</p>
      </div>
    </article>
  );
}

export default Card;
