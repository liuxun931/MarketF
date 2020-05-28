from django.shortcuts import render
#import models
#from User.models import EndUser
from Order.models import Order
from Product.models import Products
from Ship.models import Shipment, ShippingAddress
# import view class

#from django.views.generic.base import TemplateView, TemplateResponseMixin, View
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.

class ShipmentList(LoginRequiredMixin, ListView):
    model = Shipment
    queryset = Shipment.objects.all()[:10]
    login_url = '/accounts/login/'
    template_name = 'Ship/ship.html'
    
class ShipmentCreate(LoginRequiredMixin, CreateView):

    login_url = '/accounts/login/'
    model = Shipment
