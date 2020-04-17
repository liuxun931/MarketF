import django_tables2 as tables
from Fmarket.models import Customer, OrderScore

class OrderScoreTable(tables.Table):
    class Meta:
        model = OrderScore
        # template_name = 'Fmarket/query_table_view.html'
        fields = [
            'orderer', 
            'goods', 
            'cost', 
            'orderdate', 
            'orderer_sc', 
            'up1', 
            'up1_sc', 
            'up2',
            'up2_sc',
            ]