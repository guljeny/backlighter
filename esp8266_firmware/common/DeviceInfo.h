#pragma once
#include <string.h>

class DeviceInfo {
  public:
    char *ssidName = (char*)malloc(39);
    char *uid = (char*)malloc(68);

    DeviceInfo () {
      char chipId[33];
      char coreId[33];
      ultoa(ESP.getChipId(), chipId, 10);
      ultoa(ESP.getFlashChipId(), coreId, 10);
      strcat(ssidName, "Lamp-");
      strcat(ssidName, chipId);
      strcat(uid, chipId);
      strcat(uid, coreId);
    }
};

DeviceInfo deviceInfo;
