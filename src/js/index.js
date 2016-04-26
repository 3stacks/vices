import React from 'react';
import { render } from 'react-dom';
// import ViceInput from '../components/vice-input.jsx';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const App = function(props) {
    return (
        <AppBar/>
    );
};

const mainElement = document.getElementById('app');

function doRender() {
    render(<App/>, mainElement);
}

doRender();