import React, { useState } from 'react';
import { Button, InputNumber, Select, Space } from 'antd';

import './Start.scss';

const { Option } = Select;

const snakeToTitleCase = (text: string): string =>
    text
        .trim()
        .split('_')
        .filter(Boolean)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');

enum Difficulty {
    ANY = '',
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

enum QuestionType {
    ANY = '',
    BOOLEAN = 'boolean',
    MULTIPLE = 'multiple',
}

enum Category { // any or these values with values from 9 to 32
    ANY = 'ANY',
    GENERAL_KNOWLEDGE = 'General Knowledge',
    BOOKS = 'Entertainment: Books',
    FILM = 'Entertainment: Film',
    MUSIC = 'Entertainment: Music',
    MUSICALS_THEATRES = 'Entertainment: Musicals & Theatres',
    TELEVISION = 'Entertainment: Television',
    VIDEO_GAMES = 'Entertainment: Video Games',
    BOARD_GAMES = 'Entertainment: Board Games',
    SCIENCE_NATURE = 'Science & Nature',
    SCIENCE_COMPUTERS = 'Science: Computers',
    SCIENCE_MATHEMATICS = 'Science: Mathematics',
    Mythology = 'Mythology',
    SPORTS = 'Sports',
    GEOGRAPHY = 'Geography',
    HISTORY = 'History',
    POLITICS = 'Politics',
    ART = 'Art',
    CELEBRITIES = 'Celebrities',
    ANIMALS = 'Animals',
    VEHICLES = 'Vehicles',
    ENTERTAINMENT_COMICS = 'Entertainment: Comics',
    SCIENCE_GADGETS = 'Science: Gadgets',
    JAPANESE_ANIME_MANGA = 'Entertainment: Japanese Anime & Manga',
    CARTOON_ANIMATIONS = 'Entertainment: Cartoon & Animations',
}

interface StartProps {
    startQuiz: (a: number, c: string, t: string, d: string) => void;
}

const Start = ({ startQuiz }: StartProps): React.ReactElement => {
    const [amount, setAmount] = useState<number>(10);
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');

    return (
        <Space direction="vertical" className="start">
            <h1>Take the quiz</h1>
            <h4>Whenever you want</h4>

            Number of Questions:
            <InputNumber
                size="large"
                min={1}
                max={30}
                defaultValue={amount}
                onChange={setAmount}
            />

            Select Category:
            <Select defaultValue={category || 'Any'} style={{ width: 120 }} onChange={setCategory}>
                {Object.values(Category).map((c, index) => {
                        return <Option key={index} value={index + 9}>{c}</Option>;
                    }
                )}
            </Select>

            Select Difficulty:
            <Select defaultValue={difficulty || 'Any'} style={{ width: 120 }} onChange={setDifficulty}>
                {Object.values(Difficulty).map((d, index) =>
                    <Option key={index} value={d}>{d || 'Any'}</Option>
                )}
            </Select>

            Select Type:
            <Select defaultValue={type || 'Any'} style={{ width: 120 }} onChange={setType}>
                {Object.values(QuestionType).map((t, index) =>
                    <Option key={index} value={t}>{t || 'Any'}</Option>
                )}
            </Select>

            <Button onClick={() => startQuiz(amount, category, type, difficulty)} className="button">
                Begin
            </Button>
        </Space>
    );
};

export { Start };