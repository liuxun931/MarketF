from django.shortcuts import render

# Create your views here.
import json

# import models
from Cart.models import Cart
from User.models import EndUser, UserAddr
from Order.models import Order
from Product.models import Products
from Ship.models import Shipment, ShippingAddress

# import forms
from Cart.forms import AddtoCartForm

# import view class
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, DeleteView, UpdateView

# import  auth
from Fmarket.views import MyPermRequireMixin

from django.utils.timezone import now

class CartView(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.view_cart')
    template_name = 'Cart/cart.html'
    '''
    1. 进入本人的购物车，列出本人加入购物车的产品和总价计算。（参考京东）
    2. 购物车中的增删查改（ajax or form）
    '''
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cart'] = Cart.objects.filter(user = self.request.user.enduser)
        # 设置一个空的queryset
        context['products'] = Products.objects.filter(pk = 0)
        context['items'] = tuple('')
        context['list'] = []
        
        # 获取价格
        for i in range(len(context['cart'])):
            # 用 “|” 来合并queryset
            # 获取user相关的cart->products
            context['products'] = context['products'] | Products.objects.filter(pk = context['cart'][i].products_id)
        
        k=0
        for i in range(len(context['cart'])):
            context['items'] += ((str(context['cart'][i].products) ,int(context['products'][i].unit_price), int(context['cart'][i].quantity ),k),)
            context['list'] += [k]
            k += 1
        
        # render address
        context['addrs'] = UserAddr.objects.filter(user = self.request.user.enduser)
        
        
        return context

# 接受加入购物车的post请求，处理后返回购物车页面，显示已经添加成功
class AddtoCart(MyPermRequireMixin, FormView):
    '''
        接受post加入购物车；将数据更新到数据库，之后转入购物车界面，提示已经加入成功的商品。
    '''
    permission_required = ('Cart.add_cart')
    #template_name = 'Cart/cart.html'
    model = Cart
    form_class = AddtoCartForm
    success_url = '/Cart/'

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        request.POST = request.POST.copy()
        
        # 获取用户输入的数量
        qnt = int(request.POST.get('quantity'))
        
        #获取商品名称
        product_id = request.session['product_id']
        #product1 = Products.objects.get(id = product_id)
        
        #获取用户名
        uid = request.session['user_id']
        
        # set query conditions
        conditions = {'user': uid, 'products':product_id,}

        try:
            cart = Cart.objects.filter(**conditions)
            if cart.exists():
                cart.update(quantity = (cart[0].quantity + qnt))
                # print("update cart : " + str(cart[0]))
                # print("qnt = " + str(qnt) )
                # print("products = " + str(cart[0].products) )
            else:
                # print("trying set new cart.")
                cart = Cart.objects.create(user = EndUser.objects.get(pk = uid), products=Products.objects.get(pk = product_id), quantity=qnt)
                #print("set new cart.")
        except:
            print("Add to Cart : finish in error.")
        
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

        return super(AddtoCart, self).post(request, **kwargs)
 
class DeletefromCart(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass

class CartCheckout(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass