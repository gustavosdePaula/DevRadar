const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes")

const app = express();

mongoose.connect("mongodb+srv://omnistack:GSPomnistack@clusteromnistack-yniec.mongodb.net/week10?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// Configura Express para entender JSON
app.use(express.json());

//Coleta as rotas
app.use(routes);

// Métodos: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: req.query (Filtros, ordenação, paginação)
// Route Params: req.parms (indentificar recurso)
// Body: req.body (criação / alteração)

// MongoDB (Não Relacional)

// app.get('/', (request, response) => {
//     console.log(request.query);
//     return response.json({message:"Hello Javascript!!!"});
// });

app.post('/', (request, response) => {
    console.log(request.body);
    return response.json({message:"Hello Javascript!!!"});
});

app.listen(3333);