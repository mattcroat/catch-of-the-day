// React core
import React from 'react';
import { render } from 'react-dom';
// Components
import StorePicker from './components/StorePicker';
import App from './components/App';
import './css/style.css'

// Render takes JSX and a mounting point
render(<App />, document.querySelector('#main'));