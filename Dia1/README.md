# Api campuslands

API hecha en **Express.js** y **MongoDB** para gestionar **campers, coordinadores, trainers, horarios, rutas y grupos** en un sistema académico.  

---

##  Instalación

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


La API se ejecuta en:
 http://localhost:2512

Documentación Swagger:
http://localhost:2512/doc

## Endpoints principales
# 1. Gestión de base de datos
### http://localhost:2512/crearColecciones : Crea las colecciones del proyecto

* 201: creadas con éxito

* 409: ya existen

* 500: error del servidor

# 2. Coordinadores
### curl -X POST http://localhost:2512/crearCoordinador -H "Content-Type: application/json" -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez"}'

crea un coordinador

# 3. Campers
### curl -X POST http://localhost:2512/coordinador/0/1234/crearEstudiante   -H "Content-Type: application/json"   -d '{"contrasena":"1234","nombre":"Juan","apellido":"Pérez","acudiente":"María Gómez","telefono":"3124567890"}'

## crea un camper 

### http://localhost:2512/coordinador/0/1234/aprobarCamper

## lista campers en estado Inscrito

### curl -X PUT "http://localhost:2512/coordinador/0/1234/aprobarCamper/1"

## aprueba un camper 

### http://localhost:2512/campers/0/1234/verMiInfo
## ver información personal del camper

# 4. Trainers
POST /coordinador/:idCoordinador/:contrasena/crearTrainer
## crear un trainer

GET /trainers/:idTrainer/:contrasena/verMiInfo
Ver información personal del trainer

Horarios
POST /coordinador/:idCoordinador/:contrasena/crearHorario
Crear un horario 

Rutas
POST /coordinador/:idCoordinador/:contrasena/crearRuta
Crear una ruta

Grupos
POST /coordinador/:idCoordinador/:contrasena/crearGrupos
Crear grupo

PUT /coordinador/:idCoordinador/:contrasena/asignarGrupoRuta/:idGrupo/:idRuta
Asignar ruta a grupo

PUT /coordinador/:idCoordinador/:contrasena/asignarGrupoHorario/:idGrupo/:idHorario
Asignar horario a grupo

PUT /coordinador/:idCoordinador/:contrasena/asignarGrupoTrainer/:idGrupo/:idTrainer
Asignar trainer a grupo

PUT /coordinador/:idCoordinador/:contrasena/asignarGrupoCamper/:idGrupo/:idCamper
Asignar camper a grupo

## Códigos de estado comunes
200 OK → Petición exitosa.

201 Created → Recurso creado.

400 Bad Request → Datos inválidos.

401 Unauthorized → Credenciales incorrectas.

404 Not Found → Recurso no encontrado.

409 Conflict → Ya existe / no se puede duplicar.

500 Internal Server Error → Error en servidor o base de datos.
