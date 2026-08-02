import express from 'express'
import cors from 'cors'
import authRouter from './auth/router/auth.routes'
import { authMiddleware } from './middleware/middleware'
import postRouter from './post/router/post.route'
import path from 'node:path'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Teste!')
})
app.use(
    "/uploads",
    express.static(path.resolve("uploads"))
);
app.use('/auth', authRouter)
app.use('/post', authMiddleware, postRouter)

export default app;