const {Router} = require("express");
const DevController = require("./controllers/DevController")

routes = Router();

// app.get('/', (request, response) => {
//     console.log(request.query);
//     return response.json({message:"Hello Javascript!!!"});
// });

routes.post('/devs', DevController.store);

module.exports = routes;
