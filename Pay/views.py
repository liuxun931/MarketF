import json

# import models
from Cart.models import Cart
from User.models import EndUser
from Order.models import Order
from Product.models import Products
from Pay.models import Payment
from Ship.models import Shipment, ShippingAddress

# import forms
from Cart.forms import AddtoCartForm

# import view class
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, DeleteView, UpdateView

# import  auth
from Fmarket.views import MyPermRequireMixin

from django.utils.timezone import now

# Create your views here.

class CheckOut(MyPermRequireMixin, FormView, TemplateView):
    permission_required = ('Cart.view_cart')
    template_name = 'Pay/checkout.html'
    model = Payment
    form_class = AddtoCartForm
    success_url = '/Pay/'
    '''
    1. 接受购物车提交到的货物列表；
    2. 选择或输入收货地址；
    3. 提交订单到支付；
    '''
    def post(self, request, *args, **kwargs):
        form = self.get_form()
        request.POST = request.POST.copy()
        return super(CheckOut, self).post(request, **kwargs)
    
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pass
        return context
        
        
        
class Pay():
    pass

class AfterPay():
    pass