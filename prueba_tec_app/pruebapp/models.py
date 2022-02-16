from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.

class Conversiones (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monto_uf = models.DecimalField(null=False, max_digits=20, decimal_places=5)
    monto_clp=models.IntegerField(null=False)
    tasa=models.DecimalField(null=False, max_digits=20, decimal_places=5,default=0)
    fecha_conversion=models.DateField(null=False)
    fecha_operacion=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    is_active=models.BooleanField(default=True)