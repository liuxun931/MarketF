#import models
from User.models import EndUser
from Order.models import Order
from Product.models import Products
from Ship.models import Shipment, ShippingAddress

# import view class
from django.views.generic.base import TemplateView, View
from django.views.generic import ListView

# import python lib
import json,time

#import auth
from Fmarket.views import MyPermRequireMixin


# Create your views here.


class Dashboard(MyPermRequireMixin, TemplateView):
    permission_required = ('User.view_enduser', )
    template_name = 'Dashboard/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = EndUser.objects.order_by('pk')[:20]
        return context
    pass
