# Generated by Django 4.0.1 on 2022-02-12 17:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pruebapp', '0002_alter_conversion_factor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversiones',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('monto_uf', models.DecimalField(decimal_places=5, max_digits=20)),
                ('monto_clp', models.DecimalField(decimal_places=5, max_digits=20)),
                ('fecha_conversion', models.DateField()),
                ('fecha_operacion', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Conversion',
        ),
        migrations.DeleteModel(
            name='Moneda',
        ),
    ]
