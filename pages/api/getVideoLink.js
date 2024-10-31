const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Tenta fazer uma requisição ao link original
        const response = await axios.get('http://s3-server.net:80/series/876056/Pb9SYJ/91664.mp4', {
            maxRedirects: 0, // Para capturar o redirecionamento
            validateStatus: status => status >= 200 && status < 400
        });

        // Checa se o cabeçalho `location` está presente (indicando redirecionamento)
        if (response.headers.location) {
            // Envia o link redirecionado como JSON
            res.status(200).json({ videoUrl: response.headers.location });
        } else {
            // Se não houver redirecionamento, usa o URL original (ou adapte conforme necessário)
            res.status(200).json({ videoUrl: 'http://s3-server.net:80/series/876056/Pb9SYJ/91664.mp4' });
        }
    } catch (error) {
        console.error("Erro ao obter o link do vídeo:", error);
        res.status(500).json({ error: 'Não foi possível obter o link do vídeo' });
    }
};
