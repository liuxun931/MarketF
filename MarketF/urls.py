"""MarketF URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
# import sitemap
from django.contrib.sitemaps.views import sitemap
from Fmarket.sitemap import  FmarketSitemap
# import django auth view
from django.contrib.auth import views as auth_views

from Fmarket import views

sitemaps = {
    'static': FmarketSitemap,
}

 
urlpatterns = [
    #redirects root '/'  to Fmarket app mainpage
    path(r'', views.index, name = 'index'), 
    
    # admin path
    path('admin/', admin.site.urls),
    
    # app path / URLconf
    path('Fmarket/', include('Fmarket.urls')),
    path('User/', include('User.urls')),
    path('Product/', include('Product.urls')),
    path('Order/', include('Order.urls')),
    path('Ship/', include('Ship.urls')),
    path('Cart/', include('Cart.urls')),

    path('DashBoard/', include('DashBoard.urls')),
    #path('Pay/', include('Pay.urls')),
    path(r'Portal/', views.PortalView.as_view(),),
    
    # sitemap path
    # path(r'accounts/', include('allauth.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'), 
    
    # django-allauth path
    path('accounts/login/', auth_views.LoginView.as_view(template_name='Fmarket/login.html')),
    path('accounts/logout/', views.LogoutView.as_view(), ),
    path('accounts/permission_error/', views.PermissionError.as_view(), ),
    path('accounts/profile/', views.PortalView.as_view(),),
    path('accounts/', include('django.contrib.auth.urls'), ),
]
