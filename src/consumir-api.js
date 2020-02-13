import React from 'react';


const ConsumirApi = () => {
    const [dados, setDados] = React.useState();

    

    React.useEffect(() => {

        
        fetch('https://api.hgbrasil.com/weather?woeid=90200707', {'no-cors': true}).then( value => {
            setDados(value);
        })


    },[]);

    return <div style={{ height: 200, width: 400, backgroundColor: '#CCCCCC' }}>
        {JSON.stringify(dados)}
    </div>
}


export { ConsumirApi }