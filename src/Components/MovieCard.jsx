import React from "react";
import { StarFilled } from "@ant-design/icons";
// import Link from

const MovieCard = ({ movie }) => {
  return (
    <>
      <a href={movie.imdb_url} target="_blank" className="container">
        <div>
          <div
            style={{
              color: "black",
            }}
          >
            <h3 className="removerUnderline">{movie.movie}</h3>
            <img src={movie.image} alt={movie.movie} />
            <p>
              Rating: {movie.rating} <StarFilled />
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default MovieCard;
