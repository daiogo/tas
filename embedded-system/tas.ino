#define Grove_Water_Sensor A0 // Attach Water sensor to Arduino Digital Pin A0
#define LED 13 // Attach an LED to Digital Pin 13 (or use onboard LED)

int measurement = 0;

void setup() {
   Serial.begin(115200);
   pinMode(Grove_Water_Sensor, INPUT); // The Water Sensor is an Input
   pinMode(LED, OUTPUT); // The LED is an Output

}


void loop() {
   measurement = analogRead(Grove_Water_Sensor);
   if (measurement > 100) {
      Serial.println(measurement);
      digitalWrite(LED,HIGH);
      
   } else {
      digitalWrite(LED,LOW);
   }

   delay(1000);
}
