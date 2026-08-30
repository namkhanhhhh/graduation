import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Plugin to save data locally during development
const localApiPlugin = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/save' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })
        req.on('end', () => {
          const filePath = path.resolve(__dirname, 'src/data.json')
          fs.writeFileSync(filePath, body)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
        })
      } else {
        next()
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
})
