#include <SocketIoClient.h>
#include <ESP8266WiFi.h>
#include <EEPROM.h>
#include <ESP8266httpUpdate.h>
#include <ESP8266WebServer.h>
#include <string.h>
#include "./version.h"
#include "./connect_page.h"
#include "./devise_type.h"

SocketIoClient webSocket;
ESP8266WebServer server(80);

#define TXDW 16 // white
#define TXDR 14 // R
#define TXDG 12 // G
#define TXDB 13 // B

char chipId[33];
char coreId[33];

bool delayRunning = false;
unsigned long delayStart = 0;
unsigned long connectStart = 0;
char* status = "wait";


char *ssidName = (char*)malloc(39);
char *uid = (char*)malloc(68);

int enabled = 1;
int bright = 255;
int R = 255;
int G = 255;
int B = 255;

void handleRoot() {
  server.send(200, "text/html", connectPage);
}

void handleStatus() {
  server.send(200, "text/plain", status);
}

void handleFinishSetup () {
  String ssid = server.arg("ssid");
  String pass = server.arg("pass");
  saveCredentioals(ssid, pass);
  server.send(200, "text/plain", "ok");
  WiFi.softAPdisconnect(true);
  setOwner(0);
}

void handleSetup() {
  String ssid = server.arg("ssid");
  String pass = server.arg("pass");
  Serial.println("setup");
  server.send(200, "text/plain", uid);
  connectToWifi(ssid, pass);
}

void saveCredentioals(String ssid, String pass) {
  EEPROM.begin(512);
  for(int n=0; n < ssid.length(); n++){EEPROM.write(10 + n, ssid[n]);}
  for(int n=ssid.length(); n < 40; n++){EEPROM.write(10 + n, 0);}
  for(int n=0; n < pass.length(); n++){EEPROM.write(40 + n, pass[n]);}
  for(int n=pass.length(); n < 70; n++){EEPROM.write(40 + n, 0);}
  EEPROM.commit();
}

String getSsid() {
  String ssid;
  EEPROM.begin(512);
  for(int n=10; n < 40; n++){
    int next = EEPROM.read(n);
    if(next && next != 255) {
      ssid += char(next);
    }
  }
  return ssid;
}

String getPass() {
  String pass;
  EEPROM.begin(512);
  for(int n=40; n < 70; n++){
    int next = EEPROM.read(n);
    if(next && next != 255) {
      pass += char(next);
    }
  }
  return pass;
}

void setOnCount (int val) {
  EEPROM.begin(512);
  EEPROM.write(0, val);
  EEPROM.commit();
}

int getOnCount () {
  EEPROM.begin(512);
  return EEPROM.read(0);
}

void setOwner (int val) {
  EEPROM.begin(512);
  EEPROM.write(71, val);
  EEPROM.commit();
}

int getOwner () {
  EEPROM.begin(512);
  return EEPROM.read(71);
}

void saveSatatus () {
  EEPROM.begin(512);
  EEPROM.write(72, enabled);
  EEPROM.write(73, bright);
  EEPROM.write(74, R);
  EEPROM.write(75, G);
  EEPROM.write(76, B);
  EEPROM.commit();
}

void getSatatus () {
  EEPROM.begin(512);
  enabled = EEPROM.read(72);
  bright = EEPROM.read(73);
  R = EEPROM.read(74);
  G = EEPROM.read(75);
  B = EEPROM.read(76);
}

void connectToWifi(String ssid, String pass) {
  status = "wait";
  Serial.println("connectToWifi");
  connectStart = millis();
  WiFi.begin(ssid, pass);
}

void startAP () {
  Serial.println("startAP");
  WiFi.disconnect(true);
  webSocket.disconnect();
  WiFi.softAP(ssidName);
  server.on("/", handleRoot);
  server.on("/setup", handleSetup);
  server.on("/status", handleStatus);
  server.on("/finish", handleFinishSetup);
  server.begin();
}

void startConnection (const char * enable, size_t length) {
  char data[200] = "{\"uid\":\"";
  strcat(data, uid);
  strcat(data, "\",\"version\":\"");
  strcat(data, version);
  strcat(data, "\",\"deviseType\":\"");
  strcat(data, DEVISE_TYPE);
  strcat(data, "\"}");
  webSocket.emit("DEVISE_CONNECTION", data);
}

void verifyOwner (const char * enable, size_t length) {
  if (getOwner() != 255) {
    webSocket.emit("VERIFY_OWNER");
    setOwner(255);
  }
}

void updateFirmware (const char * enable, size_t length) {
  char url[30] = "/esp8266/last/";
  strcat(url, DEVISE_TYPE);
  /* ESPhttpUpdate.update("192.168.100.114", 3000, url); */
  ESPhttpUpdate.update("195.2.93.153", 80, url);
}

void setDeviseStatus (const char * status, size_t length) {
  char * s_status = strdup(status);
  Serial.print("devise status: ");
  Serial.println(s_status);
  enabled = atoi(strtok(s_status, ":"));
  bright = atoi(strtok(NULL, ":"));
  R = atoi(strtok(NULL, ":"));
  G = atoi(strtok(NULL, ":"));
  B = atoi(strtok(NULL, ":"));
  saveSatatus();
  lightControl();
}

void lightControl () {
  Serial.println(bright);
  Serial.println(enabled);
  Serial.println(R);
  Serial.println(G);
  Serial.println(B);
  analogWrite(TXDW, 255 - bright * enabled);
  analogWrite(TXDR, R * enabled);
  analogWrite(TXDG, G * enabled);
  analogWrite(TXDB, B * enabled);
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  pinMode(TXDW, OUTPUT);
  pinMode(TXDR, OUTPUT);
  pinMode(TXDG, OUTPUT);
  pinMode(TXDB, OUTPUT);
  analogWriteRange(255);

  getSatatus();
  lightControl();

  ultoa(ESP.getChipId(), chipId, 10);
  ultoa(ESP.getFlashChipId(), coreId, 10);
  strcat(ssidName, "Lamp-");
  strcat(ssidName, chipId);
  strcat(uid, chipId);
  strcat(uid, coreId);

  int onCount = getOnCount() + 1;

  String ssid = getSsid();
  String pass = getPass();
  Serial.println(ssid);
  Serial.println(pass);
  Serial.println(onCount);
  if (ssid.length() && pass.length() && onCount < 5) {
    setOnCount(onCount);
    connectToWifi(ssid, pass);
  } else {
    setOnCount(0);
    startAP();
  }

  delayStart = millis();
  delayRunning = true;
}

void loop() {
  server.handleClient();
  if (strcmp(status, "connect") == 0) {
    webSocket.loop();
  }
  if (delayRunning && millis() - delayStart > 15000) {
    setOnCount(0);
    delayRunning = false;
  }
  if (strcmp(status, "wait")==0 && WiFi.status() == WL_CONNECTED) {
    Serial.println("connected");
    Serial.println(WiFi.localIP());
    webSocket.begin("195.2.93.153");
    /* webSocket.begin("192.168.100.114", 3000); */
    webSocket.on("connect", startConnection);
    webSocket.on("VERIFY_OWNER", verifyOwner);
    webSocket.on("DEVISE_STATUS", setDeviseStatus);
    webSocket.on("UPDATE_FIRMWARE", updateFirmware);
    status="connect";
  }
  if ((strcmp(status, "wait")==0 && millis() - connectStart > 15000) || WiFi.status() == WL_CONNECT_FAILED ) {
    startAP();
    status="error";
  }
}
