import {clearCurrentConsole, addRoute, sendPing} from '../actions/consolesActions';
import {generateCommands} from '../commands/generalCommands';

const ConsoleService = (terminal, dispatch) => {

  const onClearConsole = () => {
    dispatch(clearCurrentConsole(terminal))
  };

  const addRouteToTable = (commandParameters) => {
    const {fxArguments} = commandParameters;

    dispatch(addRoute(terminal, fxArguments[0]))
  };

  const ping = (commandParameters) => {
    const { fxArguments} = commandParameters;

    dispatch(sendPing(terminal, fxArguments[0]))
  };

  const commandBinds = [
    {command: 'clear', callback: onClearConsole},
    {command: 'ping', callback: ping},
    {command: 'route', callback: addRouteToTable},
  ];

  return generateCommands(commandBinds);
}


export default ConsoleService;
