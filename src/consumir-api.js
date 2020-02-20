import React from 'react';
import axios from 'axios';
import { TextField, Card, CardMedia } from '@material-ui/core';

const ConsumirApi = () => {
    const [dados, setDados] = React.useState();
    const url = 'https://cors-anywhere.herokuapp.com/';

    React.useEffect(() => {
        axios.get(url + 'https://api.hgbrasil.com/weather?woeid=90200707').then(value => {
            setDados(value);
        });
    }, []);

    return <Card style={{display: 'flex', flexDirection: 'column', padding: '1rem'}}>

        <img
            style={{backgroundColor: "#000000", height: '600', }}
            src={`https://github.com/adaildoneto/buriti2017/raw/master/tempo/imagens/${dados?.data.results.img_id}.png`}
            alt="Imagem" >
        </img>    

        <TextField variant="outlined" fullWidth value={dados?.data.results.date}></TextField>

        <TextField variant="outlined" fullWidth value={dados?.data.results.time}></TextField>

        <TextField variant="outlined" fullWidth value={dados?.data.results.description}></TextField>

        <TextField variant="outlined" fullWidth  value={dados?.data.results.city}></TextField>


        <TextField variant="outlined" fullWidth value={dados?.data.results.temp}></TextField> 

        


    </Card>
}

export { ConsumirApi }