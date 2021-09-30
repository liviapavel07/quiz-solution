import React, { useState } from 'react';
import { Start } from '../Start';
import { Quiz } from '../Quiz';

import './Home.scss';

const Home = (): React.ReactElement => {
    const [start, setStart] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(10);
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');

    const startQuiz = (q: number, c: string, t: string, d: string) => {
        setAmount(q);
        setCategory(c);
        setType(t);
        setDifficulty(d);
        setStart(true);
    };

    return start ? <Quiz
        amount={amount}
        category={category}
        type={type}
        difficulty={difficulty}
    /> : <Start startQuiz={startQuiz} />;
};

export { Home } ;
