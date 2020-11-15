#include "./common/Timer.h"
#include "./common/Storage.h"
#include "./common/WiFiController.h"
#include "./common/PowerOnCounter.h"
#include "./common/ConnectionServer.h"
#include "./common/Owner.h"
#include "./common/socketClient.h"
#include "./common/LightController.h"

PowerOnCounter powerOnCounter;

void setup() {
  Serial.begin(115200);
  Serial.println("run at 115200");
  powerOnCounter.handleNewEnable();
  lightController.setup();
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
  lightController.loop();
}
