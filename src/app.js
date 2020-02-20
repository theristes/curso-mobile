import React from 'react';
import { NavBar, } from './navbar';
import { ProdutosList } from './produtos-list';
import { Login } from './login-usuario';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAuth } from './service';
import { CircularProgress } from '@material-ui/core';

const theme = createMuiTheme({
  
});


function App(){
    const { iniciando, user} = useAuth();

    return <React.Fragment>
                <ThemeProvider theme={theme}>
                    <NavBar titulo="Curso Mobile" user={user}/>
                        { iniciando && <CircularProgress/> }
                        { user ? <ProdutosList/> : <Login/>  }  
                </ThemeProvider>
            </React.Fragment>
};

export { App }