#pragma once
#include <functional>
#include "./Timer.h"
#include "./Storage.h"

class PowerOnCounter {
    private:
      Storage enablesCountStorage{0};
      std::function<void()> resetOnCount = [&]() {
        clearEnabalesCount();
      };

      Timer resetEnablaesCount{5000, resetOnCount};

      void clearEnabalesCount () {
        enablesCountStorage.writeInt(0);
      }

    public:
        void loop () {
          resetEnablaesCount.tick();
        }
        
        void handleNewEnable () {
          const int enablesCount = enablesCountStorage.readInt() + 1;
          if (enablesCount >= 5) {
            clearEnabalesCount();
            needToReset = true;
          } else {
            enablesCountStorage.writeInt(enablesCount);
          }
        }

        bool needToReset = false;

        PowerOnCounter () {}
};
