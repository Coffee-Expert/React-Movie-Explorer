import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import "../css/Favorites.css";
import { getPopularMovies, searchMovies } from "../services/api";
import { Vortex } from "react-loader-spinner";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error.message);
        setError("Failed to Load movies....");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = (obj) => {};

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmedMovie = searchQuery.trim();
      const searchedMovies = await searchMovies(trimmedMovie);
      setMovies(searchedMovies);
    } catch (error) {
      console.log(error.message);
      setError("Failed to search movie....");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="loading">
        <Vortex
          visible={true}
          height="100"
          width="100"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.length == 0 ? (
          <div className="favorites-empty">
            <h2>No Movies Found :(</h2>
            <p>Starting search another movie and they will appear here</p>
          </div>
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
