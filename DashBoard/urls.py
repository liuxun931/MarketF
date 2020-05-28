"""
    Views in 
"""

from django.urls import path
from DashBoard import views

urlpatterns = [
    # prefix '/Dashboard/'
    path(r'', views.Dashboard.as_view(), name ='dashboard' ),
]
