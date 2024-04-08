import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

const Letras = (nombre) => {

    const [Result, SetResult] = useState('')
    const [Cadena, SetCadena] = useState('')


    useEffect(() => {
        const cadena = nombre.trim().toLowerCase().split();
    
        SetCadena(cadena)

    }, [nombre])
    

    const repeticiones = {}
    

    const buscarRepeticiones = (texto, letra="") => {

        if (texto.length === 0) {
            let result = ''
            for(let letra in repeticiones) {
                result += `${letra} = ${repeticiones[ letra ]}<br/>`
            }
            SetResult(result);
        }

        if(letra === "") letra = texto.charAt(0)
    
        let n = 0

        texto.forEach(letter => {
            if(letter === letra) n += 1
        });

        repeticiones[letra] = n

        var texto_limpio = texto.replace(/(letra)/gm, "")
        return buscarRepeticiones(texto, texto_limpio.charAt(0))
       
    }
    

    return (
        <>
            <Button variant="primary" type="button" 
                onClick={buscarRepeticiones({Cadena})}
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