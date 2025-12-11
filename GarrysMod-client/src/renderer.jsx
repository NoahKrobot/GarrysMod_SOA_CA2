import React from "react";
import {createRoot} from 'react-dom/client'
import Auth from './components/Auth.jsx'
const App = () =>{

  return(
  <>
    <Auth/>
  </>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App/>)
