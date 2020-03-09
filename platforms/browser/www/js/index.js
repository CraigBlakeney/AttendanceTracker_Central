document.addEventListener('deviceready', function() {
    new Promise(function (resolve) {
        bluetoothle.initialize(resolve, {request: true, statusReceiver: false});
    }).then(function(result){
        alert("Bluetooth already enabled");
    });

    startScan();
});

//document.getElementById("restart").addEventListener("click", startScanSuccess)
var foundDevices = [];

function startScan(){

    let params;
    //alert("startscan function");
    bluetoothle.startScan(startScanSuccess, startScanError, params);
    foundDevices = [];
}

function startScanSuccess(result) {

    if (result.status === "scanStarted") {
        //alert("Scanning for Devices");
    }

    else if (result.status === "scanResult") {

        console.log("debug test");
        alert("FoundDevice: " + result.address + ".");
        foundDevices.push(result.address);
    }
}

function startScanError(result) {

    //alert("Scanning failed");
    startScan();
}

function addDevice(name, address){

    var button = document.createElement("button");
    button.style.width = "100%";
    button.style.padding = "10px";
    button.style.fontSize = "16px";
    button.textContent = name + ": " + address;
    var body = document.getElementsByTagName(h1)[0];
    h1.appendChild(body);

    button.addEventListener("click", function(){

        document.getElementById("services").innerHTML= "";
        connect(address);
    });
}

function connect(address){

    new Promise(function(resolve, reject){
        bluetoothle.connect(resolve, reject, {address: address});
    }).then(connectSuccess, handleError);
}

function connectSuccess(){

}

function stopScan(){

}