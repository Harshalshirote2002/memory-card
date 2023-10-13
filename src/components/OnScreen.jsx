import Footer from "./Footer";
import { useEffect, useState } from "react";

function AddCards({ queries, onMove }) {
  const [cards, setCards] = useState([]);

  const handleClick = (e) => {
    for (let k = 0; k < queries[0].length; k++) {
      if (queries[0][k] === parseInt(e.target.id)) {
        if (queries[1][k] === 1) {
          alert("Game lost!");
        } else {
          queries[1][k] = 1;
        }
      }
    }
    onMove(queries);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const newCards = [];
        for (let query of queries[0]) {
          const searchUrl = `https://pokeapi.co/api/v2/pokemon/${query}/`;
          const response = await fetch(searchUrl, { mode: "cors" });
          const data = await response.json();
          const srcUrl2 = data.sprites.other.dream_world.front_default;
          const pokeName = data.name;
          // console.log(data);
          newCards.push(
            <div className="card" onClick={handleClick} id={query}>
              <img id={query} key={query} src={srcUrl2} />
              <div className="pokemon-name">{pokeName}</div>
            </div>
          );
        }

        setCards(newCards);
      } catch {
        setCards([]);
        console.error("Just an Error");
      }
    };

    fetchCards();
  }, [queries, onMove]);

  return <div className="cards-container">{cards}</div>;
}

export default function OnScreen() {
  const [charState, setCharState] = useState([
    [1, 25, 30, 40, 57, 60, 77, 83, 90, 110, 135, 15],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const shuffleArray = (array) => {
    for (let i = 0; i < array[0].length; i++) {
      const j = Math.floor(Math.random() * i + 1);
      [array[0][i], array[0][j]] = [array[0][j], array[0][i]];
      [array[1][i], array[1][j]] = [array[1][j], array[1][i]];
    }
    return array.splice(0);
  };

  const handleChange = (someArray) => {
    setCharState(shuffleArray(someArray));
  };

  return (
    <>
      <header>Memory Card Game</header>
      <main>
        <AddCards queries={charState} onMove={handleChange} />
      </main>
      <Footer />
    </>
  );
}
