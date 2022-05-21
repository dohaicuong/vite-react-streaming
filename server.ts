import express from 'express'
import { createServer as createViteServer } from 'vite'
import { PipeableStream } from 'react-dom/server'

const isProd = process.env.NODE_ENV === 'production'

const createServer = async () => {
  const app = express()
  
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })

  app.use(vite.middlewares)

  app.get('/api/posts', async (req, res) => {
    await new Promise(resolve => setTimeout(() => resolve({}), 5000))

    res.status(200).send(
      Array(100)
        .fill({ id: 0, title: 'Post', body: 'some content' })
        .map((post, i) => ({
          id: post.id + i,
          title: `${post.title} ${i}`,
          body: `${post.body} ${i}`,
        }))
    )
  })

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      const stream = render(url, isProd) as PipeableStream
      
      stream.pipe(res)

      setTimeout(stream.abort, 1000)
    }
    catch(error: any) {
      vite.ssrFixStacktrace(error)
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  return app
}

createServer()
  .then(app => app.listen(3000))
  .then(() => console.log('http://localhost:3000'))
