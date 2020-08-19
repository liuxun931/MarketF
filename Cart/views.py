from django.shortcuts import render

# Create your views here.


# import models
from Cart.models import Cart
from User.models import EndUser
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
    def get_context_data(self, **kwargs):
        self.template_name = 'Cart/cart.html'
        context = super().get_context_data(**kwargs)
        
        context['user'] = self.request.user.enduser

        self.request.session['user_name'] = 'liuxun'

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
        print("qnt = " + str(qnt) )
        #获取商品名称
        product_id = request.session['product_id']
        #product1 = Products.objects.get(id = product_id)
        
        #获取用户名
        uid = request.session['user_id']
        
        # set query conditions
        conditions = {'user': uid, 'products':product_id,}

        try:
            cart = Cart.objects.all().filter(**conditions)
            if cart.exists():
                cart[0].quantity = int(cart[0].quantity) + int(qnt)
                cart[0].save()
                print("add to current cart.")
                print("cart quantity = " + cart[0].quantity)
                
            else:
                print("trying set new cart.")
                cart = Cart.objects.create(user = EndUser.objects.get(pk = uid), products=Products.objects.get(pk = product_id), quantity=qnt)
                print("set new cart.")
        except:
            print("finish in error.")
        
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

        return super(AddtoCart, self).post(request, **kwargs)

    # def get_context_data(self, **kwargs):
        # self.template_name = 'Cart/cart.html'
        # context = super().get_context_data(**kwargs)
        # pk = self.request.session['pk']
        # context['session_pk'] = pk

        # return context
    
class DeletefromCart(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass

class CartCheckout(MyPermRequireMixin,TemplateView):
    permission_required = ('Cart.add_cart','Cart.view_cart')
    pass