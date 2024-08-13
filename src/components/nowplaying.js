import React, { useState, useEffect, useRef } from "react";
import playerStyles from "./css/nowplaying.module.css";

function NowPlaying(props) {
    let currentSongIndex = props.data.currentSongIndex;
    let currentSong = props.data.songList[currentSongIndex];
    let currentTime = props.data.playingProgress;

    const [volume, setVolume] = useState(props.data.volume);
    const audioSeekbarRef = useRef(null);

    const volumeRef = useRef(null);
    useEffect(() => {
        if (volumeRef.current) {
            setVolume(props.data.volume);
        }
    }, [props.data.volume]);

    useEffect(() => {
        if (audioSeekbarRef.current) {
            audioSeekbarRef.current.value = currentTime * 100;
        }
    }, [currentTime]);

    return (
        <div className={playerStyles.playerBody}>
            <div className={playerStyles.thumnail}>
                <img src={currentSong.imgUrl} alt="thumbnail"></img>
                <div className={playerStyles.songDetails}>
                    <small>{currentSong.name}</small>
                </div>
            </div>
            <input
                className={playerStyles.audioSeekbar}
                id="audioSeekbar"
                type="range"
                value={currentTime}
                ref={audioSeekbarRef}
                onChange={(e) => {
                    console.log("handlechange");
                }}
            />
            <div ref={volumeRef}>
                {volume >= 0 ? (
                    volume < 0.1 ? (
                        <i className="fa-solid fa-volume-xmark"></i>
                    ) : volume > 0.3 && volume < 0.5 ? (
                        <i className="fa-solid fa-volume-low"></i>
                    ) : (
                        <i className="fa-solid fa-volume-high"></i>
                    )
                ) : (
                    <i className="fa-solid fa-question"></i>
                )}
            </div>
        </div>
    );
}

export default NowPlaying;
