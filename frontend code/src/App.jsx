import "./input.css"
import api from "./api/axiosConfig"
import { useState, useEffect } from "react"
import {Route, Routes} from 'react-router-dom'

import Layout from "./components/layout"
import Home from "./components/home"
import Trailer from "./components/trailer"
import Reviews from "./components/reviews"
import Header from "./components/header"

export default function App() {
  const [movies,setMovies] = useState([])
  const [movie,setMovie] = useState([])
  const [reviews,setReviews] = useState([])

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies")
      setMovies(response.data)
    } catch (error) {
      console.log(error)
    }  
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`)  

      const singleMovie=response.data
      setMovie(singleMovie)
      setReviews(singleMovie.reviewIds)
    } catch (error) {
      console.log(error)
    }
  }
console.log(reviews)
  useEffect (() => {
    getMovies()
  },[])

  return (
      <div className="box-border flex flex-col min-h-screen  bg-black text-white">
        <Header/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies}/>}/>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
            <Route path="Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
            <Route path="/*" element={<h1>Not Found!</h1>} />
          </Route>
        </Routes>
      </div>
  )
}

