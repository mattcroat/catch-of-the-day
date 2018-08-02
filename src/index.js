import React from 'react';
import { render } from 'react-dom';

import Router from './components/Router';
import './css/style.css'

// Render takes JSX and a mounting point
render(<Router />, document.querySelector('#main'));