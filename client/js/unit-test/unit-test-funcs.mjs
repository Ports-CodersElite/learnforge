export function isEqaul(testName, data, expectedOutput) {
    const webComp = document.createElement('test-case');
    let retVal = false;
    document.body.append(webComp);

    if(data === expectedOutput) {
        retVal = true;
        webComp.addTestInformation(testName, data, expectedOutput, retVal);
        return;
    }
    retVal = false;
    webComp.addTestInformation(testName, data, expectedOutput, retVal);
    return; 
}

export function isNull(testName, data) {
    if (data !== null) {
        return true;
    }
    return false;
}