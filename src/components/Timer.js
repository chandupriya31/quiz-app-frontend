import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(20); // Initial time in seconds (e.g., 5 minutes)

  const startCountdown = (timer) => {
    timer = setInterval(tick, 1000);
  };

  const tick = (timer) => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 1);
    } else {
      clearInterval(timer);
      alert("Countdown is over!");
    }
  };

  useEffect(() => {
    let timer;
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div>
        {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
      </div>
      <button onClick={startCountdown}>Start Countdown</button>
    </div>
  );
};

export default Timer;
