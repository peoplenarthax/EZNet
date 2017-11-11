class Queue {
  constructor({items, signalCallback}) {
    this._queue = items? items : [];
    this.signalCallback = signalCallback
  }

  isEmpty() {
    return this.size() === 0;
  }

  enqueue(newItems) {
    if (Array.isArray(newItems)) {
    this._queue = [
      ...this._queue,
      ...newItems,
    ];
  } else {
    this._queue = [
      ...this._queue,
      newItems,
    ];
  }

    return this.signalCallback? this.signalCallback() : this.size();
  }

  dequeue() {
    if (this.isEmpty()) { return undefined; }
    const first = this._queue[0];
    this._queue = this._queue.slice(1);

    return first;
  }

  get(index) {
    return this._queue[index]
  }

  size() {
    return this._queue.length;
  }
}

export default Queue;
