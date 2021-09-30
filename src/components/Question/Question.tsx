import React, { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { v4 as uuid } from 'uuid';
import { Button, Radio, Space } from 'antd';

import './Question.scss';

interface MultipleChoiceQuestionProps {
    step: number;
    questionText: string;
    choices: string[];
    selectedAnswer: string;
    onSave: (answer: string, step: number) => void;
}

const Question: React.FC<MultipleChoiceQuestionProps> = ({ step, questionText, choices, onSave, selectedAnswer }) => {
    const [answer, setAnswer] = useState<string>(selectedAnswer);

    return (
        <Space direction="vertical" className="question">
            <ReactMarkdown className="markdown">{`${step + 1}. ${questionText}`}</ReactMarkdown>
            <Radio.Group onChange={(e) => setAnswer(e.target.value)}>
                <Space direction="vertical" align="start" className="choices">
                    {choices.map(choice => (<Radio key={uuid()} value={choice}>{choice}</Radio>))}
                </Space>
            </Radio.Group>
            <Space className="actionButtons">
                <Button disabled={step === 0} onClick={() => onSave(answer, -1)}
                        className="prevButton">{'<< Prev'}</Button>
                <Button onClick={() => onSave(answer, 1)} className="nextButton">{'Next >>'}</Button>
            </Space>
        </Space>
    );
};

export { Question };
