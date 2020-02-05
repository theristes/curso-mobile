import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { auth } from './service';

const useStyles = makeStyles( theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

function NavBar({titulo}) {
    const classes = useStyles();
    return  <React.Fragment>
                <AppBar position="static" elevation={4}>
                    <Toolbar>
                        <Typography variant="h6"
                            className={classes.title}>
                            {titulo}
                        </Typography>
                        <Button color="inherit">
                            Sair
                        </Button> 
                        
                    </Toolbar>
                </AppBar>
            </React.Fragment>
}

export { NavBar }