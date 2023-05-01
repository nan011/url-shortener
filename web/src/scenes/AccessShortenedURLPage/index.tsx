import React from 'react'
import { useRouter } from 'next/router'

import configuration from '@/configuration'

const AccessShortenedURLPage: React.FC = () => {
  const router = useRouter()
  const { identifier } = router.query

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


  return (
    <>
    </>
  )
}

export default AccessShortenedURLPage