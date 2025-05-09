class Events {
  constructor() {
    this.callbacks = [];
    this.idCounter = 0;
  }

  emit(eventName, value) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName, caller, callback) {
    this.idCounter += 1;
    this.callbacks.push({
      id: this.idCounter,
      eventName,
      caller,
      callback,
    });
    return this.idCounter;
  }

  off(id) {
    this.callbacks = this.callbacks.filter((stored) => {
      return stored.id !== id;
    });
  }

  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter((stored) => {
      return stored.caller !== caller;
    });
  }
}

export const events = new Events();
