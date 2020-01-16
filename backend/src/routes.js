const {Router} = require("express");
const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")

routes = Router();

// app.get('/', (request, response) => {
//     console.log(request.query);
//     return response.json({message:"Hello Javascript!!!"});
// });

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
