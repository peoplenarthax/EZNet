import Datagram from './Datagram';

class DatagramFactory {
  constructor() {
    this.nextId = 0;
  }
  createICMP(source, destination) {
    const ICMPPackage = new Datagram({
      id: this.nextId++,
      source,
      destination,
      data: {
        type: 'PING',
      },
    });

    return ICMPPackage;
  }
}
