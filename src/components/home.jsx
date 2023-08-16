import Hero from "./hero";

export default function Home(props) {
    return (
        <Hero movies={props.movies}/>
    )
}