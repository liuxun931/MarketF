"""
    Views in User App
"""

from django.urls import path

from User import views

urlpatterns = [
    # all with prefix '/User/'
    path(r'', views.UserList.as_view(), name = 'userlist'), 
    path(r'list/', views.UserList.as_view(), name = 'userlist'), 
    path(r'create/', views.UserCreate.as_view(), name = 'usercreate'), 
    path(r'edit/', views.UserEdit.as_view(), name = 'usercreate'), 
    path(r'home/', views.UserHome.as_view(), name = 'home'),
]