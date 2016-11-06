import serial
import time
import threading
import requests
import json

class SerialPortManager:
    
    def __init__(self):
        self.port = serial.Serial('/dev/ttyMCC',115200,timeout=1)

    def write(self, message):
        print("Writing data to serial port: " + message)
        self.port.write(message)
        self.port.flushOutput()

    def readx(self):
        return self.port.readline()

    def close(self):
        return self.port.close()



runSerialThread = True
serialMgr = SerialPortManager()

def read_from_port(serial_port):
    while runSerialThread:
        measurement = serial_port.readx()
        if measurement:
	    print("Read from serial port: " + measurement)

	    headers = {'content-type': 'application/json'}
	    payload = {'sensorId': '1', 'timestamp': '2016-09-04T08:00:00.000Z', 'measurement': measurement}
	    r = requests.post("http://172.18.2.173:3000/api/update/measurements", headers=headers, data=json.dumps(payload))
	    print(r.text)
            
    serial_port.close()


serialthread = threading.Thread(target=read_from_port, args=(serialMgr,))
serialthread.daemon = True
serialthread.start()
print("Serial thread started. Press Ctrl+C to close it.")

while True:
    try:
        time.sleep(1)
    except KeyboardInterrupt:
        print("Closing the connection")
        runSerialThread = False
        serialthread.join()
        exit(0)

