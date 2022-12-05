import React from 'react'

export function Tarjetes(){
  const rutinas = ["Piernas","Push","Pull"]
  const dies = ["Lunes y jueves","Martes y Viernes","Miercoles y Sabado"]
  const href = ["/src/assets/pages/Piernas.html","/src/assets/pages/Push.html","/src/assets/pages/Pull.html"]
  let tarjeta = []
  for(let i = 0; i < rutinas.length; i++){
    tarjeta.push(<a href={href[i]}>
      <div id="carta">
          <h2>{rutinas[i]}</h2>
          <hr />
          <div id="Descrip"><p> Pulsa en la tarjeta para ver el entrenamiento </p></div>
          <hr />
          <h3>{dies[i]}</h3>
      </div>
    </a>)
  }

  return tarjeta;
}

export function SaberUrl(){

  const url = document.URL;
  let contador = url.length;
  for(let i = url.length; i > 0; i--){
    if(url.charAt(i) != '/'){
      contador--;
    }else{
      break;
    }
  }
  const UrlActual = url.substring(url.length,contador+1)
  return UrlActual;

}

export function Entrenamientos(){

  const urls = ["Piernas.html","Push.html","Pull.html"]
  let entrenos = ['entrenoPiernas','entrenoPush','entrenoPull']
  const UrlActual = SaberUrl()
  let PaginaActual;
  for(let i = 0; i < urls.length; i++){
    if(urls[i] == UrlActual){
      PaginaActual = i;
    }
  }

  const [entrenar,setEntreno] = React.useState([])

  React.useEffect(() => {
    obtenerDatos()
  },[])

  const obtenerDatos = async () => {
    const data = await fetch(`https://restapigym-production.up.railway.app/api/${entrenos[PaginaActual]}`)
    const datos = await data.json()
    setEntreno(datos)
  }  
       
  return (
    <div>
      {
        entrenar.map(item => (
          <div id="carta">
              <h2>{item.id}</h2>
              <hr />
              <h2>{item.Nombre}</h2>
              <hr />
              <p>Ultimo entreno: </p>
              <ul>
                  <li>{item.Kilos} kg</li>
                  <li>{item.Repes} repes</li>
                  <li>{item.Series} series</li>
              </ul>
              <hr />
              <p>PR:</p>
              <p>{item.Pr} kg</p>
              <hr />
              <div id = "links">
                  <a href="#">Cambiar valor</a>
              </div>
              <hr />
              <div id = "links">
                  <a href="#">Historial</a>
              </div>
          </div>
        ))
      }
    </div>
  ); 
}