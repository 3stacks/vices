import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const ViceInput = function(props) {
    return (<form>
        <label>
            What is your vice?
            <TextField
                hintText="Ice Break"
            />
        </label>
        <label>
            How much does it cost you?
            <TextField/>
        </label>
        <SelectField>
            <MenuItem value="Daily" primaryText="Daily"/>
            <MenuItem value="Weekly" primaryText="Weekly"/>
            <MenuItem value="Monthly" primaryText="Monthly"/>
            <MenuItem value="Yearly" primaryText="Yearly"/>
        </SelectField>
    </form>);
};

export default ViceInput;