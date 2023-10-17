import './App.css'
import {useEffect, useState} from "react";
import {fetchImages} from "./data/dataFetcher.js";

function App() {

    // set imgs state to display.
    const [imgs, setImgs] = useState([]);

    // boolean flag decides when to fetch images.
    // set to false means that we don't fetch; otherwise, fetch.
    const [fetchImgs, setFetchImgs] = useState(true);

    // first we use useEffect to fetch data from external API.
    // then display list of images.
    // we might need to share image list state.
    console.log('yo');
    useEffect(() => {
        if (fetchImgs){
            fetchImages("https://api.pexels.com/v1/search", "animals")
                .then(imgRes => setImgs(imgRes))
            setFetchImgs(false);
        }

        return ()=>{
            setImgs([]);
            setFetchImgs(false);
        }

    }, [fetchImgs]);
    return (
        <ul>
            {imgs.map(img=>{
                return (
                    <li>
                        <img src={img}></img>
                    </li>
                )
            })}
        </ul>
    )
}

export default App
