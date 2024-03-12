import { Button } from 'antd';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { readFileAsBase64, sliderValueToVideoTime } from 'utils/utils';
import style from "./css/VideoConversionButton.module.css";

import out from 'assets/icons/out.svg';
import dark_download from 'assets/icons/dark_download.svg';
import mp3 from "assets/icons/mp3-audio.png";

function VideoConversionButton({
    videoPlayerState,
    sliderValues,
    videoFile,
    ffmpeg,
    onConversionStart = () => {},
    onConversionEnd = () => {},
}) {
    const convertToGif = async () => {
        // starting the conversion process
        onConversionStart(true);

        const inputFileName = 'input.mp4';
        const outputFileName = 'output.gif';

        // writing the video file to memory
        ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

        const [min, max] = sliderValues;
        const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
        const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

        // cutting the video and converting it to GIF with a FFMpeg command
        await ffmpeg.run('-i', inputFileName, '-ss', `${minTime}`, '-to', `${maxTime}`, '-f', 'gif', outputFileName);

        // reading the resulting file
        const data = ffmpeg.FS('readFile', outputFileName);

        // converting the GIF file created by FFmpeg to a valid image URL
        const gifUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

        const link = document.createElement('a');
        link.href = gifUrl;
        link.setAttribute('download', '');
        link.click();

        // ending the conversion process

        onConversionEnd(false);
    };

    const onCutTheVideo = async () => {
        onConversionStart(true);

        const [min, max] = sliderValues;
        const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
        const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

        ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
        await ffmpeg.run('-ss', `${minTime}`, '-i', 'input.mp4', '-t', `${maxTime}`, '-c', 'copy', 'output.mp4');

        const data = ffmpeg.FS('readFile', 'output.mp4');
        const dataURL = await readFileAsBase64(new Blob([data.buffer], { type: 'video/mp4' }));

        const link = document.createElement('a');
        link.href = dataURL;
        link.setAttribute('download', '');
        link.click();

        onConversionEnd(false);
    };

    // 추가: MP3 추출
    const extractMp3 = async () => {
        // 시작 전 콜백 호출
        onConversionStart(true);

        const [min, max] = sliderValues;
        const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
        const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

        ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

        // MP3 추출을 위해 FFmpeg 명령 실행
        await ffmpeg.run('-i', 'input.mp4', '-ss', `${minTime}`, '-to', `${maxTime}`, '-q:a', '0', '-map', 'a', 'output.mp3');

        // 추출된 MP3 파일 읽기
        const data = ffmpeg.FS('readFile', 'output.mp3');

        // MP3 파일을 Blob으로 변환하여 URL 생성
        const dataURL = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));

        // MP3 URL을 콜백 함수로 전달
        const link = document.createElement('a');
        link.href = dataURL;
        link.setAttribute('download', '');
        link.click();

        // 변환 종료 콜백 호출
        onConversionEnd(false);
    }

    return (
        <>
            <div className={style.container}>
                <Button onClick={() => convertToGif()} className={style.gif_out}>
                    <img src={out} alt="GIF 내보내기" />
                    <p className={style.p}>GIF 내보내기</p>
                </Button>

                <Button onClick={() => onCutTheVideo()} className={style.save}>
                    <img src={dark_download} alt="비디오 저장하기" />
                    <p className={style.p}>비디오 저장하기</p>
                </Button>

                <Button onClick={() => extractMp3()} className={style.mp3}>
                    <img src={mp3} alt="오디오 저장하기" />
                    <p className={style.p}>오디오 저장하기</p>
                </Button>
            </div>
        </>
    );
}

export default VideoConversionButton;
