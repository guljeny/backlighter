#pragma once
#include <string.h>
#include <ESP8266WebServer.h>
#include "../connect_page.h"
#include "./WifiController.h"
#include "./DeviceInfo.h"
#include "./Owner.h"

class ConnectionServer {
  public:
    ConnectionServer () {
      server.on("/", std::bind(&ConnectionServer::handleRoot, this));
      server.on("/setup", std::bind(&ConnectionServer::handleSetup, this));
      server.on("/status", std::bind(&ConnectionServer::handleStatus, this));
      server.on("/finish", std::bind(&ConnectionServer::handleFinishSetup, this));
      server.begin();
    }

    void loop () {
      server.handleClient();
    }

  private:
    ESP8266WebServer server{80};

    void handleRoot() {
      server.send(200, "text/html", connectPage);
    }

    void handleSetup() {
      String ssid = server.arg("ssid");
      String pass = server.arg("pass");
      Serial.println("setup");
      server.send(200, "text/plain", deviceInfo.uid);
      wifiController.connect(ssid, pass);
    }

    void handleStatus() {
      server.send(200, "text/plain", wifiController.status);
    }

    void handleFinishSetup () {
      String ssid = server.arg("ssid");
      String pass = server.arg("pass");
      wifiController.saveCredentioals(ssid, pass);
      server.send(200, "text/plain", "ok");
      owner.unconfirm();
      wifiController.stopAP();
    }
};

ConnectionServer connectionServer;
