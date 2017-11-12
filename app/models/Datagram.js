class Datagram {
  constructor({id, source, destination, data = {}}){
    this.version = '4';
    this.headerlength = '';
    this.typeOfService = 'normal';
    this.datagramLength = '';
    this.identifier = id;
    this.flags = '';
    this.TTL = 16;
    this.protocol = 'TCP';
    this.source = source;
    this.destination = destination;
    this.data = {};
  }
}

export default Datagram;
