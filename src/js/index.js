import React from 'react';
import { render } from 'react-dom';
import ViceInput from '../components/vice-input.jsx';
import AppBar from 'material-ui/lib/app-bar';

const App = function(props) {
    return (<div><AppBar/><ViceInput/></div>);
};

const mainElement = document.getElementById('app');

function doRender() {
    render(<App/>, mainElement);
}

doRender();