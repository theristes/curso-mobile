import React from 'react';
import { Dialog, Typography, makeStyles, TextField, Container, Button } from '@material-ui/core';
import { auth } from './service';

const useStyles = makeStyles(theme => ({
    titulo: {
        marginTop: 10,
    },

    button: {
        margin: 4
    },

    imagemGoogle: {
        width: '40%',
        margin: 4
    }

}));

function NovoUsuario() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dadosUsuario, setDadosUsuario] = React.useState({});

    const handleChange = (campo) => (event) => {
        setDadosUsuario({ ...dadosUsuario, [campo]: event.target.value });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Salvar = async() => {

        if (!(dadosUsuario && dadosUsuario.nome)) {
            alert('Precisa preencher o nome!')
            return;
        }

        if (!(dadosUsuario && dadosUsuario.email)) {
            alert('Precisa preencher o email!')
            return;
        }

        if (!(dadosUsuario && dadosUsuario.senha)) {
            alert('Precisa preencher a senha!')
            return;
        }

        if (!(dadosUsuario && dadosUsuario.confirmaSenha)) {
            alert('Precisa confirmar a senha!')
            return;
        }

        if (!(dadosUsuario && dadosUsuario.senha  ===  dadosUsuario.confirmaSenha)) {
            alert('Campos senha precisam ser iguais!')
            return;
        }

    

        auth.createUserWithEmailAndPassword(dadosUsuario.email, dadosUsuario.senha)
        .then( value => {
            auth.currentUser.updateProfile({displayName : dadosUsuario.nome})
            .then(() => {
                auth.updateCurrentUser(auth.currentUser).then(() => {
                    handleClose();
                    // window.location.href = '/';
                } )
            }).catch( error => {
                alert(error);
            });
        })
        .catch( error => {
            alert(error);
        })
    }

    const Cancelar = () => {

        handleClose();
    }
    return <React.Fragment>
                <Button color="primary" variant="outlined" className={classes.button} onClick={handleClickOpen}>
                    Registrar
                </Button>
                <Dialog fullScreen open={open} onClose={handleClose}>
                    <Container>
                        <Typography variant="h6" component="h2" className={classes.titulo} >
                            Novo Usuário
                        </Typography>

                        <TextField required
                            label="Nome"
                            placeholder="Digite o nome"
                            onChange={handleChange('nome')}
                            fullWidth
                            value={dadosUsuario.nome} />

                        <TextField required
                            label="Email"
                            placeholder="Digite o Email"
                            onChange={handleChange('email')}
                            fullWidth
                            value={dadosUsuario.email} />

                        <TextField required
                            type="password"
                            label="Senha"
                            placeholder="Digite a Senha"
                            onChange={handleChange('senha')}
                            fullWidth
                            value={dadosUsuario.senha} />

                        <TextField required
                            type="password"
                            label="Confirmar a Senha"
                            placeholder="Confirme a Senha"
                            onChange={handleChange('confirmaSenha')}
                            fullWidth
                            value={dadosUsuario.confirmaSenha} />

                        <Button onClick={Salvar} color="primary" variant="outlined" className={classes.button}>
                            Salvar
                        </Button>

                        <Button color="primary" onClick={Cancelar} variant="outlined" className={classes.button}>
                            Cancelar
                        </Button>

                    </Container>
                </Dialog>
            </React.Fragment>
}

export { NovoUsuario }

