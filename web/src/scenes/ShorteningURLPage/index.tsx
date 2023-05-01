import React from 'react'
import Head from 'next/head'

import { Button, Stack, TextField, Typography } from '@mui/material'

import configuration from '@/configuration'

const ShorteningURLPage: React.FC = () => {
  const [originalUrl, setOriginalUrl] = React.useState<string>()
  const [urlIdentifier, setUrlIdentifier] = React.useState<string>()

  const shortenedUrl = React.useMemo(() => {
    if (urlIdentifier) {
      const regex = /^https?:\/\/[^\/]+/;
      const baseUrl = window.location.href?.match(regex)?.[0];
    
      if (baseUrl) {
        return baseUrl + '/' + urlIdentifier;

      } else {
        return null;
      }
    }

    return null
  }, [urlIdentifier])

  const generateURLIdentifier = React.useCallback(
    async (url: string) => {
      const payload = await fetch(configuration.API_BASE_URL + '/services/shortening-url', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
        })
      }).then(response => response.json())

      setUrlIdentifier(payload.identifier)
    },
    [configuration.API_BASE_URL]
  )


  return (
    <>
      <Head>
        <title>Simple Shortening URL App</title>
      </Head>
      <Stack flexDirection='column' justifyContent='center' height='100vh' width='100vw' padding='40px'>
        <Stack width='100vw' flexDirection='row' justifyContent='center'>
          <TextField
            label='URL'
            id='shortening-input'
            sx={{
              width: '800px',
            }} 
            value={originalUrl}
            onChange={(event) => {
              setOriginalUrl(event.target.value)
            }}
          />
          <Button variant='contained' onClick={() => {
            if (originalUrl) {
              generateURLIdentifier(originalUrl)
            }
          }}>Shorten</Button>
        </Stack>
        <Stack 
          flexDirection='row'
          justifyContent='center'
          sx={{
            margin: '20px'
          }}
        >
          <a href={`/${urlIdentifier}`} target='_blank'>
            <Typography>
              {shortenedUrl}
            </Typography>
          </a>
        </Stack>
      </Stack>
    </>
  )
}

export default ShorteningURLPage