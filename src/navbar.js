import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles, Avatar } from '@material-ui/core';
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

    const Sair = () => {
        auth.signOut();
    }
    return  <React.Fragment>
                <AppBar position="static" elevation={4}>
                    <Toolbar>
                        <Typography variant="h6"
                            className={classes.title}>
                            {titulo}
                        </Typography>
                        { auth.currentUser && 
                            auth.currentUser.photoURL && 
                            <Avatar style={{marginRight: 20}} 
                                    src={auth.currentUser.photoURL} /> }
                        { auth.currentUser &&  
                         auth.currentUser.displayName &&
                         <Typography variant="span">
                             Olá, {auth.currentUser.displayName}
                          </Typography> }

                       { auth.currentUser && 
                        <Button color="inherit" onClick={Sair} >
                            Sair
                        </Button>  }
                        
                    </Toolbar>
                </AppBar>
            </React.Fragment>
}

export { NavBar }