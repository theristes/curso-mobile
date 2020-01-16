import React from 'react';
import { NavBar, } from './navbar';
import { ProdutosList } from './produtosList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  
});


function App(){
    return <React.Fragment>
                <ThemeProvider theme={theme}>
                    <NavBar titulo="Lista de Produtos"/>
                    <ProdutosList/>
                </ThemeProvider>
            </React.Fragment>
};

export { App }