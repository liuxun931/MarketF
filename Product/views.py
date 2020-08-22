# import views
from django.views.generic.base import TemplateView, View
from Fmarket.views import MyPermRequireMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView, ProcessFormView, FormMixin

# import models
from Product.models import Products,ProductImgs
from User.models import EndUser

#import forms
from User import forms

#import qrcode
import qrcode
from MarketF.settings import BASE_DIR
import os.path

# Create your views here.

# --------------------Fmarket view----------------------------------

class ProductMain(MyPermRequireMixin,TemplateView):
    permission_required = ('Product.view_products', )
    template_name = 'Product/product.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['product'] = Products.objects.order_by('pk')[:20]
        return context

class ProductCreate(MyPermRequireMixin, CreateView):
    permission_required = ('Product.add_products', )
    model = Products
    #form_class = forms.UserCreateForm
    fields = ['name', 'catalog', 'unit', 'unit_price', 'place', 'details', 'is_onsale']
    template_name = 'Product/product_create.html'
    success_url = '/Product/'

# --------------------end Fmarket view----------------------------------

# -------------------Portal  views --------------------------------

class ProductDetail(TemplateView):
    template_name = 'Product/product_detail.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # set context
        context['product'] = Products.objects.get(pk = context['pk'])
        
        # set sessions
        # context['pk'] comes from url
        self.request.session['product_id'] = context['pk']
        self.request.session['user_id'] = str(EndUser.objects.get(username = str(self.request.user.enduser)).pk)
        
        # generate qr_code to share products in wechat
        # qr_url = self.request.get_raw_uri()
        # qr_image = qrcode.make(qr_url)
        # context['qr_img'] = qr_image
        # path = os.path.join(os.path.realpath(os.path.curdir),'static\\temp')
        # qr_image.save(path + '/qr_code.jpg', "jpeg")
        
        return context
