**Desafio Gabriel Cisneros**

El desafio se compone de dos carpetas:
    1. monedas (frontend)
    2. prueba_tec_app (backend)

---

## Para Ejecutar el Front



1. Ejecutar el comando "npm install".
2. Luego ejecutar "npm start".

Nota: La aplicacion por defecto se conecta al backend en "http://localhost:8000", se monta en algun dominio o con alguna configuracion diferente, debe modificar el archivo "monedas/src/config/config.js", especificamente la constante URL_SERVICIO

Debe tener instalado nodejs, preferiblemente la ultima version.

---
## Base de datos 

1. Debe instalar postgresql >12
2. Crear una base de datos llamada "prueba_tecnica" 


---
## Para ejecutar el backend 

Debe tener instalado python 3 y la ultima version de pip y ejecutar los siguientes comandos

1. "python -m pip install -r requirements.txt".
2. Configurar los parametros del servidor de base de datos en "prueba_tec_app/prueba_tec_app/settings.py" en la constante DATABASES, donde debe especificar host, puerto, database, user y password
3. python manage.py createsuperuser
4. "python manage.py makemigrations"
5. "python manage.py migrate".
6. "python manage.py runserver"

Si prefiere ejecutar en un virtual enviroment antes de el paso #1 ejcutar

1. python -m venv "nombre_ambiente"
2. En la ruta "nombre_ambiente/Scrips/" se encuentran los scripts para activar el ambiente segun su consola
https://docs.python.org/3/tutorial/venv.html

** Para crear usuarios ingresar a http://localhost:8000/admin con el usuario admin (el que se crea en el paso 3), para crear usuarios administradores marcar en el formulario "Superuser status" aunque con el comando #3 ya tendra administrador, solo haria falta crear un usuario normal.
---
