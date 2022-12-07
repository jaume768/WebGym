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
                  <a href={`../pages/CambiarValores.html?${item.id}`}>Cambiar valor</a>
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

export function CambiarValores(){

  function prova(){
    const ParamUrl = (window.location.search);
    const ParamUrlFinal = parseInt(ParamUrl.substring(ParamUrl.length,ParamUrl.length-1))
    const hoy = new Date();
    var Kilos = document.getElementById("Kilos").value;
    var Series = document.getElementById("Series").value;
    var Repes = document.getElementById("Repes").value;
    var Pr = document.getElementById("Pr").value;
    var Dia = hoy.getDate();
    var Mes = hoy.getMonth()+1;
    var Anyo = hoy.getFullYear();
    var xhr = new XMLHttpRequest();
    var url = `https://restapigym-production.up.railway.app/api/updateEntreno/${ParamUrlFinal}`;
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.Kilos + ", " + json.Series  + ", " + json.Repes  + ", " + json.Pr);
        }
    };
    var data = JSON.stringify({"Kilos": Kilos, "Series": Series,"Repes":Repes,"Pr":Pr,"Dia": Dia,"Mes":Mes,"Anyo":Anyo});
    xhr.send(data);
    alert("Enviado!!")
  }

  return (
    <form>
      <label for="nombre">Kilos</label>
	    <input type="text" name="nombre" id="Kilos"/>
      <label for="apellidos">Series</label>
	    <input type="text" name="apellidos" id="Series"/>
      <label for="email">Repes</label>
	    <input type="text" name="email" id="Repes"/>
      <label for="asunto">Pr</label>
	    <input type ="text" name="asunto" id="Pr"/>
      <hr />
      <br />
      <div id = "links">
        <a href="#" name="enviar" value="enviar" onClick={prova}>Enviar</a>
      </div>
    </form>
  )
}