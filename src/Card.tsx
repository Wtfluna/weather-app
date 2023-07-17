function Card() {
  return (
    <article className="card">
      <h2 className="card__date">18/07</h2>
      <img className="card__picture" src="./src/assets/sun.png" alt="sun"></img>
      <div className="card__temperature">
        <p>28&deg;</p>
      </div>
    </article>
  );
}

export default Card;
