import swaggerAutogen from "swagger-autogen"

const autputFile='./swagger.json'
const endPointsFiles=['./app.js']

const doc={
    info: {
        title:'Api user',
        description:'Esta api sirve para ajecutar un crud de users con endpoints' 
    },
    host:'localhost:3000',
    schemes:['http']
}
swaggerAutogen()(autputFile,endPointsFiles,doc)