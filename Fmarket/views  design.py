from django.shortcuts import render

# Create your views here.

class user_login(templateview):
    '''通过用户名/手机号 及密码 登录'''
    ## 固定在base页面，登录前显示请登录，登录后显示本人用户名 - jquery
    pass


class user_logout():
    ##固定在base页面; 直接使用django的logout;
    pass

class main_page():
    '''show some products'''
    #
    
class end_user_page():
    '''
    show order list of his/her own.
    show one's score
    '''
class sales_page()
    '''
    show shorter list of his/her order;
    show one's score;
    show each down lvl 1 contribute;
    '''
    
class dashboard()
    '''
    for all staff users view. overlook of all orders. 
    divided show different area, time, persons;
    data input:
        all orders in 1,2,3 month;
        person list won most scores in each area,period;
        can try to make a map based chart;
    '''


class create user()
    '''all detailed user info;
      check unique username, 用户名空则默认取手机号;
      check user's score_id_valid();
      
    '''
    
class edit_user()
    '''self edit(all info)， 检查用户名，检查手机号，检查scoreid'''
    '''edit other info (key info)'''
    '''edit log'''
    
    
class place_order()
    ''' place orders,  
    products, cost, orderer, 
    shipment_init()初始一个发货，记录收货人信息;
    '''


    
