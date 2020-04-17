"""
    Views in Order
"""

from django.urls import path

from Order.views import *

urlpatterns = [
    # all starts with prefix :  /Order/
    path('', OrderList.as_view(), name = 'mainpage'), 
    # Cutomers
    path('create/', OrderCreate.as_view()),
    path('ajax_order/', Ajax_Order,),

]
