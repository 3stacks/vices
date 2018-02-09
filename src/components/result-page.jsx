import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import getCurrency from '../api';

const priceIndex = {
    data: {
        rates: {
            USD: 1
        }
    }
};

getCurrency().then(function(response) {
    priceIndex.data = response.data;
    priceIndex.data.rates.USD = 1;
});

export const ResultPage = function(props) {
    const currencyMultiplier = priceIndex.data.rates[props.currency.code];
    const burritoIndex = 8.65;
    return (
        <div>
            {props.event.isExecuting() ? <CircularProgress/> : null}
            {props.event.isSuccessful() ?
                <div>
                    <h2>
                        Congratulations!
                    </h2>
                    <p>
                        You're spending approximately {props.currency.symbol}{props.result} per year on your vice.
                    </p>
                    <p>
                        I think that's a new record!
                    </p>
                    <p>
                        It's time for a change, nameless user.
                    </p>
                    <p>
                        Do you know how many burritos you could buy with that amount of money?
                    </p>
                    <p>
                        The answer is <strong>{Math.ceil(props.result / (burritoIndex * currencyMultiplier))}</strong>.
                    </p>
                    <p>
                        Alright, that's a lot of burritos.
                    </p>
					<img style={{height: 128, width: 128}} src="img/burrito.jpg" alt=""/>
                </div>
                : null
            }
        </div>
    )
};

export default ResultPage;