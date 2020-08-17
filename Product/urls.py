"""
    Views in Product App
"""

from django.urls import path
#
from Product.views import *

urlpatterns = [
    # all starts with /Product/
    path('', ProductMain.as_view(), name = 'ProductMain'), 
    path('Create/', ProductCreate.as_view()),
    path('Detail/<int:pk>/', ProductDetail.as_view()),
]

'''
    path('CustomerCreate', CustomerCreate.as_view()),
    path('Customer/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('Customer/Update/<int:pk>/', CustomerUpdate.as_view(), ),
    path('Customer/Delete/<int:pk>/', CustomerDelete.as_view(), ),

'''
