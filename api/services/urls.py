from django.urls import path

from services.views import AccessShortenedURLAPI, GenerateShortenedURLAPI


urlpatterns = [
    path(
        'shortening-url',
        GenerateShortenedURLAPI.as_view(),
        name='generate-shortened-url-api',
    ),
    path(
        'access-shortened-url',
        AccessShortenedURLAPI.as_view(),
        name='access-shortened-url-api'
    ),
]