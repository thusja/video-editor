import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import './multiRangeSlider.css';

export default function MultiRangeSlider({ min, max, onChange, disabled }) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [time, setTime] = useState(0); // 시간 저장할 상태 변수 선언
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal]);

    // 추가: 시간 값이 변경될 때마다 실행
    useEffect(() => {
        console.log("Time is now:", time);
    }, [time]);
    
    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    setTime(Date.now()); // 시간 업데이트
                    event.target.value = value.toString();
                }}
                className={classnames('thumb thumb--zindex-3', {
                    'thumb--zindex-5': minVal > max - 100,
                })}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    setTime(Date.now()); // 시간 업데이트
                    event.target.value = value.toString();
                }}
                className="thumb thumb--zindex-4"
            />

            <div className="slider">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
                {/* <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div> */}
            </div>
        </div>
    );
}
