import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Shortening App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        width: '100vw',
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
