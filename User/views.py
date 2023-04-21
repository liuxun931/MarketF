from django.shortcuts import redirect

# import django views
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

# import permissions
from Fmarket.views import MyPermRequireMixin
from django.contrib.auth.mixins import LoginRequiredMixin

# import hasher
from django.contrib.auth.hashers import make_password, check_password

# import models
from User.models import EndUser
from Order.models import Order

#import forms
from User import forms

# Create your views here.


# --------------------Fmarket view----------------------------------


class UserList(MyPermRequireMixin, TemplateView, ):
    permission_required = ('User.view_enduser', )

    template_name = 'User/user_list.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = EndUser.objects.order_by('pk')[:20]
        return context

class UserHome(LoginRequiredMixin, TemplateView,):
    permission_required = ('', )
    template_name = 'User/home.html'
    
    def get_context_data(self, **kwargs):
    #user score
    #user recesent orders
    #order to contribute scores
        context = super().get_context_data(**kwargs)
        context['enduser'] = EndUser.objects.filter(pk = self.request.user.enduser.pk)[0]
        context['orders'] = Order.objects.filter(orderer = context['enduser'].pk )
        context['orders_up1'] = Order.objects.filter(up1 = context['enduser'].pk )
        context['orders_up2'] = Order.objects.filter(up2 = context['enduser'].pk )
        
        return context

class UserEdit(MyPermRequireMixin, UpdateView):
    permission_required = ('User.change_enduser', )
    login_url = '/accounts/login/'

class UserCreate(MyPermRequireMixin, CreateView):
    permission_required = ('User.add_enduser', )
    model = EndUser
    form_class = forms.UserCreateForm
    template_name = 'User/create.html'
    success_url = '/User/list/'
    
    def post(self, request, *args, **kwargs):
        #  'make_password' to make 'password' in request.POST from raw string format to harsh.
        request.POST = request.POST.copy()
        request.POST['password'] = make_password(request.POST['password'])
        return super(UserCreate, self).post(request, **kwargs)
        
# --------------------end Fmarket view----------------------------------



