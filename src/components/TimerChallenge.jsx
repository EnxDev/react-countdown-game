import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeLimit, setTimeLimit] = useState(0);
  const timer = useRef(null);
  const dialog = useRef(null);

  useEffect(() => {
    if (timeLimit > 0) {
      timer.current = setInterval(() => {
        setTimeLimit((prevTime) => prevTime > 10 ? prevTime - 10 : 0);
      }, 10);
      timeLimit <= 10 ? dialog.current.open() : null
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [timeLimit]);

  const handleReset = () => {
    setTimeLimit(0);
  }

  const handleToggleTimer = () => {
    if (timeLimit > 0) {
      clearInterval(timer.current);
      dialog.current.open()
    } else {
      setTimeLimit(targetTime * 1000);
    }

  };

  return (
    <>
      {createPortal(<ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeLimit} onReset={handleReset} ></ResultModal>, document.getElementById('modal'))}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">{targetTime} {targetTime > 1 ? 'seconds' : 'second'}</p>
        <button onClick={handleToggleTimer}>
          {timeLimit > 0 ? 'Stop Challenge' : 'Start Challenge'}
        </button>
        <p>{timeLimit > 0 ? 'Time is running...' : 'Timer inactive'}</p>
      </section>
    </>
  );
};
