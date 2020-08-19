from django import forms 
from django.forms import ModelForm

from Cart.models import Cart

class AddtoCartForm(ModelForm):

    class Meta:
        model = Cart
        fields = ['quantity',]