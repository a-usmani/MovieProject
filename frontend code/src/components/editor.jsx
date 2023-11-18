
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axiosConfig"
import UserContext from '../context/user';

const Editor = ({movies,setMovies}) => {
    const [imdbId, setImdbId] = useState('');
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [trailerLink, setTrailerLink] = useState('');
    const [poster, setPoster] = useState('');
    const [genres, setGenres] = useState([]);
    const [backdrops, setBackdrops] = useState([]);
    const [reviewIds, setReviewIds] = useState([]);
    
    const navigation = useNavigate();
    const {user,setUser} = useContext(UserContext)
    
    useEffect(() => {
        // Check if user is admin
        if (!user?.roles.includes("ROLE_ADMIN")) {
            navigation('/');
        }
    }, [user, navigation]);

    

    const handleAddMovie = async () => {
        const movieData = {
            imdbId:imdbId,
            title:title,
            releaseDate:releaseDate,
            trailerLink:trailerLink,
            poster:poster,
            genres:genres,
            backdrops:backdrops,
            reviewIds:reviewIds,
        };

        try {
             const response = await api.post("/api/v1/movies/create", {
                imdbId:imdbId,
                title:title,
                releaseDate:releaseDate,
                trailerLink:trailerLink,
                poster:poster,
                genres:genres,
                backdrops:backdrops,
                reviewIds:reviewIds
            });

            // Movie added successfully
            console.log('Movie added successfully');
            setMovies([...movies, movieData]); // Update the movies list in state

        } catch (error) {
            console.error('Error adding movie', error);
            navigation('/login');
        }
    };

    const handleDeleteMovie = async (imdbId) => {
        try {
            const response = await api.delete(`/api/v1/movies/${imdbId}`);
            // Movie deleted successfully
            console.log('Movie deleted successfully');
            const updatedMovies = movies.filter(
                (movie) => movie.imdbId !== imdbId
            );
            setMovies(updatedMovies); // Update the movies list in state
        } catch (error) {
            console.error('Error deleting movie', error);
            navigation('/login');
        }
    };

    return (
        <div className=" p-4">
            <h1 className="text-2xl font-bold mb-4">Movie Editor</h1>
            <form>
                <label className="block mb-2">
                    IMDB ID:
                    <input
                        type="text"
                        value={imdbId}
                        onChange={(e) => setImdbId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full text-black"
                    />
                </label >
                <br />
                <label className="block mb-2">
                    Title:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label className="block mb-2">
                    Release Date:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </label>
                <br />
                <label className="block mb-2">
                    Trailer Link:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={trailerLink} onChange={(e) => setTrailerLink(e.target.value)} />
                </label>
                <br />
                <label className="block mb-2">
                    Poster:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={poster} onChange={(e) => setPoster(e.target.value)} />
                </label>
                <br />
                <label className="block mb-2">
                    Genres:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={genres} onChange={(e) => setGenres(e.target.value.trim().split(','))} />
                </label>
                <br />
                <label className="block mb-2">
                    Backdrops:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={backdrops} onChange={(e) => setBackdrops(e.target.value.trim().split(','))} />
                </label>
                <br />
                <label className="block mb-2">
                    Review IDs:
                    <input className="border border-gray-300 rounded-md p-2 w-full text-black" type="text" value={reviewIds} onChange={(e) => setReviewIds(e.target.value.trim().split(','))} />
                </label>
                <br />
                <button
                    type="button"
                    onClick={handleAddMovie}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Add Movie
                </button>
            </form>
            <div>
                <h2 className="text-xl font-bold mt-8">Movies</h2>
                {movies.map((movie) => (
                    <div key={movie.imdbId} className="flex items-center justify-between mt-4">
                        <span>{movie.title}</span>
                        <button
                            type="button"
                            onClick={() => handleDeleteMovie(movie.imdbId)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Editor;
