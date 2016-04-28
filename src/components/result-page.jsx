import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

export const ResultPage = function(props) {
    return (
        <div>
            {props.event.isExecuting() ? <CircularProgress size={1.5}/> : null}
            {props.event.isSuccessful() ? <pre>{ JSON.stringify(props, null, '\t') }</pre> : null}
        </div>
    )
};

export default ResultPage;