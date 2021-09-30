import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { GameOver } from '../GameOver';
import './Quiz.scss';

import { QuizApi } from '../../api/trivia';
import { useQuery } from 'react-query';
import { FetchError } from '../FetchError';
import { Question } from '../Question';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TIME_TO_PERFORM = 1; // minutes;

const formatTime = (minutes: number, seconds: number): string => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
};

interface QuizResults {
    [key: string]: string;
}

interface QuizProps {
    amount: number;
    category: string;
    type: string;
    difficulty: string;
}

const Quiz = ({ amount, category, type, difficulty }: QuizProps): React.ReactElement => {
    const [timer, setTimer] = useState<string>(formatTime(TIME_TO_PERFORM, 0));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [points, setPoints] = useState(0);
    const [results, setResults] = useLocalStorage<QuizResults>('results');
    const {
        isLoading,
        isError,
        data: questions,
        refetch
    } = useQuery(
        ['get-questions'],
        QuizApi.getQuestions.bind(null, { amount, category, type, difficulty }),
        {
            refetchOnWindowFocus: false
        }
    );

    const updatePoints = () => {
        setPoints(Object.keys(results)
            .reduce((acc, current) =>
                acc + (questions && questions[Number(current)].correctAnswer === results[current] ? 1 : 0), 0
            )
        );
    };

    const saveAnswer = (answer: string, step: number) => {
        setResults({ ...results, [currentStep]: answer });
        updatePoints();
        setCurrentStep(currentStep + step);
    };

    const retry = () => {
        setCurrentStep(0);
        startTimer();
    };

    const startTimer = () => {
        let minutes = TIME_TO_PERFORM;
        let seconds = 0;

        const countdown = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                setTimer('00:00');
                clearInterval(countdown);
            } else {
                if (seconds === 0) {
                    minutes = minutes - 1;
                    seconds = 59;
                } else {
                    seconds = seconds - 1;
                }
            }
            setTimer(formatTime(minutes, seconds));
        }, 1000);
    };

    const renderQuestion = (): React.ReactNode => {
        if (!questions || currentStep < 0) {
            return null;
        }

        if (currentStep === questions.length || timer === '00:00') {
            return <GameOver points={points} total={questions.length || 0} onRetry={retry} />;
        }

        const currentQuestion = questions[currentStep];

        return (<Question
            step={currentStep}
            questionText={currentQuestion.question}
            selectedAnswer={results[currentStep] || ''}
            choices={currentQuestion.type === 'boolean' ? ['true', 'false'] : [
                currentQuestion.correctAnswer,
                ...currentQuestion.incorrectAnswers
            ]}
            onSave={saveAnswer} />);
    };

    useEffect(() => {
        startTimer();
    }, []);

    if (isError) {
        return <FetchError message="Could not load question." onRetry={refetch} />;
    }

    return (
        <div className="quizWindow">
            <Spin data-testid="questions-spinner" spinning={isLoading} delay={200}>
                {<div className="timer">Time: {timer}</div>}
                {renderQuestion()}
            </Spin>
        </div>
    );
};

export { Quiz };