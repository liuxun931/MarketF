"""
    Views in Ship App
"""

from django.urls import path

from Ship.views import *

urlpatterns = [
    # prefix  /Ship/
    
    path('', ShipmentList.as_view(), name = 'Ship_List'), 
    
    path('Create', ShipmentCreate.as_view(), name = 'Ship_Create'),

]

