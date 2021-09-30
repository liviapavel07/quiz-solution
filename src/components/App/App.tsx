import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.scss';

import { Home } from '../Home';

const queryClient = new QueryClient();

const App = (): React.ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Home />
            </Router>
        </QueryClientProvider>
    );
};

export { App };
