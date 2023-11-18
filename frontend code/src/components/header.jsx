import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/user";
import api from "../api/axiosConfig"
import useLocal from "../hooks/use-local";

export default function Header(){
    const {user,setUser} = useContext(UserContext)
    return (
        <header className="flex  items-center h-16 bg-gray-900 px-4">
            <NavLink to="/" className="flex text-yellow-400 text-3xl">
                <FontAwesomeIcon className="h-8 text-yellow-400 mr-1" icon ={faVideoSlash}/>Gold
            </NavLink>
            <NavLink to="/" className="mx-8 flex text-2xl text-gray-400">Home</NavLink>
            {user ? (
                <div className="ml-auto">
                    {user.roles.includes("ROLE_ADMIN") && (
                        <NavLink to="/editor" className=" mx-8 justify-center text-2xl text-gray-400">Editor</NavLink>
                    )}
                        <button 
                            type='button'
                            title='Sign out'
                            onClick={async() => {
                                const response = await api.get("/api/v1/auth/signout")
                                setUser(null)
                            }}
                        >
                            <svg
                                className="w-8 mr-6 text-black-light cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
            ) : (
                <NavLink to="/login" className="ml-auto mx-3 flex text-2xl text-gray-400">Sign In</NavLink>
            )}
        </header>
    )
       
    
}