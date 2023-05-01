from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from rest_framework.fields import CharField, URLField
from django.shortcuts import redirect
from services.models import ShortenedURL

from services.services.shortening_url import ShorteningURLService

class GenerateShortenedURLAPI(APIView):
    class InputSerializer(Serializer):
        url = URLField(allow_null=False, required=True)

    class OutputSerializer(Serializer):
        original_url = URLField(allow_null=False, required=True)
        identifier = CharField(allow_null=False, required=True)

    def post(self, request: Request) -> Response:
        input_serializer = self.InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        
        shortened_url_object = ShorteningURLService.run(
            url=input_serializer.validated_data.get('url')
        )

        output_serializer = self.OutputSerializer(
            data=shortened_url_object.__dict__
        )

        output_serializer.is_valid(raise_exception=True)

        return Response(data=output_serializer.data)
    
class AccessShortenedURLAPI(APIView):
    class InputSerializer(Serializer):
        identifier = CharField(allow_null=False, required=True)


    class OutputSerializer(Serializer):
        original_url = URLField(allow_null=False, required=True)
        identifier = CharField(allow_null=False, required=True)

    def post(self, request: Request) -> Response:
        input_serializer = self.InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        
        shortened_url_object = ShortenedURL.objects.filter(identifier=input_serializer.validated_data.get('identifier')).first()

        if shortened_url_object is None:
            return Exception('Identifier is not found')
        
        output_serializer = self.OutputSerializer(
            data=shortened_url_object.__dict__
        )

        output_serializer.is_valid(raise_exception=True)

        return Response(data=output_serializer.data)