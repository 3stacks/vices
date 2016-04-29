import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

export const ResultPage = function(props) {
    return (
        <div>
            {props.event.isExecuting() ? <CircularProgress/> : null}
            {props.event.isSuccessful() ?
                <div>
                    <h2>
                        Congratulations!
                    </h2>
                    <p>
                        You're spending approximately ${props.result} per year on your vice.
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
                        The answer is <strong>{Math.floor(props.result / 8)}</strong>.
                    </p>
                    <p>
                        Alright, that's a lot of burritos.
                    </p>
                </div>
                : null
            }
        </div>
    )
};

export default ResultPage;