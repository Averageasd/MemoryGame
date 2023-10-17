import './App.css'
import {useEffect, useState} from "react";
import {fetchImages} from "./data/dataFetcher.js";
import {v4 as uuidv4} from 'uuid';

function App() {

    // set imgs state to display.
    const [imgs, setImgs] = useState([]);

    // boolean flag decides when to fetch images.
    // set to false means that we don't fetch; otherwise, fetch.
    const [fetchImgs, setFetchImgs] = useState(true);

    function cardClickHandler(){
        randomizeImages(imgs);
    }
    function randomizeImages(imgs) {
        const curImgs = [...imgs];
        const randomImgs = [];
        const s = new Set();
        for (let i = 0; i < curImgs.length; i++) {
            let randIdx = Math.floor(Math.random() * curImgs.length);
            while (s.has(randIdx)) {
                randIdx = Math.floor(Math.random() * curImgs.length);
            }
            s.add(randIdx);
            randomImgs.push(curImgs[randIdx]);
        }
        setImgs(randomImgs);
    }

    function initializeImages(imgRes) {
        const cards = (imgRes.map(img => {
            return {id: uuidv4(), link: img}
        }))
        randomizeImages(cards);
    }
    console.log('yo');
    // first we use useEffect to fetch data from external API.
    // then display list of images.
    // we might need to share image list state.
    useEffect(() => {
        if (fetchImgs) {
            fetchImages("https://api.pexels.com/v1/search", "animals")
                .then(imgRes => {
                    initializeImages(imgRes)
                })
            setFetchImgs(false);
        }

        return () => {
            setImgs([]);
            setFetchImgs(false);
        }

    }, [fetchImgs]);

    return (
        <ul>
            {imgs.map(img => {
                return (
                    <li key={img.id}
                    onClick={() => cardClickHandler() }
                    >
                        <img src={img.link} alt="img"></img>
                    </li>
                )
            })}
        </ul>
    )
}

export default App
