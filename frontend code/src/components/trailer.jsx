import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Trailer() {
    let params = useParams()
    const key=params.ytTrailerId

    return(
        <div className="h-[90vh]">
            {key!=null ? 
                <ReactPlayer 
                    controls="true" 
                    playing={true} 
                    url ={`https://www.youtube.com/watch?v=${key}`} 
                    width = '100%' 
                    height='100%' 
                /> 
            : null}
        </div>
    )
}