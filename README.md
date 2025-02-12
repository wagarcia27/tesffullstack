# Backend del Proyecto Fullstack

## Descripción

Este proyecto es una aplicación backend desarrollada con Spring Boot que permite capturar el nombre, apellido, fecha de nacimiento, puesto y sueldo de una persona. La aplicación proporciona una API REST para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de las personas.

## Requisitos

- Java 17
- Maven
- MySQL

## Configuración del Proyecto

### Clonar el Repositorio

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tonysoft2018/tesffullstack
   cd tesffullstack

2. **Crear Ramas:**
git checkout -b meza_backend
git checkout -b meza_frontend
git checkout -b meza_bd

### Configurar el Backend con Spring Boot

1. **Configurar application.properties:**

Abre el archivo src/main/resources/application.properties y configura la conexión a la base de datos:


spring.datasource.url=jdbc:mysql://<IP_de_tu_PC_personal>:3306/bd_meza?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=conexion
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

Reemplaza <IP_de_tu_PC_personal> con la dirección IP 192.168.80.24 si estás accediendo de forma remota, o usa localhost si estás accediendo desde la misma máquina donde se ejecuta el servidor.

2. **Añadir Dependencias en pom.xml:**

<!-- Asegúrate de que las siguientes dependencias estén presentes en tu archivo pom.xml: -->

<dependencies>
    <!-- Dependencia de Spring Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

   <!-- Dependencia de Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

   <!-- Dependencia del Driver MySQL -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

   <!-- Dependencia de Jakarta Persistence -->
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.0.0</version>
    </dependency>

   <!-- Dependencia de Spring Boot DevTools (opcional) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>

   <!-- Dependencia de Spring Boot Test (opcional) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>

3. **Actualizar el Proyecto Maven:**

- Haz clic derecho en el proyecto en el explorador de proyectos.
- Selecciona Maven > Update Project....
- En la ventana que aparece, asegúrate de que tu proyecto esté seleccionado y haz clic en OK.

4. **Limpiar y Reconstruir el Proyecto:**
- Haz clic derecho en tu proyecto y selecciona Run As > Maven clean.
- Luego, selecciona Run As > Maven install.

### Crear las Entidades, Repositorios y Controladores

1. **Entidad Person:**
- Crea la clase Person en el paquete com.example.backend_meza.model:

```java
package com.example.backend_meza.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private String puesto;
    private BigDecimal sueldo;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public BigDecimal getSueldo() {
        return sueldo;
    }

    public void setSueldo(BigDecimal sueldo) {
        this.sueldo = sueldo;
    }
}

2. **Repositorio PersonRepository:**
- Crea la interfaz PersonRepository en el paquete com.example.backend_meza.repository:

```java
package com.example.backend_backend_meza.repository;

import com.example.backend_backend_meza.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}

3. **Controlador PersonController:**
- Crea la clase PersonController en el paquete com.example.backend_meza.controller:

```java
package com.example.backend_backend_meza.controller;

import com.example.backend_backend_meza.model.Person;
import com.example.backend_backend_meza.repository.PersonRepository;
import com.example.backend_backend_meza.Response;
import com.example.backend_backend_meza.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

4. **Clase Response:**
- Crea la clase Response en el paquete com.example.backend_meza:

```java
package com.example.backend_backend_meza;

public class Response {
    private boolean status;
    private String msg;
    private Object data;

    public Response(boolean status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    // Getters y Setters

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}

5. **Clase `ResourceNotFoundException`:**
   - Crea la clase `ResourceNotFoundException` en el paquete `com.example.backend_meza`:

     ```java
     package com.example.backend_backend_meza;

     import org.springframework.http.HttpStatus;
     import org.springframework.web.bind.annotation.ResponseStatus;

     @ResponseStatus(value = HttpStatus.NOT_FOUND)
     public class ResourceNotFoundException extends RuntimeException {
         public ResourceNotFoundException(String message) {
             super(message);
         }
     }
     ```

## Ejecutar la Aplicación

1. **Iniciar la Aplicación:**
   - Ejecuta la aplicación desde Spring Tool Suite 4. Haz clic derecho en el proyecto y selecciona `Run As` > `Spring Boot App`.

## Probar el CRUD con Postman

1. **Probar las Operaciones CRUD:**
   - Abre Postman y crea las siguientes solicitudes para probar las operaciones CRUD:

   - **GET** `/api/persons`
     - URL: `http://<localhost>:8080/api/persons`
     - Descripción: Obtener todas las personas.

   - **POST** `/api/persons`
     - URL: `http://<localhost>:8080/api/persons`
     - Body (JSON):
       ```json
       {
           "nombre": "Juan",
           "apellido": "Garcia",
           "fechaNacimiento": "1990-01-01",
           "puesto": "Desarrollador",
           "sueldo": 50000.00
       }
       ```
     - Descripción: Crear una nueva persona.

   - **PUT** `/api/persons/{id}`
     - URL: `http://localhost:8080/api/persons/1`
     - Body (JSON):
       ```json
       {
           "nombre": "Juan",
           "apellido": "Garcia",
           "fechaNacimiento": "1990-01-01",
           "puesto": "Desarrollador Senior",
           "sueldo": 60000.00
       }
       ```
     - Descripción: Actualizar una persona existente.

   - **DELETE** `/api/persons/{id}`
     - URL: `http://localhost:8080/api/persons/1`
     - Descripción: Eliminar una persona existente.

## Subir el Código del Backend

1. **Hacer Commit y Push:**
   - Una vez que hayas probado y verificado que todo funciona correctamente, haz commit y push de los cambios al repositorio:

   ```bash
   git add .
   git commit -m "Add backend CRUD service"
   git push origin meza_backend