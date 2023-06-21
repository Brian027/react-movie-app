import React, {useEffect, useState} from 'react'
import apiConfig from '../../api/apiConfig'
import '../../styles/components_styles/header.css'
import axios from 'axios'

const Header = ({ movie, genres}) => {

    // Récupérer les acteurs du film
    const [actors, setActors] = useState([])
    const getActors = async () => {
        const response = await axios.get(apiConfig.baseUrl + "/movie/" + movie.id + "/credits", {
            params: {
                api_key: apiConfig.apiKey,
                language: "fr-FR"
            }
        })
        setActors(response.data.cast)
    };

    useEffect(() => {
        getActors()
    }, [movie])
    
    return (
        <header>
            <div className="background">
                <img src={
                    apiConfig.originalImage(movie.backdrop_path)
                } alt="" />
            </div>
            <div className="content">
                <div className="left">
                    <img src=
                        {
                            apiConfig.w500Image(movie.poster_path)
                        }
                        alt="" />
                </div>
                <div className="right">
                    <h1>
                        {movie.title}
                    </h1>
                    <div className="genres">
                        {
                            // Afficher les 3 premiers genres
                            genres.map((genre, index) => {
                                if (index < 3) {
                                    return (
                                        <span key={genre.id}>
                                            {genre.name}
                                        </span>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="rating">
                        <div className="circle">
                            <div className="outer">
                                <div className="inner">
                                    <span>
                                        {movie.vote_average}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p>Note des utilisateurs</p>
                    </div>
                    <div className="overview">
                        <h3>Synopsis</h3>
                        <p>
                            {
                                movie.overview
                            }
                        </p>
                    </div>
                    <div className="actor">
                        <div className="actorList">
                            {
                                actors.map((actor, index) => {
                                    if (index < 9) {
                                        return (
                                            <div className="actor-item" key={actor.id}>
                                                <h4>
                                                    {actor.name}
                                                </h4>
                                                <span>
                                                    {actor.character}
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header