#pragma once
#include "./Storage.h"

class Owner {
  public:
    Storage ownerConfirmedStorage{71};

    bool confirmed;

    Owner () {
      confirmed = ownerConfirmedStorage.readInt();
    }

    void unconfirm () {
      confirmed = false;
      ownerConfirmedStorage.writeInt(0);
    }

    void confirm () {
      confirmed = true;
      ownerConfirmedStorage.writeInt(1);
    }
};

Owner owner;
