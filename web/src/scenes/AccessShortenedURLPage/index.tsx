import React from 'react'
import { useRouter } from 'next/router'

import configuration from '@/configuration'
import ShorteningURLPage from '../ShorteningURLPage'

const AccessShortenedURLPage: React.FC = () => {
  const router = useRouter()
  const identifier = router?.query?.identifier

  // Get original URL from unique code or identifier
  React.useEffect(() => {
    if (identifier) {
      const redirectToOriginalUrl = async () => {
        const payload = await fetch(configuration.API_BASE_URL + '/services/access-shortened-url', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identifier,
          })
        }).then(response => response.json())
    
        router.push(payload.original_url)
      }

      redirectToOriginalUrl()
    }
  }, [identifier])

  // Nothing to render, even better we could put loading screen for better user feedback
  if (identifier) {
    return <></>
  }

  return <ShorteningURLPage />
}

export default AccessShortenedURLPage