
import paho.mqtt.client as mqtt  # import the client
import datetime
import time
from config import *
import re
import uuid
############


import random
import string
def checkFirmwareSyntax():
    print("checking FW for potential breaking errors")
    #python -m py_compile fw.py


def getMACAddress():

    # gives mac address without ':'
    mac = ''.join(re.findall('..', '%012x' % uuid.getnode()))
    return mac

print(getMACAddress())
def get_random_string():
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(16))
    print("Random string of length", 16, "is:", result_str)


def on_message(client, userdata, message):
    msg = str(message.payload.decode("utf-8"))
    topic = str(message.topic)
    print('details:::::'+topic+";;;"+msg)
    if("iotm-sys/device/firmware/all" in topic):
        print(msg)
    if("iotm-sys/device/firmware/"+getMACAddress() in topic):
        print(msg)
    elif("iotm-sys/device/firmware/"+getMACAddress() in topic):
        print(msg)
    elif("iotm-sys/device/firmware/all" in topic):
        print(msg)

    print("message received ", str(message.payload.decode("utf-8")))
    print("message topic=", message.topic)
    print("message qos=", message.qos)
    print("message retain flag=", message.retain)
########################################


broker_address = "44.195.192.158"  # private mqtt broker
print("creating new instance")
client = mqtt.Client(get_random_string())  # create new instance
client.on_message = on_message  # attach function to callback
print("connecting to broker")
client.connect(broker_address)  # connect to broker
client.loop_start()  # start the loop
print("Subscribing to the topics")
client.subscribe("iotm-sys/device/firmware/all")
client.subscribe("iotm-sys/device/firmware/"+getMACAddress())
client.subscribe("iotm-sys/device/device/osug/all")
client.subscribe("iotm-sys/device/device/osug/"+getMACAddress())


client.loop_start()  # start mqtt thread


def loopFunc():
    global client

    client.publish("iotm-sys/device/info/response/" +
                   getMACAddress(), 'info here')


while 1:
    loopFunc()
