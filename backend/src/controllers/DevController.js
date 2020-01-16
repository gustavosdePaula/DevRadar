const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/ParseStringAsArray");

// Funções Index, Show, Update, Destroy

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
    
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username }) //variável sobreposta

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio, blog } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                blog,
                techs: techsArray,
                location,
            });        
        }

        return response.json(dev);
    },

    async update(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username }) //variável sobreposta

        if(dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio, blog } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            updateResponse = await Dev.updateOne({
                _id: dev._id,
                github_username,
                name,
                avatar_url,
                bio,
                blog,
                techs: techsArray,
                location,
            });   
            
            dev = await Dev.findOne({ github_username }) // dev Updated
        }

        return response.json({updateResponse, dev});
    },

    async destroy(request, response){
        
        const { github_username } = request.body;
        
        const dev = await Dev.findOneAndDelete({ github_username }); //variável sobreposta

        return response.json({message: "Dev " + github_username + " deletado com sucesso", dev});
    }

}