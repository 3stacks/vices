import React from 'react';
import { render } from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import ViceInput from '../components/vice-input.jsx';
import ResultPage from '../components/result-page.jsx';
const AjaxEvent = require('ajax-event');
// const appId = 'QGGV3X-U5KRQYAPU2';
// const wolfram = require('wolfram').createClient(appId);
/**
 * Enable click events for Material-UI components
 *
 * @see {@link https://github.com/callemall/material-ui/issues/2581}
 */
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import frequencyOptions from './frequency-options.js';

// Initial state of app history
let appHistory = [];

global.appHistory = appHistory;

const actionTypes = {
    ON_FREQUENCY_CHANGED: 'ON_FREQUENCY_CHANGED',
    ON_COST_CHANGED: 'ON_COST_CHANGED',
    FORM_SUBMITTED: 'FORM_SUBMITTED',
    FORM_HAS_ERROR: 'FORM_HAS_ERROR',
    ON_RESULT_CALCULATED: 'ON_RESULT_CALCULATED'
};

function modelHandler(action) {
    appHistory.push(action);
    switch(action.type) {
        case actionTypes.ON_FREQUENCY_CHANGED:
            viceInputProps.data.selectedFrequency = action.payload;
            break;
        case actionTypes.ON_COST_CHANGED:
            viceInputProps.data.cost = action.payload;
            break;
        case actionTypes.FORM_HAS_ERROR:
            viceInputProps.data.errorMessages[action.payload.name] = action.payload.message;
            break;
        case actionTypes.FORM_SUBMITTED:
            currentPage = 'resultsPage';
            viceInputProps.data.calculateCostEvent.resetToExecuting();
            viceInputProps.data.errorMessages.submit = null;
            viceInputProps.data.errorMessages.cost = null;
            fetchCostCoefficient('Australia').then(function(costCoefficient) {
                modelHandler({
                    type: actionTypes.ON_RESULT_CALCULATED,
                    payload: viceInputProps.data.cost * costCoefficient * viceInputProps.data.selectedFrequency
                })
            });
            break;
        case actionTypes.ON_RESULT_CALCULATED:
            viceInputProps.data.annualExpenditure = action.payload;
            viceInputProps.data.calculateCostEvent.resolve();
            break;
        default:
            throw new RangeError('Unknown event type')
    }
    doRender();
}

let currentPage = 'formPage';

const viceInputProps = {
    methods: {
        frequencyChangeCallback: function(event, index, value) {
            modelHandler({
                type: 'ON_FREQUENCY_CHANGED',
                payload: value
            });
        },
        onCostChanged: function(event) {
            modelHandler({
                type: 'ON_COST_CHANGED',
                payload: event.target.value
            })
        },
        onFormSubmitted: function() {
            modelHandler({
                type: 'FORM_SUBMITTED'
            })
        },
        dispatchErrorMessage: function(name, message) {
            modelHandler({
                type: 'FORM_HAS_ERROR',
                payload: {
                    name,
                    message
                }
            })
        }
    },
    data: {
        calculateCostEvent: new AjaxEvent(),
        name: '',
        cost: '',
        frequencyOptions: frequencyOptions,
        selectedFrequency: 365,
        annualExpenditure: null,
        errorMessages: {
            select: null,
            cost: null
        }
    }
};

function fetchCostCoefficient(country) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve.bind(null, 1), 1000)
    })
}

const App = function(props) {
    return (
        <div>
            <AppBar showMenuIconButton={false} title="Vices"/>
            {currentPage === 'formPage' ? <ViceInput {...viceInputProps} /> : null}
            {currentPage === 'resultsPage' ? <ResultPage event={viceInputProps.data.calculateCostEvent} result={viceInputProps.data.annualExpenditure} /> : null}
        </div>);
};

const mainElement = document.getElementById('app');

function doRender() {
    render(<App/>, mainElement);
}

doRender();