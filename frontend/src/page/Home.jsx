import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Chip,
  Collapse,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { getPopularMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";
import "../css/AppleTVHome.css";

const genresMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10749: "Romance",
  27: "Horror",
  878: "Sci-Fi",
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    window.addEventListener("homeClick", fetchMovies); // added Event Listener
     return () => window.removeEventListener("homeClick", fetchMovies);
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setHeroMovie(movies[0]);
    }
  }, [movies]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      carousel.scrollBy({ left: e.deltaY < 0 ? -200 : 200 });
    };
    if (carousel) carousel.addEventListener("wheel", onWheel);
    return () => {
      if (carousel) carousel.removeEventListener("wheel", onWheel);
    };
  }, []);

  if (loading) {
    return (
      <Box className="appletv-loader">
        <CircularProgress size={70} color="secondary" />
      </Box>
    );
  }

  return (
    <Box className="appletv-root">
      {heroMovie && (
        <motion.div
          className="appletv-hero"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box className="appletv-hero-overlay glass-light">
            <Typography variant="h1" className="appletv-hero-title">
              {heroMovie.title}
            </Typography>

            <Box className="appletv-genre-badges">
              {heroMovie.genre_ids?.map((id) => (
                <motion.div key={id} whileHover={{ scale: 1.1 }}>
                  <Chip
                    label={genresMap[id] || "Unknown"}
                    size="small"
                    sx={{
                      mr: 1,
                      backgroundColor: "#ffffff33",
                      color: "white",
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            <Box className="hero-meta">
              <Typography variant="body2">
                <strong>Release:</strong> {heroMovie.release_date || "Unknown"}
              </Typography>
              <Typography variant="body2">
                <strong>Rating:</strong> ⭐ {heroMovie.vote_average}/10
              </Typography>
              <Typography variant="body2">
                <strong>Director:</strong> Christopher Nolan
              </Typography>
            </Box>

            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              className={`expand-toggle ${expanded ? "expanded" : ""}`}
            >
              <ExpandMore color="success" />
            </IconButton>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography className="appletv-hero-subtitle scrollable-info">
                {heroMovie.overview || "No description available."}
              </Typography>
            </Collapse>
          </Box>
        </motion.div>
      )}
      <Box sx={{ height: "3rem" }} /> {/* breathing space */}
      {movies.length > 0 ? (
        <Box className="appletv-carousel" ref={carouselRef}>
          {movies.map((movie, i) => (
            <motion.div
              key={`${movie.id}-${i}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="appletv-movie-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              onClick={() => setHeroMovie(movie)}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </Box>
      ) : (
        <Typography align="center" color="white" mt={10}>
          No Movies Found
        </Typography>
      )}
    </Box>
  );
};

export default Home;
