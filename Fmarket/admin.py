from django.contrib import admin

from User.models import EndUser
from Order.models import Order,OrderStatus
from Product.models import Products
from Ship.models import Shipment, ShippingAddress
from Pay.models import Payment
from Cart.models import Cart

# Register your models here.

admin.site.empty_value_display = '-empty-'


from .import models 

# admin.site.register(EndUser)
# admin.site.register(Order)
admin.site.register(OrderStatus)
admin.site.register(Payment)
admin.site.register(Products)
admin.site.register(ShippingAddress)
admin.site.register(Shipment)
# admin.site.register(Cart)

@admin.register(EndUser)
class EndUserAdmin(admin.ModelAdmin):
    exclude = ('password','first_name','last_name',)
    list_display = ('username', 'score','score_id', 'last_login','mp','date_joined',)
    list_editable = ('score_id', 'mp', 'score',)
    list_filter = ('is_staff', 'groups')
    list_max_show_all = 50
    list_per_page = 50

    
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = 'orderdate'
    empty_value_display = '-empty-'
    list_display = ('orderer', 'cost','orderdate', 'payment_type',)
    list_max_show_all = 50
    list_select_related = ('orderer',)
    
        
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    date_hierarchy = 'adddate'
    empty_value_display = '-empty-'
    list_display = ('cartid', 'user', 'products', 'quantity', 'adddate')
    list_max_show_all = 50
    list_select_related = ('user','products')