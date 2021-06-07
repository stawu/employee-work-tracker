import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'

function App() {
    return (
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
            Hello World
        </Button>
    );
}

ReactDOM.render(<App />, document.querySelector('#react'));