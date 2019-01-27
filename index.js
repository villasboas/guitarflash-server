const bluetooth = require('bluetooth');
const bt = require('node-bluetooth');
const cli = require('./cli');
const prompt = require('select-prompt')
let EXIT_CONDITION = false;

const close = (reason) => {
    cli.danger(reason);
    EXIT_CONDITION = true;
}

const getDevice = (devices) => {
    return new Promise( ( resolve, reject ) => {
        devices = devices.map( item => {
            item.title = item.name;
            item.value =item.address;
            return item;
        });
        prompt('Escolha um controle:', devices)
        .on('abort', error => reject(error))
        .on('submit', address => resolve(address))
    });
}

const createConection = () => {
    const device = new bt.DeviceINQ();
    device.listPairedDevices( async(devices) => {
        if ( devices.length == 0 ) return close('Nenhum dipositivo encontrado!');
        try {
            const device = await getDevice(devices);
        } catch(e) {
            close('Erro ao conectar a um controle!');
        }        
    });
};

// Informa que iniciou o servidor
cli.info('Iniciando o servidor...');

// Liga o bluetooh do dispositivo
bluetooth.on().then( state => {
    cli.success('Bluetooh ligado com sucesso!');
    createConection();
});

// Impede o script de fechar
(function wait () {
    if (!EXIT_CONDITION) setTimeout(wait, 1000);
})();

// End of file
