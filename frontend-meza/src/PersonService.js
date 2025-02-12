import axios from 'axios';

const API_URL = 'http://localhost:8080/api/persons';

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
