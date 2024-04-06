function contar() {
    // Capturas el valor del input, lo limpas de espacios al inicio y al final y luego haces un arreglo
    const texto = document.getElementById('texto').
    value.trim().toLowerCase().split('');
    
    // Creamos un objeto que será el que almacene las repeticiones
    const repeticiones = {};
    
    // Ciclamos el texto del input y verificamos si existe y sumamos 1, de no existir siempre valdrá 1
    texto.forEach( ( letra ) => {
      repeticiones[ letra ] = ( repeticiones[ letra ] || 0 ) + 1;
    });
    
    // Ahora ciclamos el objeto y lo agregamos al resultado
    for( let letra in repeticiones ) {
      const text = `${ letra } = ${ repeticiones[ letra ] }<br>`;
      document.getElementById('resultado').innerHTML += text;
    }
  
  
  }