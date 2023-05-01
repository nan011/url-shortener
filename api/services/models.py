from django.db import models

# Create your models here.
class ShortenedURL(models.Model):
    identifier = models.TextField(primary_key=True)
    original_url = models.TextField()
