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