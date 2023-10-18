import './App.css'
import {useEffect, useState} from "react";
import {fetchImages} from "./data/dataFetcher.js";
import {v4 as uuidv4} from 'uuid';
import {ScoreBoard} from "./components/ScoreBoard.jsx";
import {topics} from "./data/Topics.js";
import {CardContainer} from "./components/CardContainer.jsx";

function App() {

    const [imgs, setImgs] = useState([]);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [clickCounter, setClickCounter] = useState(0);
    const [topic, setTopic] = useState(topics[0]);
    const [fetch, setFetch] = useState(true);

    function cardClickHandler(id) {
        if (clickCounter === imgs.length) {
            reset();
            return;
        }
        setClickCounter(clickCounter + 1);
        const clickedImg = imgs.find(img => img.id === id);
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
        incrementScore();
        randomizeImages(updatedImgs);
    }

    function generateTopic() {
        let randIdx = Math.floor(Math.random() * topics.length);
        setTopic(topics[randIdx]);
    }

    function updateMax() {
        const max = Math.max(score, maxScore);
        setMaxScore(max);
    }

    function incrementScore() {
        let updatedScore = score + 1;
        setScore(updatedScore);
        setMaxScore(Math.max(updatedScore, maxScore));
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
        updateMax();
        setFetch(true);
        generateTopic();
    }

    useEffect(() => {
        if (fetch) {
            fetchImages("https://api.pexels.com/v1/search", topic)
                .then(imgRes => {
                    initializeImages(imgRes)
                })
            setFetch(false);
        }

        return () => {
            setImgs([]);
            setFetch(false);
            setClickCounter(0);
            setScore(0);
        }

    }, [topic, fetch]);

    return (
        <>
            <ScoreBoard
                score={score}
                maxScore={maxScore}>
            </ScoreBoard>
            <CardContainer
                imgs={imgs}
                cardClickHandler={cardClickHandler}>
            </CardContainer>
        </>
    )
}

export default App
