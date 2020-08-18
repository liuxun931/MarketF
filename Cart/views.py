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
    permission_required = ('Cart.view_cart')
    template_name = 'Cart/cart.html'
    def get_context_data(self, **kwargs):
        self.template_name = 'Cart/cart.html'
        context = super().get_context_data(**kwargs)
        
        context['user'] = self.request.user.enduser
        context['cart'] = Cart.objects.filter(user=self.request.user.enduser)
        
        
        self.request.session['user_id'] = 'liuxun'
        print(self.request.session['user_id'])
        
        #self.request.session['username'] = self.request.user.enduser
        return context

# 接受加入购物车的post请求，处理后返回购物车页面，显示已经添加成功
class AddtoCart(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart')
    template_name = 'Cart/AddtoCart.html'
    
    def post(self, request, *args, **kwargs):
        print(self.request)
        form = self.form(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            return HttpResponseRedirect('//')

        return render(request, self.template_name, {'form': form})
    
    
    def get_context_data(self, **kwargs):
        self.template_name = 'Cart/cart.html'
        context = super().get_context_data(**kwargs)
        pk = self.request.session['pk']
        context['session_pk'] = pk
        #self.request.session['username'] = self.request.user.enduser
        return context
    pass
    
class DeletefromCart(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass

class CartCheckout(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass