const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.getGif = functions.https.onRequest(async (req, res) => {
    const giphyApiKey = functions.config().giphy.key; // Securely access API key
    const query = req.query.q;

    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching GIF:", error);
        res.status(500).send({ error: "Unable to fetch GIF" });
    }
});
