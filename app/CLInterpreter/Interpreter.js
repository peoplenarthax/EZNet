const OPTIONS_POSITION = {
	SHORTNAME: 0,
	DESCRIPTION: 1,
	VALUE_TYPE: 2,
	DEFAULT: 3,
	NUMBER_VALUES: 4
};

export default class Interpreter {
	constructor() {
		this.commands = {
			help: {
				options: [ {
					shortName: 'e',
					description: 'Easter egg here',
					fullName: 'easter',
					defaultValue: false,
					numberOfArguments: 0
				} ],
				man: 'Do you need help?',
				arguments: 0,
				callback: this.helpCallback.bind( this )
			}
		};
	};

	/* setTerminal( terminalId ) {
		this.terminalId = terminalId;
	}*/
	setCommands( commands ) {
		this.commands = Object.assign( {}, this.commands, commands );
	}

	helpCallback( parameters ) {
		const {
			easter
		} = parameters.options;

		let helpText = '';
		Object.keys( this.commands ).forEach( command => {
			helpText += `-Command '${command}'\n
      Description:\n
      ${this.commands[command].man}\n
      ${this.commands[command].options.length > 0 ? 'Options:':''}
      `;
			const options = this.commands[ command ].options;
			options.forEach( option => {
				helpText += `${option.fullName}  ${option.description} Default: ${option.defaultValue}\n`;
			} )
		} );

		if ( easter ) {
			helpText += 'EASTER IS HEREEEE';
		}

		return helpText;
	}

	readCommand( commandLineText ) {
		const trimmedCL = commandLineText.replace( /\s\s+/g, ' ' ).trim();
		let response = 'Command doesn\'t exist, write "help"';
		if ( trimmedCL ) {
			const splittedCL = commandLineText.split( ' ' );
			const currentCommandIndex = 0;
			const command = this.commands[ splittedCL.splice( 0, 1 ) ];


			if ( command ) {
				try {
					const parameters = this.readArguments( splittedCL, command.options );

					if ( parameters && parameters.fxArguments && parameters.fxArguments.length > command.arguments ) {
						throw 'TOO MANY ARGUMENTS';
					}
					//parameters.terminal = this.terminalId;
					console.log( parameters );
					response = command.callback( parameters );

				} catch ( e ) {
					response = e;
				}
			}
		}

		return response;
	}

	readArguments( argumentArray, options ) {
		let callbackParameters = {
			fxArguments: [],
			options: {}
		};
		const defaultOptions = this.generateDefaultOptions( options );

		if ( argumentArray.length > 0 ) {
			let currentArgumentIndex = 0;

			while ( currentArgumentIndex < argumentArray.length ) {
				const option = this.findOption( argumentArray[ currentArgumentIndex ], options );
				if ( option ) {
					const optionValues = [];
					const numberOfArguments = option.numberOfArguments;

					callbackParameters.options[ option.fullName ] = [];
					if ( argumentArray[ currentArgumentIndex + numberOfArguments ] ) {
						for ( let i = 1; i <= numberOfArguments; i++ ) {
							optionValues.push( argumentArray[ currentArgumentIndex + i ] );
						}

						callbackParameters.options[ option.fullName ] = optionValues;
						currentArgumentIndex += numberOfArguments;
					} else {
						throw 'ERROR';
					}
				} else {
					callbackParameters.fxArguments.push( argumentArray[ currentArgumentIndex ] );
				}

				currentArgumentIndex += 1;
			}
		}

		callbackParameters.options = Object.assign( {}, defaultOptions, callbackParameters.options );
		return callbackParameters;
	}

	generateDefaultOptions( options ) {
		const defaultOptions = {};

		options.forEach( option => {
			defaultOptions[ option.fullName ] = option.defaultValue;
		} );

		return defaultOptions;
	}

	findOption( possibleOption, options ) {
		return options.find( ( option ) => {
			const differentArgumentNames = [
				`-${option.shortName}`,
				`--${option.fullName}`,
				`${option.fullName.toUpperCase()}`
			];
			return differentArgumentNames.includes( possibleOption );
		} );
	}

}
