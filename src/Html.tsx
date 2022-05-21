export type HtmlProps = {
  isProd?: boolean
  children: React.ReactNode
}

export const Html: React.FC<HtmlProps> = ({ children, isProd }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        {!isProd && (
          <script type="module"
            dangerouslySetInnerHTML={{
              __html: `import RefreshRuntime from "/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true`
            }}
            async
          />
        )}
      </body>
    </html>
  )
}
