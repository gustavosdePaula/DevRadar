import React, { useState, useEffect } from 'react';
import api from './services/api'

//import logo from './logo.svg';
//import './App.css';

// Componente: Um bloco isolado, no qual não interfere no resto da aplicação. 
// Se cria um componente quando o código se repetir.

// Estado: Informações mantidas pelo componente (imutabilidade)

// Propriedade: Informações que um componente passa para outro!

// import Header from './Header'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {

  
  const [devs, setDevs] = useState([]);


 

  useEffect( () => {

    async function loadDevs (){
      const response = await api.get('/devs')
      setDevs(response.data);
    }

    loadDevs();
  
  }, []);

  async function handleAddDev(data){
    

    const response = await api.post('/devs', data);

    console.log(response.data);
    

    setDevs([...devs, response.data]);
  }

  return (
     <div id="app">
       <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}></DevForm>
       </aside>

      <main>
        <ul>
          { devs.map( dev => {
            return (
              <DevItem key={dev._id} dev={dev}></DevItem>
           )})}

        </ul>
      </main>

     </div>
  );
}

export default App;
