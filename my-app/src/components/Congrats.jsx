import { useEffect, useState } from "react";
import './Congrats.css';
import Page from "./Page";

const gifUrl = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamg0anlkc3dhZzZwc2YxYXF1NHFmdWZvNTRlbG9tZXEzZDA4MHM4cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1wX5TJZPqVw3HhyDYn/giphy.gif";

const getRandomSize = () => Math.random() * 100 + 40;
const getRandomPosition = () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  transform: `rotate(${Math.random() * 360}deg)`,
  width: `${getRandomSize()}px`,
  position: "absolute",
  opacity: 0
});

export default function BirthdayPage() {
  const [countdown, setCountdown] = useState(10); // Стартуем с 10 ПОМЕНЯЙ НА 10!!!!!!!!!!!!!!!!!!
  const [gifStyles, setGifStyles] = useState([]);
  const [visibleGifs, setVisibleGifs] = useState([]);
  const [gifUrls, setGifUrls] = useState([]);
  const [bgColor, setBgColor] = useState("black");
  const [bgImage, setBgImage] = useState('url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5hNDVvcG1oejJkeG5jdXgxemxrNWdmeTRwajQ2NG5hamJ1dGt4OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elcAvTEXkG02d17sr7/giphy.gif")');
  const [showMessage, setShowMessage] = useState(false); // Показываем сообщение

  useEffect(() => {
    const styles = Array.from({ length: 150 }, () => getRandomPosition());
    setGifStyles(styles);
    setGifUrls(Array(150).fill(gifUrl));

    styles.forEach((_, index) => {
      setTimeout(() => {
        setVisibleGifs(prev => [...prev, index]);
        setGifUrls(prevUrls => {
          const newUrls = [...prevUrls];
          newUrls[index] = `${gifUrl}?t=${Date.now()}`; // обновление ссылки для сброса кеша
          return newUrls;
        });
      }, Math.random() * 3000); // случайная задержка до 3 секунд
    });

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setBgColor("#81c0f6"); // Изменяем цвет фона
          setBgImage('none');
          setShowMessage(true); // Показываем сообщение
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <><div
      className="congrats"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: bgColor === "black" ? "white" : "black",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {!showMessage && (
        <h1 className="congrats__countdown" style={{ fontSize: "5rem", zIndex: 20 }}>
          {countdown}
        </h1>
      )}
      {showMessage && (
        <h1 className="congrats__header" style={{ zIndex: 20 }}>
          С Днём Рождения!
        </h1>
        
      )}
      {gifStyles.map((style, index) => (
        <img
          key={index}
          src={gifUrls[index]}
          alt="Celebration"
          className="congrats__gif"
          style={{
            ...style,
            opacity: 1,
            zIndex: countdown === 0 ? 5 : -1, // Задаем z-index в -1 до завершения отсчета
            transition: "opacity 1s ease-in-out, z-index 0s ease-in-out",
          }}
        />
        
      ))}
    </div>
    {showMessage && (
      <Page></Page>
    )}
    </>
  );
}
