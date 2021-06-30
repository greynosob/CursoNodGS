const argv = require('yargs')
            .option(
                'b',{
                    alias:'base',
                    type:'number',
                    demandOption: true,
                    describe: 'base de la tabla de multiplicar'
                }
            ).option(
                'l',{
                    alias:'listar',
                    type:'boolean',
                    demandOption: false,
                    default: false,
                    describe: 'para listar tabla en pantalla'
                }
            ).option(
                    'h',{
                        alias:'hasta',
                        type:'number',
                        demandOption: false,
                        default: 10,
                        describe: 'hasta que número multiplicar'
                    }
            ).check((argv, option) => {
                if(isNaN(argv.b)){
                    throw 'La base debe ser numérica'
                }
                if(isNaN(argv.h)){
                    throw 'El límite debe ser numérico'
                }
                return true
            })
            .argv;

module.exports = argv;