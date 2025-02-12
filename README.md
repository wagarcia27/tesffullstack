# Frontend del Proyecto Fullstack

## Descripción

Este proyecto es una aplicación frontend desarrollada con React que permite capturar el nombre, apellido, fecha de nacimiento, puesto y sueldo de una persona. La aplicación proporciona una interfaz de usuario para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de las personas.

## Requisitos

- Node.js (versión 18.19.0 o superior)
- npm (versión 6.14.4 o superior)

## Configuración del Proyecto

### Clonar el Repositorio

1. **Clonar el Repositorio:**

 ```bash
   git clone https://github.com/tu_usuario/frontend_meza
   cd frontend_meza
```

    ## Instalar Dependencias

1. **Instalar las Dependencias del Proyecto:**

```bash
   npm install
   ```

   ### Configurar el Servicio PersonService

   1. **Configurar la URL del Backend:**

   - Abre el archivo src/PersonService.js y asegúrate de que la URL del backend esté configurada correctamente:

```javascript

   import axios from 'axios';

const API_URL = 'http://<IP_de_tu_PC_personal>:8080/api/persons';

class PersonService {
  getPersons() {
    return axios.get(API_URL);
  }

  createPerson(person) {
    return axios.post(API_URL, person);
  }

  updatePerson(id, person) {
    return axios.put(`${API_URL}/${id}`, person);
  }

  deletePerson(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  getPersonById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
}

const personService = new PersonService();
export default personService;

```

### Ejecutar la Aplicación

   1. **Iniciar el Servidor de Desarrollo React:**

   - Ejecuta el siguiente comando para iniciar el servidor de desarrollo React:

``` bash
   npm start
   ```
   - Abre tu navegador y navega a http://localhost:3000 para ver la aplicación en funcionamiento.

   ### Ejecutar la Aplicación
    Asegúrate de que la estructura de tu proyecto se vea algo así:

    frontend-meza/
├── node_modules/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── CreatePerson.js
│   ├── EditPerson.js
│   ├── ListPersons.js
│   ├── PersonService.js
│   ├── person.js
│   ├── index.js
│   └── ...
├── package.json
├── package-lock.json
└── ...

### Componentes Principales

1. **App.js:**

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPersons from './ListPersons';
import CreatePerson from './CreatePerson';
import EditPerson from './EditPerson';
import './App.css'; // Importar los estilos globales

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={ListPersons} />
            <Route exact path="/persons" component={ListPersons} />
            <Route exact path="/create" component={CreatePerson} />
            <Route exact path="/edit/:id" component={EditPerson} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
```

1. **App.css:**


```css

/* App.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
}

h2 {
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

button, input[type="submit"] {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover, input[type="submit"]:hover {
  background-color: #45a049;
}

input[type="text"], input[type="date"], input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.actions button {
  background-color: #f44336;
}

.actions button:hover {
  background-color: #e53935;
}

.actions a {
  text-decoration: none;
  color: white;
}
```

3. **ListPersons.js:**

```javascript
import React, { useState, useEffect } from 'react';
import PersonService from './PersonService';
import { Link } from 'react-router-dom';

const ListPersons = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    const result = await PersonService.getPersons();
    setPersons(result.data.data);
  };

  const deletePerson = async (id) => {
    await PersonService.deletePerson(id);
    loadPersons();
  };

  return (
    <div>
      <h2>Lista de Personas</h2>
      <div className="actions">
        <Link to="/create">
          <button>Crear Persona</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Puesto</th>
            <th>Sueldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.nombre}</td>
              <td>{person.apellido}</td>
              <td>{new Date(person.fechaNacimiento).toLocaleDateString()}</td>
              <td>{person.puesto}</td>
              <td>{person.sueldo}</td>
              <td className="actions">
                <Link to={`/edit/${person.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => deletePerson(person.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPersons;
```

4. **CreatePerson.js:**

```javascript

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PersonService from './PersonService';

const CreatePerson = () => {
  const [person, setPerson] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    puesto: '',
    sueldo: 0
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await PersonService.createPerson(person);
    history.push('/persons');
  };

  return (
    <div>
      <h2>Crear Persona</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={person.nombre} onChange={handleChange} required />
        <br />
        <label>Apellido:</label>
        <input type="text" name="apellido" value={person.apellido} onChange={handleChange} required />
        <br />
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={person.fechaNacimiento} onChange={handleChange} required />
        <br />
        <label>Puesto:</label>
        <input type="text" name="puesto" value={person.puesto} onChange={handleChange} required />
        <br />
        <label>Sueldo:</label>
        <input type="number" name="sueldo" value={person.sueldo} onChange={handleChange} required />
        <br />
        <div className="actions">
          <input type="submit" value="Guardar" />
          <button type="button" onClick={() => history.push('/persons')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePerson;
```

4. **EditPerson.js:**

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PersonService from './PersonService';

const EditPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    puesto: '',
    sueldo: 0
  });

  const history = useHistory();

  const loadPerson = useCallback(async () => {
    try {
      const result = await PersonService.getPersonById(id);
      setPerson(result.data.data);
    } catch (error) {
      console.error("Error loading person:", error);
    }
  }, [id]);

  useEffect(() => {
    loadPerson();
  }, [loadPerson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PersonService.updatePerson(id, person);
      history.push('/persons');
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <div>
      <h2>Editar Persona</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={person.nombre} onChange={handleChange} required />
        <br />
        <label>Apellido:</label>
        <input type="text" name="apellido" value={person.apellido} onChange={handleChange} required />
        <br />
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={person.fechaNacimiento} onChange={handleChange} required />
        <br />
        <label>Puesto:</label>
        <input type="text" name="puesto" value={person.puesto} onChange={handleChange} required />
        <br />
        <label>Sueldo:</label>
        <input type="number" name="sueldo" value={person.sueldo} onChange={handleChange} required />
        <br />
        <div className="actions">
          <input type="submit" value="Guardar" />
          <button type="button" onClick={() => history.push('/persons')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditPerson;
```

5. **PersonService.js:**

```javascript
import axios from 'axios';

const API_URL = 'http://<IP_de_tu_PC_personal>:8080/api/persons';

class PersonService {
  getPersons() {
    return axios.get(API_URL);
  }

  createPerson(person) {
    return axios.post(API_URL, person);
  }

  updatePerson(id, person) {
    return axios.put(`${API_URL}/${id}`, person);
  }

  deletePerson(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  getPersonById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
}

const personService = new PersonService();
export default personService;
```

6. **person.js:**

```javascript

export interface Person {
  id?: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  puesto: string;
  sueldo: number;
}
```

7. **index.js:**

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```