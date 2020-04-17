from django.contrib import admin

from User.models import EndUser
from Order.models import Order,OrderStatus
from Product.models import Products
from Ship.models import Shipment, ShippingAddress
from Pay.models import Payment

# Register your models here.


from .import models 

admin.site.register(EndUser)
admin.site.register(Order)
admin.site.register(OrderStatus)
admin.site.register(Payment)
admin.site.register(Products)
admin.site.register(ShippingAddress)
admin.site.register(Shipment)


