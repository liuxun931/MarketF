"""
    prefix : Pay
"""

from Pay import views
from django.urls import path


urlpatterns = [
    path('', views.CheckOut.as_view(), name = 'checkout'), 
]

