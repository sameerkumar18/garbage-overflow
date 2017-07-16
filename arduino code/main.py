
# -*- coding: utf-8 -*-
# from unittest.test.test_result import m

import serial
import time
ser = serial.Serial('COM5', 9600)
import requests

def pinger(min_d):
    while(True):
        time.sleep(1.5);
        message=str(ser.readline()[0:-2]);
        mess=message.split(",")
        d=mess[0].split("'")[1]
        t=mess[1]
        m=mess[2]
        s=0;
        if(int(d)<min_d):
            s=1
        u1="http://10.0.1.71:9080/log/alpha?m="
        url = u1+""+m.split("'")[0]+".0&t="+t+".0&s="+str(s)+"&d="+d.split("'")[0]
        r = requests.get(url)
        print (url)
        print(r)
        print(r.text)

pinger(5)