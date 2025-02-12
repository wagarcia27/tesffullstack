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