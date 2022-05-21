import { renderToPipeableStream } from 'react-dom/server'
import { Html } from './Html'
import { StaticRouter } from 'react-router-dom/server'

import App from './App'

export const render = (url: string, isProd: boolean) => {
  return renderToPipeableStream(
    <Html isProd={isProd}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Html>,
    {
      bootstrapModules: ['/src/entry-client.tsx']
    }
  )
}
