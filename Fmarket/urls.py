"""
    Views in Fmarker App
"""

from django.urls import path

from Fmarket.views import *

urlpatterns = [
    #  prefix : /Fmarket/
    path('', MainPage.as_view(), name = 'mainpage'), 

]

