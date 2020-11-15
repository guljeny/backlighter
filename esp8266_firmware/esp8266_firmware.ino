#include "./common/Timer.h"
#include "./common/Storage.h"
#include "./common/WiFiController.h"
#include "./common/PowerOnCounter.h"
#include "./common/ConnectionServer.h"
#include "./common/Owner.h"
#include "./common/socketClient.h"

#define TXDW 16 // white
#define TXDR 14 // R
#define TXDG 12 // G
#define TXDB 13 // B

PowerOnCounter powerOnCounter;

void setup() {
  Serial.begin(115200);
  Serial.println("run at 115200");
  pinMode(TXDW, OUTPUT);
  pinMode(TXDR, OUTPUT);
  pinMode(TXDG, OUTPUT);
  pinMode(TXDB, OUTPUT);
  analogWriteRange(255);
  powerOnCounter.handleNewEnable();
  if (powerOnCounter.needToReset) {
    wifiController.saveCredentioals("", "");
    owner.unconfirm();
    socketClient.disconnect();
    wifiController.disconnect();
    wifiController.startAP();
    Serial.println("Reseting.");
  } else if (wifiController.hasSavedCredentials()) {
    wifiController.connect();
    Serial.println("Connecting.");
  } else {
    wifiController.startAP();
    Serial.println("Start AP.");
  }
}

void loop() {
  powerOnCounter.loop();
  connectionServer.loop();
  wifiController.loop();
}
