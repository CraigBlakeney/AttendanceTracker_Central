document.addEventListener('deviceready', function() {
    new Promise(function (resolve) {
        bluetoothle.initialize(resolve, {request: true, statusReceiver: false});
    }).then(function(result){

        document.getElementById("startScan").addEventListener("click", startScan);
    });

    startScan();
});

var uniqueDevices = [];
var Devices = [];
var foundDevices = [];
var scanning = "false";

function startScan(){

    let params;
    console.log("Starting Scan");
    bluetoothle.startScan(startScanSuccess, startScanError, params);
    Devices = [];
}

function startScanSuccess(result) {

    if (result.status === "scanStarted") {
        console.log("Scanning");
        scanning = "true";
    }
    else if (result.status === "scanResult") {

        foundDevices.push(result.address);
    }
    setTimeout(stopScan, 1500);
}

function startScanError(result) {

    console.log(result);
    startScan();
}

function stopScan(){

    if(scanning=="true"){
        bluetoothle.stopScan(stopScanSuccess, stopScanError);
        scanning="false";
    }
    else if(scanning == "false"){
        uniqueDevices = new Set(foundDevices);
        Devices = Array.from(uniqueDevices);
        console.log(uniqueDevices);
        console.log(Devices.length);
        scanning="stopped";
        connect();
    }
}

function connect(){

        let params = {
            "address":Devices[0]
        };
        console.log("connecting");

        //for(i=0;i<Devices.length;i++) {
            bluetoothle.connect(connectSuccess, connectError, params);
        //}

}

function disconnect() {

    let params = {
        "address": Devices[0]
    };
    console.log("disconnecting");
    bluetoothle.disconnect(disconnectSuccess, disconnectError, params);
}

function disconnectSuccess(result){

    console.log(result);
    connect();
}

function disconnectError(result){

    console.log(result);
}

function stopScanSuccess(){

    console.log("Device Scan Stopped");
}

function stopScanError(){

    console.log("Error stopping scan");
}

function discoverSuccess(result){
    console.log(result);
    disconnect();
}

function discoverError(result){
    console.log(result);
}

function connectSuccess(result){
    console.log("connect function");
    console.log(result);
    if(result.status === "connected")
    {
        getDeviceServices(result.address);
    }
}

function getDeviceServices(){

    let params = {
        "address": Devices[0]
    };

    bluetoothle.discover(discoverSuccess, discoverError, params);

}

function connectError(result){

    console.log(result);
    let params = {
        "address": Devices[0]
    };

    bluetoothle.reconnect(reconnectSuccess, reconnectError, params)
}

function reconnectSuccess(result){
    console.log(result);
    if(result.status === "connected")
    {
        getDeviceServices(result.address);
    }
}

function reconnectError(result){

    //disconnect();
    console.log(result);
}
