import React from 'react'
import ReactDOM from 'react-dom/client'
import {Entrenamientos,SaberUrl} from '../App'
import '../index.css'

const urls = ["Piernas.html","Push.html","Pull.html"]
const UrlActual = SaberUrl()
let PaginaActual;
for(let i = 0; i < urls.length; i++){
  if(urls[i] == UrlActual){
    PaginaActual = i;
  }
}

let entrenos = ['piernas','push','pull']

const root = ReactDOM.createRoot(document.getElementById(`${entrenos[PaginaActual]}`))

root.render(
    <Entrenamientos /> 
)