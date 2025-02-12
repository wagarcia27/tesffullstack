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
    const result = await PersonService.getPersonById(id);
    setPerson(result.data.data);
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
    await PersonService.updatePerson(id, person);
    history.push('/persons');
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