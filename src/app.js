import React from 'react';
import { NavBar, } from './navbar';
import { ProdutosList } from './produtos-list';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  
});


function App(){
    return <React.Fragment>
                <ThemeProvider theme={theme}>
                    <NavBar titulo="Curso Mobile"/>
                    <ProdutosList/>
                </ThemeProvider>
            </React.Fragment>
};

export { App }