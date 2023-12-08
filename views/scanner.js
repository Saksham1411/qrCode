function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned  you like, for example:
    const value = decodedText;
    console.log(`Code matched = ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear(); document.getElementById("result").innerHTML =
        value;
}
const sendToServer = async (value) => { }
let config = {
    fps: 10,
    qrbox: { width: 500, height: 500 },
    rememberLastUsedCamera: true, // Only
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};
let html5QrcodeScanner = new Html5QrcodeScanner("reader", config,);
html5QrcodeScanner.render(onScanSuccess);