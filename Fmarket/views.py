# import response
from django.shortcuts import HttpResponse, render, redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.http import JsonResponse  # for  Ajax form
#import models
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
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout

# Create your views here.

#Fmarket = Shop MainPortal
@login_required
def index(request):
    return redirect('/Fmarket/main.html')

#  -----------------------------------------------MAINPAGE '/' ------------------------------------------------
class MainPage(TemplateView):
    template_name = 'Fmarket/main.html'

class LogoutView(View):
    def get(self,request):
        logout(request)
        return redirect('/Fmarket/main.html')

# -------------------------------------------CUSTOMER VIEWS------------------------------------------------------

class CustomerTemplateView(LoginRequiredMixin, TemplateView, TemplateResponseMixin):
    login_url = '/accounts/login/'
    template_name = 'Fmarket/customers.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = EndUser.objects.order_by('pk')[:5]
        context['order_list'] = Order.objects.order_by('-orderdate')[:10]
        return context

class CustomerDetailView(DetailView):

    model = EndUser

    # def get_context_data(self, **kwargs):
        # context = super().get_context_data(**kwargs)
        # return context

class AjaxableResponseMixin:
    pass


'''





class CustomerDelete(DeleteView):
    model = Customer
    success_url = reverse_lazy('mainpage')

# -------------------------------------------OrderScore VIEWS------------------------------------------------------




#  ------------------------------------------AJAX Views--------------------------------------------

 
def ajax_index(request):
    return render(request, 'Fmarket/ajax_test.html')
     



def ajax_model(request):

    # receive orderer name -> score_id -->return: uppers' score_id in Json

    if request.method == 'POST':
        orderer = list(request.POST.getlist('orderer'))
        re_name = (Customer.objects.filter(name = orderer[0]))
        re = re_name[0].score_id
        re_up1,re_up2 = get_uplvls(re)

        up1 = Customer.objects.filter(score_id = re_up1)
        up2 = Customer.objects.filter(score_id = re_up2)

        context = {"u1":up1[0].name}, {"u2":up2[0].name}

        return HttpResponse(json.dumps(context),  content_type='application/json')         
    else:
        return HttpResponse(0)

###  get upper level customer
def get_uplvls(restr):
    if type(restr) == str:
            uplvl1 = restr[0:6]
            uplvl2 = restr[0:4]
            uplvl3 = restr[0:2]
            uplvl1 = uplvl1 + '00'
            uplvl2 = uplvl2 + '0000'
            uplvl3 = uplvl3 + '000000'
            z_hit = 0
            
            if '000000' in restr:
                return '00000000', '00000000'
            if '0000' in restr:
                return uplvl3,'00000000'
            if '00' in restr:
                return uplvl2,uplvl3
            else:
                return uplvl1,uplvl2
    else: 
        print('incorrect score_id type')


class AjaxableResponseMixin:
    """
    Mixin to add AJAX support to a form.
    Must be used with an object-based FormView (e.g. CreateView)
    """
    def form_invalid(self, form):
        response = super().form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        # We make sure to call the parent's form_valid() method because
        # it might do some processing (in the case of CreateView, it will
        # call form.save() for example).
        response = super().form_valid(form)
        if self.request.is_ajax():
            data = {
                'pk': self.object.pk,
            }
            return JsonResponse(data)
        else:
            return response


class QueryCustomerOrder(SingleObjectMixin, ListView):
    paginate_by = 2
    template_name = 'Fmarket/query_customer_order.html'
    
    
    def get(self, request, *args, **kwargs):
        self.object = self.get_object(queryset=Customer.objects.all())
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['customer'] = self.object
        context['orders'] = OrderScore.objects.filter( pk= self.object.pk)
        return context
    
    def get_queryset(self):
        return self.object.get_orderscore.all()


'''
