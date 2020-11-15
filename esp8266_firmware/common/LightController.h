#pragma once
#include "./storage.h"

#define TXDR 14 // R
#define TXDG 12 // G
#define TXDB 13 // B

class LightController {
  public:
    void parse (const char * status) {
      stateStorage.writeString(status);
      char * s_status = strdup(status);
      enabled = atoi(strtok(s_status, ":"));
      char * colors_str = strtok(NULL, ":");
      colors_count = atoi(strtok(NULL, ":"));
      char * colors_strings_arr[colors_count];
      char * color = strtok(colors_str, "|");
      for (int i =0; i<colors_count; i++) {
        colors_strings_arr[i] = color;
        color = strtok(NULL, "|");
      }
      for (int i =0; i<colors_count; i++) {
        colors[i][0] = atoi(strtok(colors_strings_arr[i], "/"));
        colors[i][1] = atoi(strtok(NULL, "/"));
        colors[i][2] = atoi(strtok(NULL, "/"));
      }
    }

    LightController () {
      parse(stateStorage.readString().c_str());
    }

    void setup () {
      pinMode(TXDR, OUTPUT);
      pinMode(TXDG, OUTPUT);
      pinMode(TXDB, OUTPUT);
      analogWriteRange(255);
    }
    
    void loop () {
      if (colors_count > 0) {
        analogWrite(TXDR, colors[0][0] * enabled);
        analogWrite(TXDG, colors[0][1] * enabled);
        analogWrite(TXDB, colors[0][2] * enabled);
      }
    }

  private:
    Storage stateStorage{100, 100};
    int enabled = 0;
    int colors[5][3];
    int colors_count = 0;
};

LightController lightController;
