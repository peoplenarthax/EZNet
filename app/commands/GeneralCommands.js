
export const generalCommands = {
  clear: {
    options: [],
    man: 'Clear console',
    arguments: 0,
    callback: null
  },
  route: {
    options: [ {
      shortName: 'a',
      description: 'add route',
      fullName: 'add',
      defaultValue: false,
      numberOfArguments: 0
    } ],
    man: 'Route table',
    arguments: 1,
    callback: null
  },
  ping: {
    options: [],
    man: 'Sends an ICMP packet to the passed argument',
    arguments: 1,
    callback: null
  }
}

export const generateCommands = (callbacks) => {
  let generatedCommands = {};
  callbacks.forEach(({command, callback }) => {
    generatedCommands[command] = Object.assign({}, generalCommands[command], {callback} )
  })
  return generatedCommands;
}
