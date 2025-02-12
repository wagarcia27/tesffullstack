package com.example.backend_meza.controller;

import com.example.backend_meza.ResourceNotFoundException;
import com.example.backend_meza.Response;
import com.example.backend_meza.model.Person;
import com.example.backend_meza.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/persons")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public ResponseEntity<?> getAllPersons() {
        List<Person> persons = personRepository.findAll();
        return ResponseEntity.ok(new Response(true, "Success", persons));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found"));
        return ResponseEntity.ok(new Response(true, "Success", person));
    }

    @PostMapping
    public ResponseEntity<?> createPerson(@RequestBody Person person) {
        Person savedPerson = personRepository.save(person);
        return ResponseEntity.ok(new Response(true, "Person created", savedPerson));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePerson(@PathVariable Long id, @RequestBody Person personDetails) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found"));
        person.setNombre(personDetails.getNombre());
        person.setApellido(personDetails.getApellido());
        person.setFechaNacimiento(personDetails.getFechaNacimiento());
        person.setPuesto(personDetails.getPuesto());
        person.setSueldo(personDetails.getSueldo());
        final Person updatedPerson = personRepository.save(person);
        return ResponseEntity.ok(new Response(true, "Person updated", updatedPerson));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found"));
        personRepository.delete(person);
        return ResponseEntity.ok(new Response(true, "Person deleted", null));
    }
}