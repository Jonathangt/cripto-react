import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import imgCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Heading = styled.h1`
  color: #FFF;
  font-family: 'Lato', sans-serif;
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 80px;
  text-align: center;
  width: 90%;

  &::after {
    background-color: #66A2FE;
    content: '';
    display: block;
    height: 6px;
    margin: 10px auto 0 auto;
    width: 100px;
  }
`

const Imagen = styled.img`
  display: block;
  margin: 100px auto 0 auto;
  max-width: 400px;
  width: 80%;
`

const Contenedor = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media (min-width: 992px) {
    column-gap: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ cotizacion, setCotizacion ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect( () =>{
    if ( Object.keys(monedas).length > 0 ) {
      setCargando(true)
      setCotizacion({})
      
      const cotizarCripto = async () => {
        const { moneda, criptoMoneda } = monedas

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const response = await fetch(url)
        const res = await response.json()
        setCotizacion(res.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }    
  },[ monedas ])



  return (
    <Contenedor>
      <Imagen src={ imgCripto } alt="Img Criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario setMonedas = { setMonedas } />

        { cargando && <Spinner /> }

        { cotizacion.PRICE && <Resultado cotizacion = { cotizacion } /> }    

      </div>

    </Contenedor>
  )
}

export default App
