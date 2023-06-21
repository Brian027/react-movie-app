import React, { useEffect, useState, useRef } from "react";
// Components
import Header from "../components/header/Header";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
// Styles
import "../styles/accueil.css";
// API
import axios from "axios";
import apiConfig from "../api/apiConfig";
// jQuery
import $ from "jquery";
// Gsap
import { gsap } from "gsap";

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

  // Slider
  const [current, setCurrent] = useState(0);
  const length = movies.length;
  const cardRef = useRef(null);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    // Animation avec Gsap
    gsap.fromTo(
      cardRef.current.children,
      { x: 0, opacity: 1 },
      { x: -100, opacity: 0, duration: 1 }
    )
    if (current === length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  // Mettre une durée de 10 secondes entre chaque slide

  useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 10000);
  }, [current]);

  return (
    <>
      <div className="navigation">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="homeSection" ref={cardRef}>
        {
          movies && movies.map((movie, index) => {
            if (index === current) {
              return (
                <Header movie={movie} genres={genres} key={movie.id} />
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
