import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";

export default function Header(){
    return (
        <header className="flex  items-center h-16 bg-gray-900 px-4">
            <NavLink to="/" className="flex text-yellow-400 text-3xl">
                <FontAwesomeIcon className="h-8 text-yellow-400 mr-1" icon ={faVideoSlash}/>Gold
            </NavLink>
            <NavLink to="/" className="mx-3 flex text-2xl text-gray-400">Home</NavLink>
        </header>
    )
    
}