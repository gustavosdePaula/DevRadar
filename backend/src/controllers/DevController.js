const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    async store(request, response){
    
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username }) //variável sobreposta

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio, blog } = apiResponse.data;
        
            const techsArray = techs.split(`,`).map(techs => techs.trim());
        
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
    }
}