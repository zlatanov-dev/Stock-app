import React from "react";
import { Link } from "react-router-dom";
import { useGetMoversQuery } from "../services/financialApi.js";

function AnnouncementBar() {
  const { data, isFetching } = useGetMoversQuery();

  if (isFetching) return <div>Loading...</div>;
  const { gainers, actives, losers } = data;
  const combinedArray = [...gainers, ...actives, ...losers];
  const moversList = shuffleArray(combinedArray);

  return (
    <div>
      <button className="button">
        <div className="announcement-wrapper">
          {moversList?.map((mover, index) => (
            <div key={index} className="announcement-item">
              <Link to={`/stocks/${mover.performanceID}/details`}>{mover.ticker}</Link>
              {mover.percentNetChange > 0 ? (
                <p className="announcement-paragraph green">
                  <span>{mover.percentNetChange.toFixed(2)}%</span>
                </p>
              ) : (
                <p className="announcement-paragraph red">
                  <span>{mover.percentNetChange.toFixed(2)}%</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </button>
    </div>
  );
}


// Fisher-Yates (also known as the Knuth) shuffle algorithm
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

export default AnnouncementBar;
