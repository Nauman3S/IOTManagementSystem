
import paho.mqtt.client as mqtt  # import the client
import datetime
import time
import os.path
from config import *
import re
import os
import subprocess
import py_compile
import uuid
import threading
from systemData import *
############


import random
import string

macAddressGlobal=""

def upgradeDeviceOS():
    cwd = os.getcwd()
    print(cwd)
    result = subprocess.run(['sh', './home/pi/RPiClient/upgradeOS.sh', '&'],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def checkFirmwareSyntax():
    print("checking FW for potential breaking syntax errors")
    # python -m py_compile fw.py

   # cwd = os.getcwd()
   # print(cwd)
    #result=subprocess.run(['python3', '-m','py_compile', cwd+'/fw.py'], stdout=subprocess.PIPE)
    # g=result.stdoutdecode('utf-8')

    g = ""
    try:
        g = py_compile.compile('fw.py')
    except Exception as e:
        print(e)

        return e
    print('------------')
    print(g)
    print('------------')
    if(g == None):
        return "error while compiling"
    else:
        return "no error"
    # return errV

def genMACAddress():
    mac = ''.join(re.findall('..', '%012x' % uuid.getnode()))
    g=open('mac.address','w')
    g.write(mac)
    g.close()


def getMACAddress():
    global macAddressGlobal
    return macAddressGlobal

if(os.path.exists('mac.address')):
    m=open("mac.address",'r')
    macAddressGlobal=m
    m.close()
else:
    genMACAddress()
    m=open("mac.address",'r')
    macAddressGlobal=m
    m.close()

print(getMACAddress())


def get_random_string():
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(16))
    print("Random string of length", 16, "is:", result_str)


def storeUpdateFile(content):
    g = open('/home/pi/RPiClient/fw.py', 'w')
    g.write(content)
    g.close()
    # print(checkFirmwareSyntax())
    if(checkFirmwareSyntax() == 'no error'):
        print('compiled with no errors')


def on_message(client, userdata, message):
    msg = str(message.payload.decode("utf-8"))
    topic = str(message.topic)
    print('details:::::'+topic+";;;"+msg)
    if("iotm-sys/device/firmware/all" in topic):
        print(msg)
        print('storing the fw')
        storeUpdateFile(msg)
    if("iotm-sys/device/firmware/"+getMACAddress() in topic):
        print(msg)
        print('storing the fw')
        storeUpdateFile(msg)
    elif("iotm-sys/device/osug/"+getMACAddress() in topic):
        print(msg)
        upgradeDeviceOS()
    elif("iotm-sys/device/osug/all" in topic):
        print(msg)
        upgradeDeviceOS()

    print("message received ", str(message.payload.decode("utf-8")))
    print("message topic=", message.topic)
    print("message qos=", message.qos)
    print("message retain flag=", message.retain)
########################################

def on_connect(client, userdata, flags, rc):
    print("Connected flags" + str(flags) + "result code " + str(rc))
    print("Subscribing to the topics")
    client.subscribe("iotm-sys/device/firmware/all")
    client.subscribe("iotm-sys/device/firmware/"+getMACAddress())
    client.subscribe("iotm-sys/device/osug/all")
    client.subscribe("iotm-sys/device/osug/"+getMACAddress())

broker_address = "44.195.192.158"  # private mqtt broker
print("creating new instance")
client = mqtt.Client(get_random_string())  # create new instance
client.on_message = on_message  # attach function to callback
client.on_connect = on_connect  # attach function to callback
print("connecting to broker")
client.connect(broker_address)  # connect to broker
# client.loop_start()  # start the loop
print("Subscribing to the topics")
client.subscribe("iotm-sys/device/firmware/all")
client.subscribe("iotm-sys/device/firmware/"+getMACAddress())
client.subscribe("iotm-sys/device/osug/all")
client.subscribe("iotm-sys/device/osug/"+getMACAddress())


client.loop_start()  # start mqtt thread


def publishDeviceInfo(name):
    global client
    while 1:
        try:
            client.publish("iotm-sys/device/info/"+getMACAddress(),
                    parsedSystemData())
        except Exception as e:
            print(e)
        time.sleep(10)

x = threading.Thread(target=publishDeviceInfo, args=(1,),daemon=True)
x.start()
def loopFunc():
    global client
    # client.loop()
    d = 0
    # client.publish("iotm-sys/device/info/response/" +
    #                getMACAddress(), 'info here')


while 1:
    loopFunc()
