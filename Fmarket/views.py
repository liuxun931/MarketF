# import response
from django.shortcuts import HttpResponse, render, redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.http import JsonResponse  # for  Ajax form

#import models
from User.models import EndUser
from Order.models import Order
from Product.models import Products
from Ship.models import Shipment, ShippingAddress

# import view class
from django.views.generic.detail import DetailView, SingleObjectMixin
from django.views.generic.base import TemplateView, TemplateResponseMixin, View
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

# import python lib
import json,time
#import django auth
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import authenticate,login,logout

# Create your views here.

#  -----------------------------------------------Customize PermissionRequiredMixin '/' ------------------------------------------------
class MyPermRequireMixin(PermissionRequiredMixin):
    login_url = '/accounts/login/'
    def handle_no_permission(self):
        return redirect('/accounts/permission_error/')


#  -----------------------------------------------set root '/'  to  /Fmaket/ ------------------------------------------------
# used in MarketF : redirect '/' to /Fmarket/
@login_required
def index(request):
    return redirect('/Portal/')
    
#  -----------------------------------------------Fmarket MAINPAGE '/' ------------------------------------------------
class MainPage(LoginRequiredMixin,TemplateView):
    '''
        better: if self.request.user.is_anoyomous
    '''
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        self.template_name = 'Fmarket/main_buyer.html'
        if self.request.user.is_superuser:
            self.template_name = 'Fmarket/main.html'
        else:
            try:
                if self.request.user.enduser.is_staffuser:
                    print(self.request.user.enduser.is_staffuser)
                    self.template_name = 'Fmarket/main.html'
                else:
                    print('this is not staffuser')
                    try:
                        if self.request.user.enduser.is_seller:
                            self.template_name = 'Fmarket/main_seller.html'
                        else:
                            print('this is not staffuser')
                    except:
                        pass    
            except:
                pass
        try:
            context['enduser'] = self.request.user.enduser
        except:
            print(context['enduser'])
        if context['enduser'] == 'AnonymousUser':
            context['enduser'] = ''

        return context


class LogoutView(LoginRequiredMixin,View):
    def get(self,request):
        logout(request)
        return redirect('/Portal/')

class PermissionError(LoginRequiredMixin, TemplateView):
    template_name = 'Fmarket/permission_error.html'

# -------------------------------------------Portal VIEWS------------------------------------------------------


class PortalView(TemplateView):
    template_name = 'Portal/portal.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = Products.objects.all()[0:3]
        
        return context
