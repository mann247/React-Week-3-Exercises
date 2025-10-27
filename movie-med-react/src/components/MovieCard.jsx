import React from 'react';
import './MovieCard.css'

const MovieCard = () => {
    return(
        <a href="" className='movie_card'>
        <img src="" alt="" className='movie_poster' />

        <div className="movie_details">
            <h3 className="movie_details_heading"> Movie Name</h3>
            <div className="align_center movie_date_rate">
                <p> (insert year)</p>
                <p> (insert rating)</p>
            </div>
            <p className="movie_description"> Lorem Ipsum</p>
        </div>
        </a>
    )
}

export default MovieCard