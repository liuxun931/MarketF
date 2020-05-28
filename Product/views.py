from django.shortcuts import render

# import views
from django.views.generic.base import TemplateView, View
from Fmarket.views import MyPermRequireMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView, ProcessFormView, FormMixin


# import models
from Product.models import Products,ProductImgs

#import forms
from User import forms

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
        context['product'] = Products.objects.order_by('pk')[:20]
        context['img'] = ProductImgs.objects.all()[:3]
        return context
        
