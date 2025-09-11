# Api campuslands

API hecha en **Express.js** y **MongoDB** para gestionar **campers, coordinadores, trainers, horarios, rutas y grupos** en un sistema académico.  

---

#  Instalación

entremos a nuestros archivos dentro de una carpeta donde se quiera descargar el proyecto y la abrimos en terminal para ejecutar lossiguientes comandos
```bash

git clone https://github.com/harleyyefreycabralesvargas/Express_S1_CabralesHarley
```
Ya con el repositotio descargado lo abriremos en visual studio code y haremos los siguientes comandos
```bash
cd Dia1
npm i
touch .env
nano .env
# se pegara esto dentro del nano
# PORT=2512
# MONGO_URI=mongodb://localhost:27017
# DB_NAME=express
npm run inicio 
```
esto descargara los paquetes que se utilizan en el programa y ejecutara nuestro servidor local


### La API se ejecuta en:
 http://localhost:2512

### Documentación Swagger:
http://localhost:2512/doc

# Endpoints principales
# 1. Gestión de base de datos
### http://localhost:2512/crearColecciones 
## crea las colecciones del proyecto

# 2. Coordinadores
### curl -X POST http://localhost:2512/crearCoordinador -H "Content-Type: application/json" -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez"}'

## crea un coordinador

### curl -X POST http://localhost:2512/coordinador/0/1234/crearHorario   -H "Content-Type: application/json"   -d '{"nombre":"jornada1","horas":"6am a 10am"}'

## crear un horario 

### curl -X POST http://localhost:2512/coordinador/0/1234/crearRuta   -H "Content-Type: application/json"   -d '{"nombreRuta":"Nodejs","intro":"","python":"","html/css":"","scrum":"","git":"","Javascript":"","introBBD":"","mongoDB":"","MySQL":"","Express":""}'

## crear una ruta

### curl -X POST http://localhost:2512/coordinador/0/1234/crearGrupos   -H "Content-Type: application/json"   -d '{"nombreGrupo":"S1"}'

## crea grupo

### curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoRuta/0/0
## asignar ruta a grupo

### curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoHorario/0/0
## asignar horario a grupo

### curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoTrainer/0/0
## asignar trainer a grupo

### curl -X PUT http://localhost:2512/coordinador/0/1234/asignarGrupoCamper/0/0
## asignar camper a grupo

# 3. Campers
### curl -X POST http://localhost:2512/coordinador/0/1234/crearEstudiante   -H "Content-Type: application/json"   -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890"}'

## crea un camper 

### curl http://localhost:2512/coordinador/0/1234/aprobarCamper

## lista campers en estado Inscrito

### curl -X PUT "http://localhost:2512/coordinador/0/1234/aprobarCamper/0"

## aprueba un camper 

### http://localhost:2512/campers/0/1234/verMiInfo
## ver información personal del camper

# 4. Trainers
### curl -X POST http://localhost:2512/coordinador/0/1234/crearTrainer   -H "Content-Type: application/json"   -d '{"contrasena":"2","nombre":"Pedro","apellido":"Gomez","telefono":"3164372414","idHorario":1,"idGrupos":2}'

## crear un trainer

### curl http://localhost:2512/trainers/0/2/verMiInfo
## ver información personal del trainer


# Códigos de estado comunes
200 OK → Petición exitosa.

201 Created → Recurso creado.

400 Bad Request → Datos inválidos.

401 Unauthorized → Credenciales incorrectas.

404 Not Found → Recurso no encontrado.

409 Conflict → Ya existe / no se puede duplicar.

500 Internal Server Error → Error en servidor o base de datos.
