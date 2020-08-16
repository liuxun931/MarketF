from django.shortcuts import render

# Create your views here.


# import response
from django.shortcuts import HttpResponse, render, redirect
from django.urls import reverse
from django.http import JsonResponse  # for  Ajax form

#import models
from Cart.models import Cart
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
from Fmarket.views import MyPermRequireMixin


class CartView(LoginRequiredMixin,TemplateView):
    def get_context_data(self, **kwargs):
        self.template_name = 'Cart/cart.html'
        context = super().get_context_data(**kwargs)
        
        context['enduser'] = self.request.user.enduser
        return context