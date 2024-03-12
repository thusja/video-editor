import React, { useEffect, useState } from "react";
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from "video-react";
import "video-react/dist/video-react.css";

const VideoPlayer = ({ src, onPlayerChange = () => {}, onChange = () => {}, startTime = undefined }) => {
  const [player, setPlayer] = useState();                      // 플레이어 변수 선언
  const [playerState, setPlayerState] = useState(undefined);   // 플레이어상태 변수 선언
  const [source, setSource] = useState();                      // 소스 변수 선언
  
  // 시분초 형식으로 시간 변환 함수
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setSource(URL.createObjectURL(src))
  }, [src]);

  useEffect(() => {
    if(playerState) {
      onChange(playerState)
    }
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player)

    if(player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player])

  return (
    <div className={"video-player"}>
      <Player 
        ref={(player) => {
        setPlayer(player);
        }}
        startTime={startTime}
        src={source}
      >
        <source src={source} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
        <div className="time-display">
          {playerState && formatTime(playerState.currentTime)} /
          {playerState && formatTime(playerState.duration)}
        </div>
      </Player>
    </div>
  )
}

export default VideoPlayer;
