import './Countdown.css';
import Congrats from './Congrats';
import { useState, useEffect } from "react";

export default function Countdown() {
    // ДАТА РОЖДЕНИЯ УКАЗАТЬ В UTC то есть ВЫЧЕСТЬ 3 ЧАСА из времени рождения по МСК
  const targetDate = new Date("2024-04-03T07:44:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime() - 10000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return (
      <div className="tvAnimation">
        <div className="countdown">
          <h2 className="countdown__timer">{days > 0 ? days + 'д' : ''} {hours}ч {minutes}м {seconds}с</h2>
        </div>
      </div>
    );
  };
 

  return (
    <div>
      {timeLeft > 11000 ? formatTime(timeLeft) : <Congrats></Congrats>}
    </div>
  );
}
