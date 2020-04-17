from django.shortcuts import render

# import views
from django.views.generic.base import TemplateView, TemplateResponseMixin, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView, ProcessFormView, FormMixin


# import models
from Product.models import Products

#import forms
from User import forms

# Create your views here.

class ProductMain(TemplateView, TemplateResponseMixin):
    template_name = 'Product/product.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['product'] = Products.objects.order_by('pk')[:20]
        return context

class ProductCreate(LoginRequiredMixin, CreateView):
    model = Products
    #form_class = forms.UserCreateForm
    fields = ['name', 'catalog', 'unit', 'unit_price', 'place', 'details', 'is_onsale']
    template_name = 'Product/product_create.html'
    success_url = '/Product/'
    
