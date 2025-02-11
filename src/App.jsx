//import React from 'react'

import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import Loading from "./components/Loading.jsx";
import MovieCard from "./components/MovieCard.jsx";


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    //optimising efficiency of search movie using useDebounce hook for 2s delay
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 2000, [searchTerm])

    const fetchMovies = async (searchQuery = '') => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endpoint = searchQuery ?
                `${API_BASE_URL}/search/movie?query=${encodeURI(searchQuery)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error("Could not fetch movies");
            }
            const data = await response.json();
            console.log(data.results);
            if (data.results.length === 0) {
                setErrorMessage(data.message);
                setMoviesList([]);
            }
            setMoviesList(data.results);
        } catch (error) {
            console.log(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm])
    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src="../src/assets/hero.png" alt="Hero Banner"/>
                    <h1>Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                <section className='all-movies'>
                    <h2 className="mt-[40px]">All Movies...</h2>
                    {isLoading ? <Loading/> : errorMessage ?
                        <p className="text-red-500">{errorMessage}</p> : <ul>{moviesList.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}</ul>}
                </section>
            </div>
        </main>
    )
}
export default App
