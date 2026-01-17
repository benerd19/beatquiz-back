import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
    try {
        res.json({
            status: 'ok',
            time: new Date().toISOString(),
        })
    } catch (e) {
        res.json({ error: e.message })
    }
})
app.get('/song/search', async (req, res) => {
    try {
        const { q } = req.query

        const response = await fetch(`https://api.deezer.com/search?q=${q}`, {
            headers: {
                'Accept-Language': 'en',
            },
        })

        const songs = await response.json()

        res.json({
            results: songs.data.map((song) => ({
                id: song.id,
                title: song.title,
                artist: song.artist.name,
                preview: song.preview,
                image: song.album.cover_big,
            })),
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
})

app.get('/song/:trackId', async (req, res) => {
    try {
        const { trackId } = req.params

        const response = await fetch(`https://api.deezer.com/track/${trackId}`, {
            headers: {
                'Accept-Language': 'en',
            },
        })

        const song = await response.json()

        res.json({
            id: song.id,
            title: song.title,
            preview: song.preview,
            image: song.album.cover_big,
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
    console.log('http://localhost:3000')
})
