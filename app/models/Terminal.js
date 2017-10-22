import networkStore from '../store/networkStore';
import {addConsole} from '../actions/consolesActions';
import ConsoleService from '../services/ConsoleService';

export default ({name, type, ip}) => {
    const _type = type || 'linux';
    const _name = name || generateRandomName();
    const _ip = ip || '1.1.1.1';
    const _links = [];
    const _messages = [];
    const _commands = [];
    const _consoleService = ConsoleService(ip, networkStore.dispatch);
    const _console = {
      name,
       interpreter: _consoleService,
       commandHistory: [],
       messages: [],
       currentLine: '',
       commandHistoryIndex: -1
     };

    return {
      type: _type,
      name: _name,
      ip:_ip,
      links: _links,
      console: _console,
      messages: _messages,
      commands: _commands,
      consoleService: _consoleService,
    }

}

function generateRandomName() {
  const id = Math.floor(Math.random() * (100000));
  return `Terminal_${id}`;
}
