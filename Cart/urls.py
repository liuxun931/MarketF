"""

"""

from django.urls import path
from Cart import views


urlpatterns = [
    path(r'', views.CartView.as_view(), name ='cartview' ),
]
