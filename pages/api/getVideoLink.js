const axios = require('axios');
const { response } = require('express');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://s3-server.net:80/series/876056/Pb9SYJ/91664.mp4', {
            maxRedirects: 0,
            validateStatus: status => status >= 200 && status < 400
        });
        res.status(200).json({ videoUrl: response.headers.location });
    } catch (error) {
        console.error("Erro ao obter o link do vídeo:", error);
        res.status(500).json({ error: 'Não foi possível obter o link do vídeo' });
    }
};
console.log(response);