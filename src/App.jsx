

export function Tarjetes(){
  const rutinas = ["Piernas","Push","Pull"]
  const dies = ["Lunes y jueves","Martes y Viernes","Miercoles y Sabado"]
  const href = ["/src/assets/pages/Piernas.html","/src/assets//pages/Push.html","/src/assets//pages/Pull.html"]
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
