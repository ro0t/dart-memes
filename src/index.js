import React from 'react';
import ReactDOM from 'react-dom';
import DartboardUI from "./app/dartboard-ui";
import './style/main.scss';

const dartApp = document.getElementById('dartapp');
ReactDOM.render(<DartboardUI />, dartApp);