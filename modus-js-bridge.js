window.modus = function () {
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
        var name = request.name;
        var result = null;

        switch (name) {
            case "getCurrentUserName":
                result = "Obi Won Kenobi"
                break;
            case "getCurrentUserEmail":
                result = "maul_killer@jedicouncil.crst"

        }

        window[request.successId](result);
    }


    //Marshall
    let _callNativeFunction = function (methodName, methodData) {
        var id = Math.floor(Math.random() * 10000000);
        var successId = methodName + "_success_" + id;
        var errorId = methodName + "_error_" + id;

        return new Promise(function (resolve, reject) {
            //build success function
            window[successId] = function (data) {
                resolve(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //build error function
            window[errorId] = function (data) {
                reject(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //create request
            let request = {
                name: methodName,
                data: methodData,
                successId: successId,
                errorId: errorId
            };

            let os = _getParameterByName("os");

            //  Windows
            if (os === "windows") {
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

            //Defaults and STubs
            return _createDefaultResult(request);
        });
    }

    //Public
    return {
        //User
        getCurrentUserName: _callNativeFunction.bind(null, "getCurrentUserName", null),
        getCurrentUserEmail: _callNativeFunction.bind(null, "getCurrentUserEmail", null),

        //Emails
    }
}();