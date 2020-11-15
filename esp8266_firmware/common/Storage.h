#pragma once
#include <EEPROM.h>
#include <string.h>

class Storage {
    public:
        Storage (int _addres, int _length = 1) {
          addres = _addres;
          length = _length;
        }

        void writeInt (int val) {
          EEPROM.begin(512);
          EEPROM.write(addres, val);
          EEPROM.commit();
        };

        void writeString (String val) {
          EEPROM.begin(512);
          for(int n = 0; n < val.length(); n++) { EEPROM.write(addres + n, val[n]); }
          for(int n = val.length(); n < length; n++) { EEPROM.write(addres + n, 0); }
          EEPROM.commit();
        };

        int readInt () {
          EEPROM.begin(512);
          return EEPROM.read(addres);
        };

        String readString () {
          String result;
          EEPROM.begin(512);
          for(int n = addres; n < addres + length; n++){
            int next = EEPROM.read(n);
            if(next && next != 255) {
              result += char(next);
            }
          }
          return result;
        };

        Storage () {};

    private:
      int addres;
      int length;
};
