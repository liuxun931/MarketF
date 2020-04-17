# import Ajax response
from django.http import JsonResponse  # for  Ajax form
from django.shortcuts import HttpResponse
#import models
from User.models import EndUser
from Order.models import Order
from Product.models import Products
from Ship.models import Shipment, ShippingAddress
# import view class
from django.views.generic.detail import DetailView
from django.views.generic.base import TemplateView, TemplateResponseMixin, View
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
# import python lib
import json,time

#import form
from Order.forms import OrderCreateForm

# Create your views here.


class OrderList(LoginRequiredMixin, ListView):  
    queryset = Order.objects.all()[:10]
    login_url = '/accounts/login/'
    template_name = 'Order/order.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['orders'] = Order.objects.order_by('-orderdate')[:10]
        return context

class OrderCreate(LoginRequiredMixin, CreateView):
    model = Order
    form_class = OrderCreateForm
    template_name = 'Order/create.html'
    success_url = '/Order/'
    
    def post(self, request, *args, **kwargs):
        """
        get uplvl1, uplvl2 and add scores to them
        """
        form = self.get_form()
        #1. get u1,u2 names and scores
        u1 = request.POST.get('up1')
        u2 = request.POST.get('up2')

        up1_sc= request.POST.get('up1_sc')
        up2_sc= request.POST.get('up2_sc')
        
        #2. select u1 and u2 then add socres
        user1 = EndUser.objects.filter(pk = u1)[0]
        user2 = EndUser.objects.filter(pk = u2)[0]
        
        user1.score = user1.score + int(up1_sc)
        user2.score = user2.score + int(up2_sc)
        
        user1.save()
        user2.save()
        
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
        
# end Order Create

###     ajax views   
# receive ajax(orderer) ; return orderer's up1,up2
def Ajax_Order(request):
    def get_scoreID_by_name(name):
        return EndUser.objects.filter(username = name)[0].score_id

    def get_short_scoreID(scid):
        # need to know : 1. 21 numbers recored a tree structure information; 2. get an upper lvl by [:3] = '000'
        # remove '000' if it has; get short ID for  up1 by [;-3], get up2 by [:-6]
        # 1. remove surfix '000's
        while scid[-3:] == '000':
            scid = scid[:-3]
        
        # 2. continue get up lvl1-2 ID prefix
        if '000' in scid:
            if scid[-3:] == '000':
                while scid[-3:] == '000':
                    scid = scid[:3]
            else: 
                return print('found a wrong sc_id...' + scid)
        else:
        # remove last 3 numbers to get up_id
            up1_id = scid[:-3]
            up2_id = scid[:-6]
        return up1_id,up2_id    
        
    def get_true_scoreID(sid):
        # append short score_id with '000's
        while len(sid)<21:
            sid = sid + '000'
        return sid
    
    def get_enduser_by_scid(scid):
        # get up lvl user or get NULL user
        try:
            u = EndUser.objects.get(score_id = get_true_scoreID(scid))
        except:
            u =  EndUser.objects.get(pk=1)
        
        return u

    if request.method == 'POST':
        sc_id = get_scoreID_by_name(request.POST.get('orderer'))

        u1_s_id, u2_s_id = get_short_scoreID(sc_id)

        u1 = get_enduser_by_scid(u1_s_id)
        u2 = get_enduser_by_scid(u2_s_id)

        context = {"u1":u1.pk}, {"u2":u2.pk}
        return HttpResponse(json.dumps(context),  content_type='application/json')   
    else:
        return  HttpResponse(0)
        


###   end ajax 
