#include <SoftwareSerial.h>
#define RX 10
#define TX 11

String AP = "Sosed_2";
String PASS = "sosedneproidet";
/* String HOST = "http://arduino-signalization.herokuapp.com"; */
String HOST = "arduino-signalization.herokuapp.com";
/* String HOST = "http://192.168.1.186:3000"; */
String PORT = "80";
/* String PORT = "3000"; */
int countTimeCommand;
boolean found = false;

SoftwareSerial esp8266(RX, TX);


void setup() {
  Serial.begin(9600);
  esp8266.begin(115200);
  // sendCommand("AT", 5, "OK");
  String getData = "GET /";
  /* sendCommand("AT+CWJAP=\"" + AP + "\",\"" + PASS + "\"", 20, "OK"); */
  /* sendCommand("AT+CWMODE=1", 15, "OK"); */

  /* sendCommand("AT+CIPMUX=0", 15, "OK"); */
  /* sendCommand("AT+CIPSTART=\"TCP\",\"" + HOST + "\"," + PORT, 15, "OK"); */
  /* sendCommand("AT+CIPSEND=" + String(getData.length() + 4), 10, ">"); */
  /* sendCommand(getData, 10, "OK"); */
}
void loop() {
  if (Serial.available()) {
    esp8266.write(Serial.read());
  }
  if (esp8266.available()) {
    Serial.write(esp8266.read());
  }
}

void sendCommand(String command, int maxTime, char readReplay[]) {
  Serial.print("at command => ");
  Serial.print(command);
  Serial.println(" ");
  esp8266.println(command);
  delay(1000);
  /* while (countTimeCommand < maxTime) { */
  /*   if (esp8266.find(readReplay)) { */
  /*     found = true; */
  /*     break; */
  /*   } */
  /*   countTimeCommand++; */
  /* } */

  /* if (found == true) { */
  /*   Serial.println("Success"); */
  /*   countTimeCommand = 0; */
  /* } */

  /* if (found == false) { */
  /*   Serial.println("Fail"); */
  /*   countTimeCommand = 0; */
  /* } */

  /* found = false; */
}
