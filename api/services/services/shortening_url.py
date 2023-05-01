from hashlib import sha256

from django.db import IntegrityError

from services.models import ShortenedURL

class ShorteningURLService:
    @classmethod
    def run(cls, url: str) -> ShortenedURL:
        shortened_url_object = None
        attempt = 0
        
        while shortened_url_object is None and attempt < 10:
            attempt += 1

            # Hash the code using SHA256
            hashed_code = sha256(f'{url}{attempt}'.encode('utf-8')).hexdigest()

            # Take the first 10 characters of the hashed code as the unique code
            identifier = hashed_code[:10]

            try:
                shortened_url_object, _ = ShortenedURL.objects.get_or_create(
                    identifier=identifier,
                    original_url=url,
                )
            
            except IntegrityError:
                pass


        if shortened_url_object is None:
            raise Exception('Reach maximum attempt to generate unique URL')
        
        return shortened_url_object

