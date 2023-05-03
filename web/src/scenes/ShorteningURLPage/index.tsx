import React from 'react'
import Head from 'next/head'

import { Button, Stack, TextField, Typography } from '@mui/material'

import configuration from '@/configuration'

import { BASE_URL_REGEX, URL_REGEX } from './constants'
import { useRouter } from 'next/router'

const ShorteningURLPage: React.FC = () => {
  const [originalUrl, setOriginalUrl] = React.useState<string>()
  const [errorMessage, setErrorMessage] = React.useState<string>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [urlIdentifier, setUrlIdentifier] = React.useState<string>()

  const shortenedUrl = React.useMemo(() => {
    if (urlIdentifier) {
      const baseUrl = window.location.href?.match(BASE_URL_REGEX)?.[0];
    
      if (baseUrl) {
        return baseUrl + '/?identifier=' + urlIdentifier;

      } else {
        return null;
      }
    }

    return null
  }, [urlIdentifier])

  const generateUrlIdentifier = React.useCallback(
    async (url: string) => {
      setIsLoading(true)

      try {
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

      } catch (exception) {
        // Nothing TODO
      } finally {
        // Either success or failed, set loading flag to false
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configuration.API_BASE_URL]
  )

  const validateAndGenerateUrlIdentifier = React.useCallback(() => {
    if (!originalUrl) {
      setErrorMessage('Can\'t be empty')
      return
    }
    
    const isUrlValid = URL_REGEX.test(originalUrl)
    if (!isUrlValid) {
      setErrorMessage("You must input with URL format")
      return
    }
    
    setErrorMessage(undefined)
    generateUrlIdentifier(originalUrl)

  }, [originalUrl, generateUrlIdentifier])

  // In order to trigger button via Enter button
  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        validateAndGenerateUrlIdentifier()
      }
    };

    // Add trigger to event when any button is pressed
    document.addEventListener("keydown", listener);

    // Remove trigger listener to avoid high memory usage
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [validateAndGenerateUrlIdentifier]);


  return (
    <>
      <Head>
        <title>Simple Shortening URL App</title>
      </Head>
      <Stack flexDirection='column' justifyContent='center' height='100vh' width='100vw' padding='40px'>
        <Stack width='100vw' flexDirection='row' justifyContent='center'>
          <TextField
            id='shortening-input'
            label='URL'
            error={Boolean(errorMessage)}
            sx={{
              width: '800px',
            }} 
            value={originalUrl}
            onChange={(event) => {
              setOriginalUrl(event.target.value)
            }}
            helperText={errorMessage}
          />
          <Button variant='contained' type="submit" onClick={validateAndGenerateUrlIdentifier} disabled={isLoading}>Shorten</Button>
        </Stack>
        <Stack 
          flexDirection='row'
          justifyContent='center'
          sx={{
            margin: '20px'
          }}
        >
          {isLoading? <Typography>Generating...</Typography>: null}
          {shortenedUrl ? (
            <a href={shortenedUrl} target='_blank' rel='noopener noreferrer'>
              <Typography>
                {shortenedUrl}
              </Typography>
            </a>
          ): null}
        </Stack>
      </Stack>
    </>
  )
}

export default ShorteningURLPage