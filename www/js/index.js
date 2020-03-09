document.addEventListener('deviceready', function() {
    new Promise(function (resolve) {
        bluetoothle.initialize(resolve, {request: true, statusReceiver: false});
    }).then(function(result){

        document.getElementById("startScan").addEventListener("click", startScan);
    });

    startScan();
});

var uniqueDevices = [];
var foundDevices = [];
var scanning = "false";

function startScan(){

    let params;
    console.log("Starting Scan");
    bluetoothle.startScan(startScanSuccess, startScanError, params);
    foundDevices = [];
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
        console.log("Devices")
        console.log(uniqueDevices);
        scanning="stopped";
    }
    // else if(scanning == "stopped"){
    //
    //     let params = {
    //         "address":"",
    //         "clearCache": true
    //     };
    //
    //     bluetoothle.discover(discoverSuccess, discoverError, params);
    // }

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