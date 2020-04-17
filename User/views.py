from django.shortcuts import render
# import views
from django.views.generic.base import TemplateView, TemplateResponseMixin, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView, ProcessFormView, FormMixin
# import hasher
from django.contrib.auth.hashers import make_password, check_password
# import models
from User.models import EndUser
from Order.models import Order
#import forms
from User import forms

# Create your views here.


#class UserOrders(LoginRequiredMixin, TemplateView, TemplateResponseMixin):
    #login_url = '/accounts/login/'
    #template_name = 'Fmarket/customers.html'

    #def get_context_data(self, **kwargs):
        #context = super().get_context_data(**kwargs)
        #context['object_list'] = EndUser.objects.order_by('pk')[:5]
        #context['order_list'] = Order.objects.order_by('-orderdate')[:10]
        #return context

class UserList(LoginRequiredMixin, TemplateView, TemplateResponseMixin):
    login_url = '/accounts/login/'
    template_name = 'User/user_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = EndUser.objects.order_by('pk')[:20]
        return context


class UserEdit(LoginRequiredMixin, UpdateView):
    pass


class UserCreate(LoginRequiredMixin, CreateView):
    model = EndUser
    form_class = forms.UserCreateForm
    template_name = 'User/create.html'
    success_url = '/User/list/'
    
    def post(self, request, *args, **kwargs):
        #  'make_password' to make 'password' in request.POST from raw string format to harsh.
        request.POST = request.POST.copy()
        request.POST['password'] = make_password(request.POST['password'])
        #print(request.POST['password'] )
        return super(UserCreate, self).post(request, **kwargs)
