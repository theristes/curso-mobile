
import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'


const AlertMessage = ({open,handleClose, message}) => {
    return  <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                {message}
                </Alert>
            </Snackbar>
}

export { AlertMessage }