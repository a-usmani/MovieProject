import React from "react"
import Carousel from "react-material-ui-carousel"
import { Paper } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons"

export default function Hero (props) {
    const navigate=useNavigate()

    const reviews = (movieId) => {
        navigate(`/Reviews/${movieId}`)
    }

    return(
        <div className="w-screen bg-black">
            <Carousel>
                {props.movies ? 
                props.movies.map(movie => {
                    return(
                        <Paper key={movie.imdbId}>
                            <div className="h-[550px] bg-black" >
                                <div className={`bg-no-repeat w-full h-full bg-cover bg-movie-pattern`} style={{"--img": `url(${movie.backdrops[0]})`}}>
                                    <div className="absolute top-[20px] flex flex-col justify-evenly w-full md:flex-row items-center md:top-[200px]">
                                        <div className="h-[300px] border-[1px] rounded-[10px] border-solid border-yellow-400 overflow-hidden">
                                            <img className="h-full w-full" src={movie.poster} alt="" />
                                        </div>
                                        <div className="flex text-white items-center ">
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className="flex justify-between items-center w-[300px]">
                                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className="w-[150px]">
                                                    <FontAwesomeIcon className="text-yellow-400 text-5xl transition-all transform  delay-150 hover:text-[4rem] hover:text-white"
                                                        icon = {faCirclePlay}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="">
                                                <button className='text-cyan-700 text-lg rounded-md h-10 border-2 border-cyan-700 px-4 hover:text-black hover:bg-cyan-700 transition delay-150 hover:borger-black' onClick={() => reviews(movie.imdbId)} >Reviews</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                }) : null
                }
            </Carousel>
        </div>
    )
}