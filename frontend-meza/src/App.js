import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPersons from './ListPersons';
import CreatePerson from './CreatePerson';
import EditPerson from './EditPerson';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ListPersons} />
          <Route exact path="/persons" component={ListPersons} />
          <Route exact path="/create" component={CreatePerson} />
          <Route exact path="/edit/:id" component={EditPerson} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;