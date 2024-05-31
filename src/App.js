import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputTimer from './InputTimer';
import ShowTimer from './ShowTimer';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("Please enter valid time");
      return;
    } else {
      setIsStart(true);
    }
  }

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours, timerId);
  };
  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };

  const resetTimer=()=>{
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else if (id === "seconds") {
      setSeconds(value);
    }
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      resetTimer();
      alert("Timer is finished");
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart && <InputTimer
          handleStart={handleStart}
          handleInput={handleInput} />
      }

      {
        isStart &&
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handlePause={handlePause}
          handleReset={handleReset}
          handleResume={handleResume}
        />
      }

    </div>
  );
}

export default App;
