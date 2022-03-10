import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border-radius: 5px;
    border: none;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
    padding: 10px;
    text-transform: uppercase;
    transition: background-color .3s ease;
    width: 100%;

    &&:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ( { setMonedas }) => {
    const [ criptos, setCriptos ] = useState([]);
    const [ error, setError ] = useState(false);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
    const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Elige tu criptomoneda', criptos);

    //useEffect para el consumo del api de criptomonedas, cuando el componente este cargado, [] para que se ejecute una sola vez
    useEffect(() => {
        const consultarApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
            const response = await fetch(url);
            const { Data } = await response.json();

            const arrCriptos = Data.map( cripto => {
                const { Name, FullName  } = cripto.CoinInfo;
                const obj = {
                    id: Name,
                    nombre: FullName
                }
                return obj;
            })

            setCriptos(arrCriptos);
        }
        consultarApi();
    }, [])

    const handleSubmit = ( e ) => {
        e.preventDefault();

        //validar que ambos campos esten llenos
        if([ moneda, criptoMoneda ].includes('')) {
            setError(true);
            return;
        }

        setError(false);

        setMonedas({
            moneda, criptoMoneda
        })
    }

    return (
        <>
            { error && <Error>Todos los campos son obligatorios</Error> }	 

            <form onSubmit={ handleSubmit } action="">

                <SelectMonedas />

                <SelectCriptoMonedas />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario;