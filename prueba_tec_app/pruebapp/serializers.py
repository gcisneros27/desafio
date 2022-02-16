from django.contrib.auth.models import User, Group
from rest_framework import serializers

from pruebapp.models import Conversiones


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']



class ConversionesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Conversiones
        fields = ['id', 'monto_uf','monto_clp','tasa','fecha_conversion','fecha_operacion']
        read_only_fields = ['is_active']