import React from 'react';
import { Button, Typography } from 'antd';

import './GameOver.scss';

interface GameOverProps {
    points: number;
    total: number;
    onRetry: () => void;
}

const GameOver = ({ points, total, onRetry }: GameOverProps): React.ReactElement => (
    <div className="gameOver">
        <Typography.Title className="title">Game Over</Typography.Title>
        <Typography.Text className="points">You did {points} out of {total}!</Typography.Text>
        <Button onClick={onRetry} className="retryButton">Retry</Button>
    </div>
);

export { GameOver };