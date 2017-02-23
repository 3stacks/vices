import axios from 'axios';
/**
 *
 * @returns {Promise}
 */
export const getCurrency = function() {
    return axios.get('//api.fixer.io/latest?base=USD');
};

export default getCurrency;