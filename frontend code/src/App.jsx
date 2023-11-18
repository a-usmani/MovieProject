import "./input.css"
import api from "./api/axiosConfig"
import { useState, useEffect,lazy,Suspense } from "react"
import {Route, Routes} from 'react-router-dom'
import UserContext from "./context/user"
import Loader from "./loader/loader"
import Layout from "./components/layout"
import useLocal from "./hooks/use-local"
const Home = lazy(() => import("./components/home"))
const Trailer = lazy(() => import("./components/trailer"))
const Reviews = lazy(() => import("./components/reviews"))
const Header = lazy(() => import("./components/header"))
const Login = lazy(() => import("./components/login"))
const Editor = lazy(() => import("./components/editor"))
const Signup = lazy(() => import("./components/signup"))

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

      const singleMovie = response.data
      setMovie(singleMovie)

      const reviewIds = singleMovie.reviewIds
      const updatedReviews = []

      for (const reviewId of reviewIds) {

        const userResponse = await api.get(`/api/v1/reviews/${reviewId.id}/user`)
        const user = userResponse.data

        const reviewWithUsername = {
          ...reviewId,
          username: user.username
        }

        updatedReviews.push(reviewWithUsername)
      }

      setReviews(updatedReviews)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect (() => {
    getMovies()
  },[])

const { user, setUser } = useLocal()
  return (
    <Suspense fallback={<Loader />}>
      <div className="box-border flex flex-col min-h-screen  bg-black text-white">
        <UserContext.Provider value={{user,setUser}}>
          <Header/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home movies={movies}/>}/>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
              <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
              <Route path="/*" element={<h1>Not Found!</h1>} />
              <Route path="/Login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/editor" element={<Editor movies={movies} setMovies={setMovies}/>}/>
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
      </Suspense>
  )
}

