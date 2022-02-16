from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.ConversionesCreate.as_view()),
    path('list/', views.ConversionesList.as_view()),
    path('download/', views.listresults,name='download'),

]