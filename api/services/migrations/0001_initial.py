# Generated by Django 4.2 on 2023-05-01 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShortenedURL',
            fields=[
                ('identifier', models.TextField(primary_key=True, serialize=False)),
                ('original_url', models.TextField()),
            ],
        ),
    ]
