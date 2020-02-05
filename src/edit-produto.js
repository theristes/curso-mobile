import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import { Add, AddAPhoto, Edit } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import { db, imagesRef } from './service';
import { AlertMessage } from './alert-message';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    addButom: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        marginBottom: '1rem',
        marginRight: '0.8rem',
    }
}));

// Descricao, ID, Imagem, Observacao, Preco, Saldo

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function EditProduto({prod}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [produto, setProduto] = React.useState(prod);
    const [image, setImage] = React.useState(produto.imagem);
    const [sucessoMensagem, setSucessoMensagem] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeCampos = (nomeCampo) => (event) => {
        setProduto({ ...produto, [nomeCampo]: event.target.value });
    }
    const handleSalvar = () => {
        
        db.collection('produtos').doc(produto.id).set(produto)
            .then(value => {
                setSucessoMensagem('Produto alterado com sucesso');
                handleClose();
            }).catch(err => {
                setSucessoMensagem(err)
            })
    }
    const handleChangeLogo = e => {
        const file = e.target.files[0];
        const id = Math.random().toString(36).substr(2, 9); // GenerateId
        const uploadTask = imagesRef(id).put(file);
        uploadTask.on('state_changed',
            () =>   console.log('carregando'),
            error =>  console.log(`An error: ${error.message}`), 
            async () => {
                const downloadFile = await uploadTask.snapshot.ref.getDownloadURL();
                let toUpdate = {...produto, imagem: downloadFile };
                setImage(downloadFile)
                setProduto(toUpdate);
            });
    }

    return (
        <React.Fragment>
            <IconButton aria-label="delete"  onClick={handleClickOpen}>
              <Edit/>
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {produto.descricao}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSalvar}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <IconButton aria-label="Upload Image">
                            <label htmlFor="contained-button-file">
                               { image  ? <img src={image} style={{height: 80}} alt='imagem' /> : <AddAPhoto /> }
                            </label>
                        </IconButton> 
                        <input  className="input-file"
                                accept="image/*"
                                id="contained-button-file" 
                                style={{ position:'relative', visibility:'hidden'}}
                                multiple
                                type="file"
                                onChange={handleChangeLogo}/>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <TextField required
                            label="Descrição"
                            placeholder="Digite a descrição"
                            value={produto.descricao && produto.descricao}
                            onChange={changeCampos('descricao')}
                            fullWidth />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <TextField required
                            label="Preço"
                            placeholder="Digite a preço"
                            onChange={changeCampos('preco')}
                            value={produto.preco && produto.preco}
                            fullWidth/>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <TextField required
                            label="Saldo"
                            placeholder="Digite a saldo"
                            onChange={changeCampos('saldo')}
                            value={produto.saldo && produto.saldo}
                            fullWidth />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                    <TextField required
                            label="Observação"
                            placeholder="Digite a Observação"
                            onChange={changeCampos('observacao')}
                            value={ produto.observacao && produto.observacao}
                            multiline
                            rows={4}
                      fullWidth/>  
                    </ListItem>
                    <Divider/>
                </List>
                    <AlertMessage open={!!sucessoMensagem}
                        handleClose={() => {
                            setSucessoMensagem(null);
                            handleClose();
                        }}
                        message={sucessoMensagem} />
            </Dialog>
        </React.Fragment>)}
        
export { EditProduto }