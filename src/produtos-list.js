import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { db, auth } from './service';
import { CircularProgress } from '@material-ui/core';
import { AddProduto } from './novo-produto';
import { EditProduto } from './edit-produto';
import { ExcluirProduto } from './delete-produto';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '0.5rem',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  image: {
    width: 80,
    height: 80,
    BorderColor: '#000000',
    border: 1,
    borderStyle: 'solid'

  },
  textoPrincipal: {
    marginLeft: 20,
    marginBottom: 10,
  },
  Item: {
    boxShadow: '2px 2px 2px 2px #444444',
    margin: 2,
  }
}));


function ProdutosList() {
  const classes = useStyles();
  const [produtos, setProdutos] = React.useState([]);

  React.useEffect(() => {
    
    db.collection('produtos').onSnapshot( value => {
        setProdutos( value.docs.map( doc => { return {id:doc.id, ...doc.data()} }) );
      });
  },[]);

  return (    
    <React.Fragment>
      <List className={classes.root}>
        { produtos.length === 0 && <CircularProgress/> }
        { produtos.map((produto, index) =>
          <ListItem key={index} alignItems="center" className={classes.Item} >
            <ListItemAvatar>
              <Avatar alt="Produto Foto" src={produto.imagem} className={classes.image} />
            </ListItemAvatar>
            <ListItemText
              className={classes.textoPrincipal}
              primary={
                <React.Fragment>
                  <Typography variant="h6">
                    {produto.descricao}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary">
                    Preço :  {produto.preco} <br />
                  </Typography>
                  {produto.observacao}
                </React.Fragment>
              }
            />
            <EditProduto prod={produto}/>
            <ExcluirProduto  prod={produto}/>
          </ListItem>
        )}
        
      </List>
      <AddProduto/>
     </React.Fragment>
  );
}
export { ProdutosList }