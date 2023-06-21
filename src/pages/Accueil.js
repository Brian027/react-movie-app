import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "../styles/accueil.css";
import axios from "axios";
import apiConfig from "../api/apiConfig";
import Header from "../components/header/Header";

function Accueil() {
  document.title = "React Movies | Accueil";
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Récupérer les films populaires
  const getMovies = async () => {
    const response = await axios.get(apiConfig.baseUrl + "/movie/popular", {
      params: {
        api_key: apiConfig.apiKey,
        language: "fr-FR",
        page: 1,
      },
    });
    setMovies(response.data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  // Récupérer les genres de films
  const getGenres = async () => {
    const response = await axios.get(apiConfig.baseUrl + "/genre/movie/list", {
      params: {
        api_key: apiConfig.apiKey,
        language: "fr-FR",
      },
    });
    setGenres(response.data.genres);
  };
  useEffect(() => {
    getGenres();
  }, []);

  // Récupérer les films par recherche
  const getMoviesBySearch = async () => {
    const response = await axios.get(apiConfig.baseUrl + "/search/movie", {
      params: {
        api_key: apiConfig.apiKey,
        language: "fr-FR",
        query: searchValue,
      },
    });
    setMovies(response.data.results);
  };
  useEffect(() => {
    getMoviesBySearch();
    if (searchValue === "") {
      getMovies();
    }
  }, [searchValue]);

  return (
    <>
      <div className="navigation">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="homeSection">
        {
          // Afficher UNIQUEMENT le premier film
          movies.map((movie, index) => {
            if (index === 6) {
              return (
                <Header 
                movie={movie} key={movie.id} genres={genres}
                />
              )
            }
          })
        }
      </div>
      <section className="movies">
        <h1>Populaire actuellement:</h1>
        <div className="gridContainer">
          {
            genres && movies.map((movie) => (
              <Card movie={movie} key={movie.id} genres={genres} />
            ))
          }
        </div>
      </section>
    </>
  );
}

export default Accueil;
