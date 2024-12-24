import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./Components/MovieList";
import "./App.css";

const App = () => {
  //please note that if I had more resources like images the I would made this look more attractive but still I tried my to make it look more attractive
  // I have added a search filter for making the database more user friendly
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://dummyapi.online/api/movies?page=${page}&limit=10`
      );
      if (response.data.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more movies to load
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((movie) =>
        movie.movie.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filtered);
      setFilteredMovies(filtered);
    }
  };

  const handleDropdownClick = (movieName) => {
    setSearchQuery(movieName);
    setFilteredMovies([]); // Clear dropdown after selecting a movie
  };

  return (
    <div>
      <h1>Movie Database</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        {filteredMovies.length > 0 && (
          <div className="dropdown">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="dropdown-item"
                onClick={() => handleDropdownClick(movie.movie)} // Handle click on dropdown item
              >
                {movie.movie}
              </div>
            ))}
          </div>
        )}
      </div>
      <MovieList movies={filteredMovies.length > 0 ? filteredMovies : movies} />{" "}
      {/* Show filtered movies if any */}
      {loading && <p>Loading more movies...</p>}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
};

export default App;
