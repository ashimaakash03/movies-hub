//import React from 'react'
import posterNotFound from '../assets/no-movie.png'
import star_icon from '../assets/star.svg'

// eslint-disable-next-line react/prop-types
const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language}}) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `${posterNotFound}`}
                 alt={title}/>
            <div className="mt-4 text-white"><h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src={star_icon} alt=""/>
                        {/* eslint-disable-next-line react/prop-types */}
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className="lang">{original_language.toUpperCase()}</p>
                    <span>•</span>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
