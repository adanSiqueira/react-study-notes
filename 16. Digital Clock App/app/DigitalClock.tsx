import { useState, useEffect } from "react";

function DigitalClock() {

    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () =>{
            clearInterval(intervalId);
        }        
    }, []);

    function padZero(num: number): string {
        return (num < 10 ? `0${num}` : `${num}`);
    }

    function formatTime() {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? 'PM' : 'AM';

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    

    return (
        <div className="clock-container">
            <div className ="clock">
                <span className = "numbers">{formatTime()}</span>

            </div>
        </div>
    );
}

export default DigitalClock;