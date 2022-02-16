from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from rest_framework import permissions
from django.contrib.auth.models import User, Group
from pruebapp.models import Conversiones
from rest_framework import generics
from pruebapp.serializers import ConversionesSerializer, UserSerializer, GroupSerializer
import django_excel as excel
from rest_framework.permissions import IsAdminUser, SAFE_METHODS
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]



class ConversionesCreate(generics.CreateAPIView):
    queryset = Conversiones.objects.all()
    serializer_class = ConversionesSerializer
    
    def perform_create(self, serializer): 
        serializer.save( user=self.request.user)

class ConversionesList(generics.ListAPIView):
    #queryset = Dream.objects.filter(is_active=True)
    permission_classes = [IsAdminUser ]
    serializer_class = ConversionesSerializer
    # pagination_class = None
    def get_queryset(self):
        
        return Conversiones.objects.all()


from datetime import datetime
import django_excel as excel


def listresults(request):
    export = []
    # Se agregan los encabezados de las columnas
    export.append([
        'ID',
        'Fecha de conversion',
        'Fecha de operacion',
        'Monto UF',
        'Monto CLP',
        'Tasa',
    ])
    # Se obtienen los datos de la tabla o model y se agregan al array
    results = Conversiones.objects.all()
    for result in results:
        # ejemplo para dar formato a fechas, estados (si/no, ok/fail) o
        # acceder a campos con relaciones y no solo al id
        export.append([
                str(result.id),
                str(result.fecha_conversion),
                str(result.fecha_operacion),
                str(result.monto_uf),
                str(result.monto_clp),
                str(result.tasa),
                ])

    # Obtenemos la fecha para agregarla al nombre del archivo
    today    = datetime.now()
    strToday = today.strftime("%Y%m%d")

    # se transforma el array a una hoja de calculo en memoria
    sheet = excel.pe.Sheet(export)

    # se devuelve como "Response" el archivo para que se pueda "guardar"
    # en el navegador, es decir como hacer un "Download"
    return excel.make_response(sheet, "xlsx", file_name="results-"+strToday+".xlsx")