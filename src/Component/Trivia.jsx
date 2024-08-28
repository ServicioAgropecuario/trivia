import { useState, useEffect } from "react";
import finImagen from "/assets/Maníconborde.png";
import inicioImagen from "/assets/Maníconborde.png";
import maniImagen from "/assets/Personaje.webp";
import imgCorner from "/assets/Formaazul.png"
import Logo from "/assets/Logo.png"
import imgCornerWhite from "/assets/Formablanca.png"
const Trivia = () => {
  const questions = [
    {
      question: "¿Cuál es el principal país productor de maní en el mundo?",
      choices: ["China", "Argentina", "Estados Unidos"],
      correctAnswer: 0,
    },
    {
      question: "¿Qué nutriente es especialmente abundante en el maní?",
      choices: ["Proteína", "Carbohidratos", "Calcio"],
      correctAnswer: 0,
    },
    {
      question: "¿En qué región de Argentina es más común el cultivo de maní?",
      choices: ["Patagonia", "Pampa Húmeda", "Córdoba"],
      correctAnswer: 2,
    },
    {
      question: "¿Qué vitamina es abundante en el maní?",
      choices: ["Vitamina C", "Vitamina B3", "Vitamina D"],
      correctAnswer: 1,
    },
    {
      question:
        "¿Qué ciudad de la provincia de Córdoba es conocida como 'La Capital Nacional del Maní'?",
      choices: ["General Deheza", "Hernando", "General Cabrera"],
      correctAnswer: 1,
    },
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isGameStart, setIsGameStart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isAnswerCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      setIsCorrect(isAnswerCorrect);

      const feedbackMessage = isAnswerCorrect
        ? "¡Correcto! Seguimos en carrera."
        : "Upps, creo que va a tener que conocer más sobre el mundo del maní! Te esperamos en nuestro stand.";

      setFeedback({ message: feedbackMessage});

      const feedbackDuration = isAnswerCorrect ? 3000 : 3000; // Ajusta el tiempo según sea necesario

      const timer = setTimeout(() => {
        if (isAnswerCorrect) {
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setFeedback(null);
            setIsGameStart(false);
          } else {
            setShowCongratulations(true);
            setShowQuiz(false);
          }
        } else {
          setFeedback(null);
          setShowQuiz(false); // Volver a la pantalla de inicio
        }
      }, feedbackDuration);

      if (showCongratulations) {
        // Reiniciar automáticamente después de 10 segundos
        const autoRestartTimer = setTimeout(() => {
          handleRestartQuiz();
        }, 10000);  
        return () => clearTimeout(autoRestartTimer);
      }

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, currentQuestion, showCongratulations]);

  const handleStartQuiz = () => {
    setIsLoading(true);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null); // Asegúrate de que el feedback se reinicie
    setShowCongratulations(false);
    setIsGameStart(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleRestartQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null); // Asegúrate de que el feedback se reinicie
    setShowCongratulations(false);
    setIsGameStart(true);
  };

  const handleAnswerSelect = (index) => {
    if (!isLoading) {
      setSelectedAnswer(index);
    }
  };

  return (
    <div className="trivia-container">
      {!showCongratulations && !showQuiz ? (
      <div className="start-container" onClick={handleStartQuiz}>
      <div className="start-image-wrapper">
        <img
          src={inicioImagen}
          alt="Desafío para MANÍaticos"
          className="start-image"
        />
        <img src={imgCornerWhite} alt="Imagen Izquierda" className="start-image-left" />
        <img src={Logo} alt="Imagen Derecha" className="start-image-right" />
      </div>
      <p className="start-text">
        Desafío para <br />
        MANÍaticos
      </p>
    </div>
      ) : (
        <>
          {showCongratulations ? (
            <div className="congrats-overlay">
              <div className="congrats-content">
                <img
                  src={finImagen}
                  alt="Felicitaciones"
                  className="congrats-image"
                />
                <div className="congrats-text">¡Felicitaciones!</div>
                <div className="specialist-text">
                  Sos un especialista en maní como nosotros, y eso tiene un
                  premio
                </div>
                <img src={imgCornerWhite} alt="Imagen Izquierda" className="start-image-left-congrats" />
                <img src={Logo} alt="Imagen Derecha" className="start-image-right-congrat" />                
              </div>              
            </div>            
          ) : (
            <div className={`quiz-wrapper ${showQuiz ? "animate-quiz" : ""}`}>
              <div className="quiz-container">
                <div className="border-top"></div>
                <div className="border-right"></div>
                <div className="border-bottom"></div>
                <div className="border-left"></div>
                <img
                  src={imgCorner}
                  className={`blue-corner ${
                    feedback ? "feedback-visible" : ""
                  } ${isGameStart ? "game-start" : ""}`}                  
                />
                  {feedback && (
                    <span
                      className={`feedback-text ${
                        isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      {feedback.message}
                    </span>
                  )}            
                <div className="fill"></div>
                <div className="quiz-content">
                  <div className="question-info">
                    <span>
                      {currentQuestion + 1}.
                    </span>
                  </div>
                  <div className="question-section">
                    <p>{questions[currentQuestion].question}</p>
                  </div>
                  <div className="answers-section">
                    {questions[currentQuestion].choices.map((choice, index) => (
                      <div
                        key={index}
                        className={`answer-option ${
                          isCorrect === false && selectedAnswer === index
                            ? "incorrect"
                            : ""
                        } ${isLoading ? "disabled" : ""}`}
                      >
                        <input
                          type="checkbox"
                          id={`answer-${index}`}
                          checked={selectedAnswer === index}
                          onChange={() => handleAnswerSelect(index)}
                          disabled={isCorrect !== null || isLoading}
                        />
                        <label htmlFor={`answer-${index}`}>{choice}</label>
                      </div>
                    ))}
                  </div>
                </div>                              
              </div>         
              <img
                src={maniImagen}
                alt="Maní"
                className="mani-image"
              />                                                 
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Trivia;