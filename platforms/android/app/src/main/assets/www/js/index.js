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
        console.log(Devices);
        console.log(Devices[5]);
        scanning="stopped";
        connect();
    }
}

function connect(){

    let params = {
        "address":Devices[0]
    };

    bluetoothle.connect(connectSuccess, connectError, params);

    setTimeout(disconnect, 2000);
}

function disconnect() {

    let params = {
        "address": Devices[0]
    }

    bluetoothle.disconnect(disconnectSuccess, disconnectError, params);
}

function disconnectSuccess(result) {

    console.log(result);
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
}

function discoverError(result){
    console.log(result);
}

function connectSuccess(result){
    console.log(result);
}

function connectError(result) {
    console.log(result);
}
