import {useContext, useEffect, useRef} from 'react'
import api from "../api/axiosConfig"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import UserContext from '../context/user'

export default function Reviews(props){
    const revText = useRef()
    let params= useParams()
    navigation=useNavigate()
    const movieId=params.movieId
    const {user,setUser} = useContext(UserContext)

    useEffect(()=>{
        props.getMovieData(movieId);
        },[])


            const addReview = async (e) => {
                e.preventDefault();
                const rev = revText.current;

                try {
                    const response = await api.post("/api/v1/reviews", {
                        reviewBody: rev.value,
                        userId: user.id,
                        imdbId: movieId,
                    });
                    const updatedReviews = [
                        ...props.reviews,
                        { body: rev.value, id: response.data.id, username: user.username},
                    ];

                    rev.value = "";
                    props.setReviews(updatedReviews);
                } catch (error) {
                    console.log(error);
                    navigation('/login');
                }
            };

            const deleteReview = async (reviewId) => {
                console.log(reviewId)
                try {
                    await api.delete(`/api/v1/reviews/${reviewId}`);
                    const updatedReviews = props.reviews.filter(
                        (review) => review.id !== reviewId
                    );
                    props.setReviews(updatedReviews);
                } catch (error) {
                    console.log(error);
                    navigation('/login');
                }
            };

            return (
                <div className="px-40">
                    <h3 className="text-3xl  w-full  mt-2 mb-4">Reviews</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2 ">
                        <div className="col-span-1 justify-center resize-none ">
                            <img src={props.movie?.poster} />
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col">
                                <form onSubmit={addReview}>
                                    <label className="text-md my-4">Write a review?</label>
                                    <textarea
                                        type="text"
                                        ref={revText}
                                        rows="3"
                                        cols="33"
                                        className=" text-black w-full  py-5 px-4   rounded my-2"
                                    />
                                    {user?.roles.includes("ROLE_ADMIN") ||
                                    user?.roles.includes("ROLE_USER") ? (
                                        <button className="text-cyan-700 text-lg rounded-md h-10 border-2 border-cyan-700 px-4 hover:text-black hover:bg-cyan-700 transition delay-150 hover:borger-black">
                                            Submit
                                        </button>
                                    ) : (
                                        <p className="text-md my-4">
                                            You must be logged in as a user to leave a review
                                        </p>
                                    )}
                                </form>
                            </div>
                            <hr className="my-6 bg-gray-600" />
                            <div className="flex flex-col">
                                {props.reviews?.map( (review) => {
                                        return (
                                            <>
                                                <div>
                                                    <div>
                                                        <p className="text-md my-4 text-cyan-700">
                                                            {(review.username)}
                                                        </p>
                                                        <p>{review.body}</p>
                                                        {user?.username === review.username && (
                                                            <button
                                                                onClick={() => deleteReview(review.id)}
                                                                className="text-red-700 text-lg rounded-md h-10 border-2 border-red-700 px-4 hover:text-black hover:bg-red-700 transition delay-150 hover:borger-black"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                    <hr className="bg-gray-600 my-6" />
                                                </div>
                                            </>
                                        );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

    
