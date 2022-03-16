import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mount function to start up the application

const mount = ((el) => {
    ReactDOM.render(<App />, el);
});

// if we are in development and in isolation
// call mount immediately

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('_marketing-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// We are running through container
//  and we should export the mount function

export { mount };