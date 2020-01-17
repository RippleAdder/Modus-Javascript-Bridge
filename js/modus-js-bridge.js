window.modus = function() {
    //Variables
    let _os = _getParameterByName("os");

    //Helpers
    function _getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    let _createDefaultResult = function (request) {
        //TODO: should this be somewhere else?
        var name = request.methodName;
        var result = null;

        switch (name) {
            case "getCurrentUserName":
                result = "Obi Won Kenobi"
                break;
            case "getCurrentUserEmail":
                result = "maul_killer@jedicouncil.crst"
                break;
            case "getCurrentUserRegions":
                result = ["Tatooine", "Stewjon", "Coruscant"]
                break;
            case "getItem":
                result = window[request.data.key] ? "Item: " + window[request.data.key] : "No Item Set";
                break;
            case "setItem":
                window[request.data.key] = request.data.value;
                result = "Item was set"
                break;
        }

        window[request.successMethodId](result);
    }


    //Marshall
    let _callNativeFunction = function(methodName, methodData) {
        var id = Math.floor(Math.random() * 10000000);
        var successId = methodName + "_success_" + id;
        var errorId = methodName + "_error_" + id;

        return new Promise(function(resolve, reject) {
            //build success function
            window[successId] = function(data) {
                resolve(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //build error function
            window[errorId] = function(data) {
                reject(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //create request
            let request = {
                methodName: methodName,
                data: methodData,
                successMethodId: successId,
                errorMethodId: errorId
            };

            let os = _getParameterByName("os");

            //For Windows builds that don't pass in the os param
            let userAgent = navigator.userAgent;

            //  Windows
            if (os === "windows" || userAgent.includes("Modus")) {
                return window.external.notify(JSON.stringify(request));
            }

            //  iOS
            if (os === "ios" || (window.webkit && window.webkit.messageHandlers.modus != undefined)) {
                return window.webkit.messageHandlers.modus.postMessage(request);
            }
            //  Android
            if (os === "android" || window.appInterface != undefined) {
                return window.appInterface.postMessage(JSON.stringify(request));
            }

            //Defaults and Stubs
            return _createExampleResult(request);
        });
    }

    //Public
    return {
        //User
        getCurrentUserName: _callNativeFunction.bind(null, "getCurrentUserName", null),
        getCurrentUserEmail: _callNativeFunction.bind(null, "getCurrentUserEmail", null),
        getCurrentUserRegions: _callNativeFunction.bind(null, "getCurrentUserRegions", null),

        //Storage
        getItem: function(key) { return _callNativeFunction("getItem", { key: key }) },
        setItem: function(key, value) { return _callNativeFunction("setItem", { key: key, value: value }) },

        //Emails
        sendEmailWithFileAttachmentFromBase64: function(data) { return _callNativeFunction("sendEmailWithFileAttachmentFromBase64", { data: data }) }

    }
}();