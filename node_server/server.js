const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware para leer el cuerpo de la solicitud en formato JSON

async function getToken(){
  const url = 'https://id.twitch.tv/oauth2/token';
    const params = new URLSearchParams({
        client_id: 'bw65qpk96wx0ll3f8aompudxy7c2zg',
        client_secret: '44plf64vhudjddm1795no8m0b6kxib',
        grant_type: 'client_credentials'
    });
  
    const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
  
    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    return accessToken;
}

app.post('/games', async (req, res) => {
  try {
    const { sortBy, platform, category, genre, id, search, offset = 0 } = req.body; // Añade offset con valor por defecto 0
    const accessToken = await getToken();
    let query = `fields name, genres.name, cover.url, rating;`;

    if (sortBy === 'popular') {
      query += ` sort rating desc; where rating_count > 75;`;
    } else if (sortBy === 'top_rated') {
      query += ` sort rating_count desc;`;
    } else if (sortBy === 'recent') {
      query += ` sort first_release_date desc; where rating_count > 50;`;
    }

    if (platform) {
      query += ` where platforms.platform_family = ${platform};`;
    }
    if (category) {
      query += ` where category = ${category};`;
    }
    if (genre) {
      query += ` where genres = ${genre};`;
    }

    // Añade la paginación aquí
    query += ` limit 10; offset ${offset};`; // Aquí es donde controlamos cuántos juegos obtenemos y desde qué punto

    if (id) {
      query = `fields name, summary, genres.name, videos.video_id, platforms.name, platforms.platform_family.name, 
               platforms.platform_logo.url, cover.url, first_release_date, rating, involved_companies.company.name;
               where id = ${id};
               limit 1;`;
    }

    if (search) {
      query = `fields name, genres.name, cover.url, rating;
               sort rating_count desc;         
               where name ~ *"${search}"*;
               limit 50;`;
    }

    const gamesResponse = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': 'bw65qpk96wx0ll3f8aompudxy7c2zg',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: query,
    });

    const games = await gamesResponse.json();
    res.json(games);
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    res.status(500).send('Error al obtener los juegos');
  }
});




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
