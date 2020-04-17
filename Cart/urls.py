"""
    Views in Fmarker App
"""

from django.urls import path
# from Fmarket.views import MainPage, CustomerList, CustomerCreate, CustomerUpdate, CustomerUpone
from Fmarket.views import *

urlpatterns = [
    # MainPage
    path('main.html', MainPage.as_view(), name = 'mainpage'), # redirect to 'Customer'
    path('', MainPage.as_view(), name = 'mainpage'), # redirect to 'Customer'
    # Cutomers
    path('Customer', CustomerTemplateView.as_view()),

]

'''
    path('CustomerCreate', CustomerCreate.as_view()),
    path('Customer/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('Customer/Update/<int:pk>/', CustomerUpdate.as_view(), ),
    path('Customer/Delete/<int:pk>/', CustomerDelete.as_view(), ),

    # OrderScore
    path('OrderScoreCreate', OrderScoreCreate.as_view()),
    path('OrderScoreList', OrderScoreListView.as_view()),
    path('OrderScore/<int:pk>/', OrderScoreDetail.as_view()),
    
    #ajax_
    path('ajax_test', ajax_index, name = 'ajax_index'),
    path('ajax_re', add_ajax,name='results'),
    path('ajax_model', ajax_model,name='ajax_model'),
    
    #query
    path('querycustomerorders/<int:pk>/', QueryCustomerOrder.as_view(),name='results'),
    path('querycustomerorders/', OrderScoreListTableView.as_view(),name='tableview'),
    # path('query-period-Orders', add_ajax,name='results'),
    # path('customer-tree', add_ajax,name='results'),
    # path('statistic-diagram', add_ajax,name='results'),
'''
