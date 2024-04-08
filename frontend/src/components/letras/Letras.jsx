import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

const Letras = ({empleado}) => {

    const [Result, SetResult] = useState('')
    const [Cadena, SetCadena] = useState('')


    useEffect(() => {

        if (empleado !== '') {
            
            const nombres = empleado.nombre + empleado.apellido
            let cadena = nombres.trim().toLowerCase().split('');
            SetCadena(cadena)
        }

    }, [empleado])
    

    const repeticiones = {}
    

    const buscarRepeticiones =  (letra="") => {

        let texto  = ''

        if(letra === "") {
            letra = texto[0]
            texto =  Object.values(Cadena)
        }
        else{
            texto = Cadena
        }


        if (texto.length === 0) {
            let result = ''
            for(let letra in repeticiones) {
                result += `${letra} = ${repeticiones[ letra ]} --`
            }
            SetResult(result);

            return;
        }

    
        let n = 0

        texto.forEach((letter, i)=> {
            if(letter === letra){
                texto.splice(i,1)
                n += 1
            }
                
        });

        if (letra !== undefined) {
            
            repeticiones[letra] = n
        }

        SetCadena(texto)
         console.log(Cadena)
        return buscarRepeticiones(Cadena[0])
       
    }
    

    return (
        <>
            <Button variant="primary" type="button" 
                onClick={() => buscarRepeticiones()}
            >
                Calcular letras
            </Button>

            <div>
                { Result }
            </div>
        </>
    )

}


export default Letras