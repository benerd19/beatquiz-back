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

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
