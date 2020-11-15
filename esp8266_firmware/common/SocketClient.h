#pragma once
#include <iostream>
#include <functional>
#include <SocketIoClient.h>
#include <ESP8266httpUpdate.h>
#include "../device_type.h"
#include "../version.h"
#include "./WifiController.h"
#include "./Owner.h"
#include "./DeviceInfo.h"
#include "./LightController.h"

class SocketClient {
    public:
        SocketClient () { }

        void connect () {
          webSocket.begin("195.2.93.153");
          /* webSocket.begin("192.168.100.114", 3000); */
          webSocket.on("connect", startConnection);
          webSocket.on("DEVICE:VERIFY_OWNER", verifyOwner);
          webSocket.on("DEVICE:SET_STATE", setDeviceStatus);
          webSocket.on("DEVICE:UPDATE_FIRMWARE", updateFirmware);
        }

        void disconnect () {
          Serial.println("call socket disconnect");
          webSocket.disconnect();
        }

        void loop () {
          webSocket.loop();
        }

    private:
      SocketIoClient webSocket;

      std::function<void (const char * payload, size_t length)> verifyOwner = [&](const char * enable, size_t length) {
        if (!owner.confirmed) {
          webSocket.emit("DEVICE:VERIFY_ME");
          owner.confirm();
        }
      };

      std::function<void (const char * payload, size_t length)> startConnection = [&](const char * enable, size_t length) {
        char data[200] = "{\"uid\":\"";
        strcat(data, deviceInfo.uid);
        strcat(data, "\",\"version\":\"");
        strcat(data, version);
        strcat(data, "\",\"deviceType\":\"");
        strcat(data, DEVICE_TYPE);
        strcat(data, "\"}");
        webSocket.emit("DEVICE:CONNECT", data);
      };

      std::function<void (const char * payload, size_t length)> updateFirmware = [&](const char * enable, size_t length) {
        char url[30] = "/esp8266/last/";
        strcat(url, DEVICE_TYPE);
        /* ESPhttpUpdate.update("192.168.100.114", 3000, url); */
        ESPhttpUpdate.update("195.2.93.153", 80, url);
      };

      std::function<void (const char * payload, size_t length)> setDeviceStatus = [&](const char * payload, size_t length) {
        lightController.parse(payload);
      };
};

SocketClient socketClient;
