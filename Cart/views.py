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
from Fmarket.views import MyPermRequireMixin

from django.utils.timezone import now


class CartView(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.view_cart', )
    def get_context_data(self, **kwargs):
        self.template_name = 'Cart/cart.html'
        context = super().get_context_data(**kwargs)
        
        context['user'] = self.request.user.enduser
        context['cart'] = Cart.objects.filter(user=self.request.user.enduser)
        self.request.session['user_id'] = 'liuxun'
        print(self.request.session['user_id'])
        
        #self.request.session['username'] = self.request.user.enduser
        return context
        
        
        
class AddtoCart(MyPermRequireMixin,TemplateView):
    pass
    
class DeletefromCart(MyPermRequireMixin,TemplateView):
    pass

class CartCheckout(MyPermRequireMixin,TemplateView):
    pass