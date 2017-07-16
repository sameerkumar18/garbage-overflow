// Depends on the following Arduino libraries:
// - Adafruit Unified Sensor Library: https://github.com/adafruit/Adafruit_Sensor
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Servo.h>

int num_array[10][7] = {  { 1,1,1,1,1,1,0 },    // 0
                          { 0,1,1,0,0,0,0 },    // 1
                          { 1,1,0,1,1,0,1 },    // 2
                          { 1,1,1,1,0,0,1 },    // 3
                          { 0,1,1,0,0,1,1 },    // 4
                          { 1,0,1,1,0,1,1 },    // 5
                          { 1,0,1,1,1,1,1 },    // 6
                          { 1,1,1,0,0,0,0 },    // 7
                          { 1,1,1,1,1,1,1 },    // 8
                          { 1,1,1,0,0,1,1 }};   // 9
                            
                                       
int pins[]={3,4,5,6,7,8,12};
int t=0;
int m=0;

#define DHTPIN    2   
#define DHTTYPE           DHT11 

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

const int trigPin = 11;
const int echoPin = 10;
long duration;
int distance;
void setup() {
  dht.begin();
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(12,OUTPUT);
  pinMode(13,OUTPUT);
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  Serial.begin(9600); 
}
void loop() {
  int d=0;
  d=dist();
  dht1();
  Num_Write(d/2); 
  if(d<4){
    digitalWrite(13,HIGH);
    delay(1000);
    digitalWrite(13,LOW);
  }
  if(d>1000){
    return;
  }
  Serial.print(d);Serial.print(",");
  Serial.print(t);Serial.print(",");
  Serial.print(m);
    Serial.println("");
     delay(1000);
}
void dht1(){
    delay(delayMS);
  sensors_event_t event;  
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    return;
  }
  else {
    t=event.temperature;
  }
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    return;
  }
  else {
    m=event.relative_humidity;
}
}
int dist(){
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance= duration*0.034/2;
    return distance;
}
void Num_Write(int number) 
{
  for (int j=0; j < 7; j++) {
   digitalWrite(pins[j], num_array[number][j]);
  }
}
