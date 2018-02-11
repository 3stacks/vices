import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// TODO: import individual components
import 'antd/dist/antd.css';
import App from './components/app/app.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();
