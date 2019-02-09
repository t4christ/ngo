import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App,ErrorBoundary } from './App';

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);