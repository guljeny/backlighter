#pragma once
/* #include <functional> */
#include "./Timer.h"
#include <string.h>
#include <ESP8266WiFi.h>
#include "./Storage.h"
#include "./DeviceInfo.h"
#include "./SocketClient.h"

class WiFiController {
  public:
    WiFiController () {
      ssid = ssidStorage.readString();
      pass = passStorage.readString();
    }

    char* status = "disconnected"; // connecting/success/error

    bool hasSavedCredentials () {
      return ssid.length() && pass.length();
    }

    void saveCredentioals (String _ssid, String _pass) {
      ssidStorage.writeString(_ssid);
      passStorage.writeString(_pass);
      ssid = _ssid;
      pass = _pass;
    }

    void connect (String _ssid, String _pass) {
      status = "connecting";
      connectionDelayTimer = Timer(15000, std::bind(&WiFiController::onConnectionError, this));
      WiFi.begin(_ssid, _pass);
    }

    void connect () {
      status = "connecting";
      connectionDelayTimer = Timer(15000, std::bind(&WiFiController::onConnectionError, this));
      WiFi.begin(ssid, pass);
    }

    void disconnect () {
      WiFi.disconnect(true);
    }

    void startAP () {
      WiFi.softAP(deviceInfo.ssidName);
    }

    void stopAP () {
      WiFi.softAPdisconnect(true);
    }

    void loop () {
      connectionDelayTimer.tick();
      if (strcmp(status, "success") == 0) {
        socketClient.loop();
      }
      if (strcmp(status, "connecting") == 0 && WiFi.status() == WL_CONNECTED) {
        socketClient.connect();
        connectionDelayTimer.stop();
        status="success";
        Serial.println("Wifi connected");
      }
      if (strcmp(status, "connecting") == 0 && WiFi.status() == WL_CONNECT_FAILED) {
        Serial.println("connect to wifi failed");
        onConnectionError();
      }
    }

  private:
    Storage ssidStorage{10, 30};
    Storage passStorage{40, 30};
    String ssid;
    String pass;
    Timer connectionDelayTimer;

    void onConnectionError () {
      disconnect();
      socketClient.disconnect();
      startAP();
      status = "error";
      connectionDelayTimer.stop();
    }
};

WiFiController wifiController;
