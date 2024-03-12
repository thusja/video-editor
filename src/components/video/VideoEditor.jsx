import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

import style from "./css/VideoEditor.module.css";
import VideoPlayer from "./VideoPlayer";
import video_placeholder from "assets/images/default_upload.png";

import MultiRangeSlider from "components/MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import { sliderValueToVideoTime } from "utils/utils";

const ffmpeg = createFFmpeg({log: true});

const VideoEditor = () => {
  const uploadFile = useRef("");                               // 업로드 파일 변수 선언
  const [videoFile, setVideoFile] = useState();                // 비디오 파일 변수 선언
  const [videoPlayer, setVideoPlayer] = useState();            // 플레이어 변수 선언
  const [videoPlayerState, setVideoPlayerState] = useState();  // 플레이어 상태 변수 선언

  const [ffmpegLoad, setFFmpegLoad] = useState(false);         // 로딩 변수 선언
  const [sliderValues, setSliderValues] = useState([0, 100]);  // 슬라이더 바 변수 선언
  const [process, setProcess] = useState(false);               // Conversion버튼 프로세스 변수 선언
  const [show, setShow] = useState(false);                     // Conversion버튼 보이게 하기 변수 선언

  // ffmpeg의 로드가 아무것도 없을때 활성화
  useEffect(() => {
    if(!window.FFmpegLoad) {
      ffmpeg.load().then(() => {
        window.FFmpegLoad = true;
        setFFmpegLoad(true);
      });
    }
  }, []);

  // 슬라이더 바 값 설정
  useEffect(() => {
    const min = sliderValues[0]

    if(min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  // 슬라이더 바의 타임라인
  useEffect(() => {
    if(videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if(videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }

      if(videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState])

  // 비디오 파일이 off 일때 플레이어 상태는 undefined
  useEffect(() => {
    if(!videoFile) {
      setVideoPlayerState(undefined);
    }
    setSliderValues([0, 100]);
  }, [videoFile])

  // ffmpeg 가 아닐 때 loading 문구 발생  -- 나중에 로고 같은거 넣어도 괜찮을거 같음
  if(!ffmpegLoad) {
    return (
    <div>loading</div>
    )
  }

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handlePlayerChange = (videoPlayer) => {
    if (videoPlayer !== undefined) {
      setVideoPlayer(videoPlayer)
    }
  };

  const handleStateChange = (videoPlayerState) => {
    if (videoPlayerState !== undefined) {
      setVideoPlayerState(videoPlayerState)
    }
  }

  const handleSliderValue = ({min, max}) => {
    setSliderValues([min, max])
  }

  const handleConversionStart = () => {
    setProcess(true);
  }

  const handleConversionEnd = () => {
    setProcess(false);
    setShow(true);
  }


  return(
    <article className={style.container}>
      <div className={style.fr}>
        <h1 className={style.title}>Video Edit</h1>
        {
          videoFile && (
            <div>
              <input
                onChange={handleFileChange}
                type="file"
                accept="video/*"
                style={{display: "none"}}
                ref={uploadFile}
              />
              <Button onClick={() => uploadFile.current.click()} className={style.reUpload_btn}>
                비디오 재선택
              </Button>
            </div>
          )
        }
      </div>

      <section className={style.videoSection}>
        {
          // 비디오 파일이 on 일때 비디오 플레이를
          videoFile ? (
            <VideoPlayer
              src={videoFile}
              onPlayerChange={handlePlayerChange}
              onChange={handleStateChange}
            />
          ) : (
            // 비디오 파일이 off 일때 비디오업로드 버튼 활성화 및 area창 활성화
            <>
              <div className={style.videoArea}>
                <div>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept="video/*"
                    style={{display: "none"}}
                    ref={uploadFile}
                  />
                  <img src={video_placeholder} alt="비디오를 업로드 해주세요." />
                </div>
              </div>

              <Button onClick={() => uploadFile.current.click()} className={style.upload_btn}>
                비디오 업로드하기
              </Button>
            </>
          )
        }
      </section>

      {
        // 비디오파일이 on일때 슬라이더 바 활성화 및 Conversion버튼 활성화
        videoFile && (
          <>
            <section className={style.videoFile}>
              <MultiRangeSlider
                min={0}
                max={100}
                onChange={handleSliderValue}
              />
            </section>

            <section>
              <VideoConversionButton
                onConversionStart={handleConversionStart}
                onConversionEnd={handleConversionEnd}
                ffmpeg={ffmpeg}
                videoPlayerState={videoPlayerState}
                sliderValues={sliderValues}
                videoFile={videoFile}
              />
            </section>
          </>
        )
      }

      <ToastContainer className="p-3" position={'top-center'} style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} bg="dark" autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={process}
        onHide={() => setProcess(false)}
        backdrop={false}
        keyboard={false}
        centered
        size="sm"
      >

        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>

          <p className={style.p_out}>내보내기가 진행중입니다.</p>
        </div>
      </Modal>
    </article>
  )
}

export default VideoEditor;
