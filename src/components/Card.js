import React, {useEffect, useState} from 'react';
import '../styles/components_styles/card.css';
import apiConfig from '../api/apiConfig';
import axios from 'axios';

const Card = ({movie, genres}) => {
    function clickLike(e) {
        let likeIcon = e.target.closest('.likeIcon');
        likeIcon.classList.toggle('active');
    }
    const [duration, setDuration] = useState([]);
    // Récuperer la durée du film
    const getDuration = async () => {
        const response = await axios.get(apiConfig.baseUrl + '/movie/' + movie.id, {
            params: {
                api_key: apiConfig.apiKey,
                language: 'fr-FR'
            }
        });
        setDuration(response.data.runtime);
    };
    useEffect(() => {
        getDuration();
    }, []);
    return (
        <div className='gridItem'>
            <div className="overlay"></div>
            <img src=
            {
                movie.poster_path === null ? 'https://via.placeholder.com/500x750' :
                apiConfig.w500Image(movie.poster_path)
            }  
            alt="Poster" />
            <div className='gridItemContent'>
                <div className="headerCard">
                    <div className="title">
                       <h3>
                        {movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title}
                        </h3>
                        <div className="likeIcon" onClick={clickLike}>
                            <i className='bx bxs-heart'></i>
                        </div> 
                    </div>
                    <div className="info">
                        <p>
                            Durée: 
                            <span>
                                {
                                    // format duration
                                    Math.floor(duration / 60) + 'h' + duration % 60 + 'min'
                                }
                            </span> 
                        </p>
                        <hr />
                        <p>
                            Sortie: <span> {
                                // format date release_date
                                movie.release_date.split('-').reverse().join('-')
                            }</span>
                        </p>
                        <hr />
                        <p>
                            Genre: <span> 
                                 {
                                    // Récupérer le nom du genre
                                    genres.filter(genre => genre.id === movie.genre_ids[0]).map(genre => genre.name)
                                 }
                                </span>
                        </p>
                        <hr />
                        <p>Note:<span>{
                            // Math floor pour arrondir la note
                            Math.floor(movie.vote_average) + '/10'
                        }</span></p>
                    </div>
                </div>
                <div className="bodyCard">
                    <p>
                        {movie.overview.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview}
                    </p>
                </div>
                <div className="footerCard">
                    <button>Details</button>
                    <button>Bande Annonce</button>
                </div>
            </div>
        </div>
    )
}

export default Card