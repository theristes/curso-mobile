 import React from 'react';
import { Typography, makeStyles, TextField, Container, Button } from '@material-ui/core';
import {auth, googleProvider, phoneProvider} from './service';
import { NovoUsuario} from './novo-usuario';
import { ConsumirApi } from './consumir-api';
const loginWithGoogle = 'https://www.c-learning.net/storage/app/media/img/buttons/google-login-button.png';

const useStyles = makeStyles(theme => ({
    titulo : {
        marginTop : 10,
    }, 

    button : {
        margin: 4
    },

    imagemGoogle : {
        width: '40%',
        margin: 4
    }

}));

function Login() {
    const classes = useStyles();
    const [dadosLogin, setDadosLogin] = React.useState({});

    const handleChange = (campo) => (event) => {
        setDadosLogin({...dadosLogin, [campo] : event.target.value});
    }

    const Entrar = () => {
        auth.signInWithEmailAndPassword(dadosLogin.login, dadosLogin.senha)
        .then( value => {
        }).catch ( error => {
            alert(`${error}`);
        })
    }


    const EntrarGoogle = () => {
        auth.signInWithPopup(googleProvider)
        .then( value => {
        }).catch ( error => {
            alert(`${error}`);
        })
    }

    const EsqueciSenha = () => {

        auth.sendPasswordResetEmail(dadosLogin.login).then(() =>
                alert('Foi Enviado um email de recuperação de senha para voce'))
        .catch( error =>
                alert(`Error ${error}`) )

    }


    return <React.Fragment>
                <Container>
                    <Typography variant="h6" component="h2" className={classes.titulo} >
                        LOGIN
                    </Typography>

                    <TextField required
                                label="Login"
                                placeholder="Digite o Login"
                                onChange={handleChange('login')}
                                fullWidth
                                value={dadosLogin.login}/>

                    <TextField required
                                type="password"
                                label="Senha"
                                placeholder="Digite a Senha"
                                onChange={handleChange('senha')}
                                fullWidth
                                value={dadosLogin.senha} />

                    <Button onClick={Entrar} color="primary" variant="outlined" className={classes.button}>
                        Entrar
                    </Button>

                    <Button color="primary" onClick={EsqueciSenha}  variant="outlined" className={classes.button}>
                        Esqueci a Senha
                    </Button>

                    <NovoUsuario/>

                    <img src={loginWithGoogle} onClick={EntrarGoogle} className={classes.imagemGoogle}/>

                    <ConsumirApi/>


                </Container>
            </React.Fragment>
}

 export {Login}

 