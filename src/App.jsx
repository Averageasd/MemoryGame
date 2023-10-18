import './App.css'
import {useEffect, useState} from "react";
import {fetchImages} from "./data/dataFetcher.js";
import {v4 as uuidv4} from 'uuid';
import {Card} from "./components/Card.jsx";

function App() {

    const [imgs, setImgs] = useState([]);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [updateMax, setUpdateMax] = useState(false);
    const [clickCounter, setClickCounter] = useState(0);

    function cardClickHandler(id) {
        if (clickCounter === imgs.length) {
            reset();
            return;
        }
        setClickCounter(clickCounter + 1);
        randomizeImages(imgs);
        const clickedImg = {...imgs.find(img => img.id === id)};
        if (clickedImg.isClicked) {
            reset();
            return;
        }

        const updatedImgs = imgs.map(img => {
            if (img.id === id) {
                return {...img, isClicked: true}
            }
            return img;
        })
        setScore(score + 1);
        setUpdateMax(true);
        randomizeImages(updatedImgs);
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
            return {id: uuidv4(), link: img, isClicked: false}
        }))
        randomizeImages(cards);
    }

    function reset() {
        setClickCounter(0);
        setScore(0);
        setUpdateMax(true);
        const restImgs = (imgs.map(img => {
            return {...img, isClicked: false};
        }))
        randomizeImages(restImgs);
    }

    useEffect(() => {
        fetchImages("https://api.pexels.com/v1/search", "animals")
            .then(imgRes => {
                initializeImages(imgRes)
            })

        return () => {
            setImgs([]);
        }

    }, []);

    useEffect(() => {
        if (updateMax) {
            setMaxScore(Math.max(score, maxScore));
            setUpdateMax(false);
        }

        return () => {
            setUpdateMax(false);
        }
    }, [updateMax])

    return (
        <>
            <h2>
                Score : {score}
            </h2>
            <h2>
                Max Score: {maxScore}
            </h2>
            <ul>
                {imgs.map(img => {
                    return (
                        <Card
                            id={img.id}
                            link={img.link}
                            cardClickHandler={() => cardClickHandler(img.id)}
                        >
                        </Card>
                    )
                })}
            </ul>
        </>
    )
}

export default App
