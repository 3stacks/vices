import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import frequencyOptions from '../js/frequency-options.js';
function validateInputs(input) {
    const errorArray = [];
    if (!frequencyOptions.map(option => option.annualFrequency).includes(input.select)) {
        errorArray.push({
            name: 'select',
            message: 'The select field was passed an invalid option. Please choose from the provided options'
        })
    }
    return errorArray;
}

export const ViceInput = function({methods, data, ...props}) {
    function onCostChanged(event, value) {
        methods.onCostChanged(event, value);
        if (data.cost === '0') {
            methods.dispatchErrorMessage('cost', 'Use something other than 0 ya dingus');
        }
    }
    function getWut() {
        if (data.cost === '0') {
            return <img src="img/wut.jpg" alt="wut"/>;
        }
        else {
            return null;
        }
    }
    function formSubmit(event) {
        event.preventDefault();
        const inputsToValidate = {
                select: data.selectedFrequency,
                cost: data.cost
            };
        if (validateInputs(inputsToValidate).length === 0) {
            methods.onFormSubmitted();
        } else {
            validateInputs(inputsToValidate).forEach(function(error) {
                methods.dispatchErrorMessage(error.name, error.message)
            })
        }
    }
    return (<form onSubmit={formSubmit}>
        <h2>
            What is your vice?
        </h2>
        <div>
            <label>
                {props.currency.symbol}
                <TextField
                    value={data.cost}
                    onChange={onCostChanged}
                    floatingLabelText="How much does it cost you?"
                    errorText={data.errorMessages.cost === null ? '' : data.errorMessages.cost}
                />
            </label>
        </div>
        {getWut()}
        <div>
            <SelectField
                value={data.selectedFrequency}
                onChange={methods.frequencyChangeCallback}
                floatingLabelText="How often do you buy it?"
                errorText={data.errorMessages.select === null ? '' : data.errorMessages.select}
                style={{ textAlign: 'left', marginBottom: 20 }}
            >
                {data.frequencyOptions.map(function(frequencyOption) {
                    return <MenuItem key={frequencyOption.annualFrequency} value={frequencyOption.annualFrequency} primaryText={frequencyOption.label}/>
                })}
            </SelectField>
        </div>
        <RaisedButton
            label="Show me how much I suck"
            type="submit"
            primary
        />
    </form>);
};

export default ViceInput;