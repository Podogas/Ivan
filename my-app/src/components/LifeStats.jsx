import React, { useState, useEffect } from "react";
import "./LifeStats.css"; // Подключаем стили

export default function LifeStats({ birthDate }) {
  const birthTime = new Date(birthDate).getTime();

  const calculateTime = () => {
    const now = Date.now();
    const ageMs = now - birthTime;

    const totalSeconds = Math.floor(ageMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const sleepHours = days * 8; // Часы сна
    const awakeSeconds = totalSeconds - sleepHours * 3600; // Учитываем только бодрствование
    const sleepSeconds = sleepHours * 3600; // Время во сне

    // Расчет ударов сердца
    const heartbeatsAwake = awakeSeconds * 1.25;
    const heartbeatsSleep = sleepSeconds * 1.0;
    const totalHeartbeats = heartbeatsAwake + heartbeatsSleep;

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: totalSeconds % 60,
      totalSeconds,
      awakeSeconds,
      totalHeartbeats,
    };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="life-stats">
      <h2 className="life-stats__header">Немного статистики</h2>
      <p>
        Ты прожил: {time.days} дней, {time.hours} часов, {time.minutes} минут, {time.seconds} секунд
      </p>
      <p>Вдохнул: {(time.totalSeconds * 0.2667).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
      <p>Моргнул: {(time.awakeSeconds * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
      <p>Поспал: {(time.totalSeconds / 10800).toLocaleString(undefined, { maximumFractionDigits: 1 })}</p>
      <p>Выпил: {(time.days * 2.5).toLocaleString(undefined, { maximumFractionDigits: 1 })} литров</p>
      <p>Прошел: {(time.days * 5).toLocaleString(undefined, { maximumFractionDigits: 1 })} км</p>
      <p>Сердце билось: {time.totalHeartbeats.toLocaleString(undefined, { maximumFractionDigits: 0 })} раз</p>
    </div>
  );
}
