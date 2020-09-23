#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
import traceback

from alipay.aop.api.AlipayClientConfig import AlipayClientConfig
from alipay.aop.api.DefaultAlipayClient import DefaultAlipayClient
from alipay.aop.api.FileItem import FileItem
from alipay.aop.api.domain.AlipayTradeAppPayModel import AlipayTradeAppPayModel
from alipay.aop.api.domain.AlipayTradePagePayModel import AlipayTradePagePayModel
from alipay.aop.api.domain.AlipayTradePayModel import AlipayTradePayModel
from alipay.aop.api.domain.GoodsDetail import GoodsDetail
from alipay.aop.api.domain.SettleDetailInfo import SettleDetailInfo
from alipay.aop.api.domain.SettleInfo import SettleInfo
from alipay.aop.api.domain.SubMerchant import SubMerchant
from alipay.aop.api.request.AlipayOfflineMaterialImageUploadRequest import AlipayOfflineMaterialImageUploadRequest
from alipay.aop.api.request.AlipayTradeAppPayRequest import AlipayTradeAppPayRequest
from alipay.aop.api.request.AlipayTradePagePayRequest import AlipayTradePagePayRequest
from alipay.aop.api.request.AlipayTradePayRequest import AlipayTradePayRequest
from alipay.aop.api.response.AlipayOfflineMaterialImageUploadResponse import AlipayOfflineMaterialImageUploadResponse
from alipay.aop.api.response.AlipayTradePayResponse import AlipayTradePayResponse

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    filemode='a',)
logger = logging.getLogger('')

''' see
https://blog.csdn.net/chenguihua2014/article/details/100912243/
'''


'''
# app_id = '2021000118642473'
商户UID2088621957067135


'''

"""
设置配置，包括支付宝网关地址、app_id、应用私钥、支付宝公钥等，其他配置值可以查看AlipayClientConfig的定义。
"""
alipay_client_config = AlipayClientConfig()
# alipay_client_config.server_url = 'https://openapi.alipay.com/gateway.do'
alipay_client_config.server_url = 'https://openapi.alipaydev.com/gateway.do'
alipay_client_config.app_id = '2021000118642473'
alipay_client_config.app_private_key = '''-----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAjJuZ3R5851up8MiVExZNeDv30fg7ax1S/ES7F6k5e1kfNutlEqxJqN5bUT6W2XvhsQ75O3Wedmk75hz6dtNQIcvaeSDx/XeLG60fKQ2dxpzxdRVoj/8lLTES2AvAcrsjfaoOijLJb+cnMk8IasbFs5i+WEtZYyTTrvY0LTwGNqJd8nP/V1f13GqHPYZW31jCTVondd7qhFRJv6bn4NXPtL2t2m6zOxvQvq/ksr7t0J+yMcUIOEhdWQW5ofY0gQ+U98xxOxQtT6LpJFhMmZkewedA0KLj7QLHXt5DRN2JO61XBkpUWs4MF4JpWTiigxPXRh8wQ6t8oJmzXkzU69clwQIDAQABAoIBAFPO/1QMMxjXyyBo/mpFFeH/pIQzuH7tGKSi9v1wcYGzKmbawgDyTmloN/fiHZn+PBUEPswRHGWp7fkH9sZSx+WNE2i1mWeiFHlnpDYdFpjmvQkzvIJv6yHXqUq7HneEUfA6J7Z59RVNK1DSSMsUNY0KExKfvuTYc5BK0ejQaUewdvIcCInr5azmEKnZoLvkjWu5Cy7prm9zyoDYrKx4SlZ5br5O7+9zxiFoziYtuOThY3F42kpZNIc+n/mi8UazLOUuchV8QaBBxYxtKA9JIo7iIuFLwVCErlcHJcqCZfcfsmjfYgtClcKwmfIlw1RPmam3223Aj87USyH7AzmyEdECgYEAzcE+lBhi1RKuvaxEoZN6uOaYdyzvLd3TVPmSMzcHJsoiuTdfCq1y9Gi3dswSKGs+XghNMb4HtCQes+iF3mpiSUf0o6ed5ysZI8LJn8KCerTVcpDxJD44+0UUDeq2m++9g1tQGDi9DoqK0NWEbNY5RdCUwR/EGdNV4cWL7EfjLXUCgYEArvGxLzPx3ErBGuqwywLkXYib6IBSNTA3xEsQTGBSqycYg1QPhOmsQhWijg8tLHPhmuvUklUwb22LIKT+DNKW6VetIaAU9BvnkqEdgX+3N1JQ5d1miV86hnVb5O392K0EKlqjqC06vHdEH6FEzaaYe5MqcZ6625FETc9sChQRkZ0CgYB1/INzDwzVnHIBqCBu+xAbqXfylxzMk3CVQMv6fGqobq88wKjKia3qw4W5JMqgzOalq2MAzDTEsxW8GvFxGlYkKZP6qKqenhM7c36FE1gZH0tq9/yfyOKKDBG07Uwr3W0yPxGN4jNffEif+mCGvM144GP83sdn+806uzpCkvKN5QKBgQCcQXQo3RSh1oM0L3tJWIPwpxvaRwMmTrMAuKsODNrJ1Fmos2RJKw2Y2QogKJ4Inlhbr1hme4CPhiBGQBhKC66PLKiO6BTPFD16Uj2wdQqIdxWaum3jNRNpFVnG2GtrJN4blmmmxP85Zq2KMtjpdmurtH6sjUII628+sI2nUtV+YQKBgC6JzlFDtfsmhF+qM8v51EkKKC6mVdywgvbAg0uhyHlAfdWfIwXHqQqHUuM1IEo5dg+1u+f7Ek+PUrW99Rzw00+2b1lbV+k8JI4kFCDS6KJ22rkcfRybiZ8hwGM1YV7Pg3wwK+ST93ykeLi0paSxvJxjdFLj4OYySuvbaJdqGVEm
-----END RSA PRIVATE KEY-----'''

alipay_client_config.alipay_public_key = """-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnYAwAbCLgtcxg/Y9dCS4U2nZyZdcvJl4G4cHuIIxaUIEscfdSUWwnQp/rwaU0ZjajIN/FeBPUp6h9mkYhHkz025r0ienEKSwPl8xWtADum1jiLhLeBtNZrumrP9hunOthHaFxWKVjxs5LzIIubaiCzyhPfMiCEGhVcMvjaFYwhNAS1WINS++O+IwrX0H8y3uizBlmQokFNgQQdxkt9+V3REKZV0k9EpdtT2LIMF2lGjc0H5H0fn86dg6IY3sEZRjD10aDfphDaWGmPVKAXxmfYzKJNGTCj5vYEl5oW72SenpyYC5U0vH2hl96dzywy41vn7PeX7t6VD5aRXEW2GNUQIDAQAB
-----END PUBLIC KEY-----"""


"""
得到客户端对象。
注意，一个alipay_client_config对象对应一个DefaultAlipayClient，定义DefaultAlipayClient对象后，alipay_client_config不得修改，如果想使用不同的配置，请定义不同的DefaultAlipayClient。
logger参数用于打印日志，不传则不打印，建议传递。
"""
client = DefaultAlipayClient(alipay_client_config=alipay_client_config, logger=logger)

"""
系统接口示例：alipay.trade.pay
"""
# 对照接口文档，构造请求对象

goods_list = list()
goods1 = GoodsDetail()
goods1.goods_id = "apple-01"
goods1.goods_name = "ipad"
goods1.price = 100
goods1.quantity = 2
goods_list.append(goods1)



model = AlipayTradePayModel()
model.auth_code = "282877775259787048"
model.body = "Iphone6 16G"
model.goods_detail = goods_list
model.operator_id = "yx_001"
model.out_trade_no = "20180510AB014"
model.product_code = "FACE_TO_FACE_PAYMENT"
model.scene = "bar_code"
model.store_id = ""
model.subject = "huabeitest"
model.timeout_express = "90m"
model.total_amount = 1
request = AlipayTradePayRequest(biz_model=model)

# 如果有auth_token、app_auth_token等其他公共参数，放在udf_params中
# udf_params = dict()
# from alipay.aop.api.constant.ParamConstants import *
# udf_params[P_APP_AUTH_TOKEN] = "xxxxxxx"
# request.udf_params = udf_params
# 执行请求，执行过程中如果发生异常，会抛出，请打印异常栈


response_content = None

response_content = client.execute(request)


'''
try:
    response_content = client.execute(request)
except Exception as e:
    print(traceback.format_exc())
if not response_content:
    print("failed execute")
else:
    response = AlipayTradePayResponse()
    # 解析响应结果
    response.parse_response_content(response_content)
    print(response.body)
    if response.is_success():
        # 如果业务成功，则通过respnse属性获取需要的值
        print("get response trade_no:" + response.trade_no)
    else:
        # 如果业务失败，则从错误码中可以得知错误情况，具体错误码信息可以查看接口文档
        print(response.code + "," + response.msg + "," + response.sub_code + "," + response.sub_msg)
        
        '''