from django import forms 
from django.forms import ModelForm
from django.utils.translation import gettext_lazy as _

from Order.models import Order
from User.models import EndUser
from Product.models import Products



class OrderCreateForm(ModelForm):
    payment= forms.TextInput(attrs={'hidden': True, })
    payment_type= forms.TextInput(attrs={'hidden': True, })
    
    class Meta:
        model = Order
        fields = ['orderer', 'orderdate',  'cost', 'goods', 'order_status', 'up1', 'up1_sc', 'up2', 'up2_sc']

        widgets = {
                #'orderer':forms.Select(choices=EndUser.objects.all()),
                #'orderdate': _('SelectDateWidget'),
                #'goods': forms.SelectMultiple(choices = Products.objects.all()),
                'orderdate':forms.DateInput(attrs={'type':'date'}),
            }
        labels = {
               # 'username':   _('用户名'),
            }
        help_texts = {
            # 'username':   _('可以用中文'),
            }
        field_classes = {
            #'orderdate':  _('cxCalender'),
            }

