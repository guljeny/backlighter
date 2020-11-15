#pragma once
#include <iostream>
#include <functional>

class Timer {
    public:
        Timer (int to, std::function<void()> fn) {
          timeTo = millis() + to;
          callBackFunc = fn;
        }

        void tick () {
          if (timeTo < millis() && !callbacked) {
            callBackFunc();
            callbacked = true;
          }
        }

        void stop () {
          callbacked = true;
        }

        Timer () {
          callbacked = true;
        };

    private:
      int timeTo = 0;
      bool callbacked = false;
      std::function<void()> callBackFunc = nullptr;
};
