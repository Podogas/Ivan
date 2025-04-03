import React, { useState, useEffect, useCallback } from 'react';
import './Snake.css';

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(generateFood());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0); // Состояние для счета

  // Генерация еды
  function generateFood() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  }

  // Функция для движения змейки
  const moveSnake = useCallback(() => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake.slice(0, snake.length - 1)];
    if (head.x === food.x && head.y === food.y) {
      newSnake.push(snake[snake.length - 1]);
      setFood(generateFood());
      setScore(score + 1); // Увеличиваем счет, когда змейка съедает еду
    }

    // Проверка на столкновение
    if (isColliding(newSnake)) {
      setIsGameOver(true); // Столкновение с собой или с границей
    } else {
      setSnake(newSnake);
    }
  }, [snake, direction, food, score]);

  // Таймер для движения змейки
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 150); // скорость змейки

    return () => clearInterval(interval);
  }, [moveSnake, isGameOver]);

  // Обработка нажатий клавиш
  useEffect(() => {
    if (isGameOver) return;

    const handleKeyPress = (e) => {
      // Блокируем движение в противоположном направлении
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault(); // Блокируем прокрутку
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          e.preventDefault(); // Блокируем прокрутку
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isGameOver]);

  // Функция для проверки столкновения
  const isColliding = (newSnake) => {
    const head = newSnake[0];
    // Проверка на столкновение с границей
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      return true;
    }
    // Проверка на столкновение с телом змейки
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  // Рендер змейки
  const renderSnake = () => {
    return snake.map((segment, index) => (
      <div
        key={index}
        className={index === 0 ? "snake-segment head" : "snake-segment"} // Добавляем класс для головы
        style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
      ></div>
    ));
  };

  // Рендер еды
  const renderFood = () => {
    return (
      <div
        className="food"
        style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }}
      ></div>
    );
  };

  // Функция для рестарта игры
  const restartGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setDirection('RIGHT');
    setFood(generateFood());
    setIsGameOver(false);
    setScore(0); // Сбрасываем счет при рестарте игры
  };

  return (
    <>
    <p className='snake__caption'>Тут еще есть змейка, но она работает только с компа, потому что управление стрелочками</p>
    <div className="game-container">
      {isGameOver && (
        <div className="game-over-snake">
          <button className="restart-button" onClick={restartGame}>Заново</button>
        </div>
      )}
      <div className="game-board">
        {renderSnake()}
        {renderFood()}
        <div className="score-snake">
        Счет: {score} {/* Отображаем счет */}
      </div>
      </div>
      
    </div>
    </>
  );
};

export default Snake;
