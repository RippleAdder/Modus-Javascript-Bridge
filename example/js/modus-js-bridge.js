//implement weback or something in this so we can build a dist file based on multiple src files.

window.modus = function () {
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

    //TODO: Break this in to a different file
    let _createExampleResult = function (request) {
        var name = request.methodName;
        var result = null;

        switch (name) {
            case "getCurrentUserName":
                result = "Obi Won Kenobi"
                break;
            case "getCurrentUserEmail":
                result = "maul_killer@jedicouncil.crst"
                break;
            case "getAccessToken":
                result = "exampleToken"
                break;
            case "getCurrentUserRegions":
                result = ["Tatooine", "Stewjon", "Coruscant"]
                break;

            //Storage
            case "getItem":
            case "getGlobalItem":
                result = window[request.data.key] ? window[request.data.key] : null;
                break;
            case "setItem":
            case "setGlobalItem":
                window[request.data.key] = request.data.value;
                break;

            //Email
            case "sendAgenda":
            case "sendEmail":
            case "sendEmailHtml":
                var e = request.data;
                var body = e.body ? e.body : e.html ? e.html : "";
                var to = e.to ? e.to : e.emailAddress;
                var mailto = "mailto:" + to + "?subject=" + e.subject + "&body=" + body + "&cc=" + e.cc;
                window.open(mailto);
                break;

            //Agendas
            case "getAgendas":
                result = JSON.stringify([{ agendaId: "1", agendaTitle: "Bespin Meeting" }, { agendaId: "2", agendaTitle: "Endor Visit" }, { agendaId: "3", agendaTitle: "Hoth Beach Vacation" }])
                break;

            //Other
            case "asyncHttpRequest":
                result = JSON.stringify({ 'example': 'hello world' });
                break;
        }

        window[request.successMethodId](result);
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
                methodName: methodName,
                data: methodData,
                successMethodId: successId,
                errorMethodId: errorId
            };

            let os = _getParameterByName("os");

            //For Windows builds that don't pass in the os param
            let userAgent = navigator.userAgent;

            //  Windows
            if (os === "windows" || userAgent.includes("Windows.Desktop")) {
                return window.external.notify(JSON.stringify(request));
            }

            //  iOS
            if (os === "ios" || (window.webkit && window.webkit.messageHandlers.modus != undefined)) {
                return window.webkit.messageHandlers.modus.postMessage(JSON.stringify(request));
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
        getAccessToken: _callNativeFunction.bind(null, "getAccessToken", null),

        //Storage
        getItem: function (key) { return _callNativeFunction("getItem", { key: key }) },
        setItem: function (key, value) { return _callNativeFunction("setItem", { key: key, value: value }) },
        getGlobalItem: function (key) { return _callNativeFunction("getGlobalItem", { key: key }) },
        setGlobalItem: function (key, value) { return _callNativeFunction("setGlobalItem", { key: key, value: value }) },

        //Emails
        sendEmail: function (to, cc, subject, body) { return _callNativeFunction("sendEmail", { to: to, cc: cc, subject: subject, body: body }) },
        sendEmailHtml: function (to, cc, subject, html) { return _callNativeFunction("sendEmailHtml", { to: to, cc: cc, subject: subject, html: html }) },
        sendEmailWithFileAttachmentFromBase64: function (data) { return _callNativeFunction("sendEmailWithFileAttachmentFromBase64", { data: data }) },

        //Agendas
        getAgendas: _callNativeFunction.bind(null, "getAgendas", null),
        sendAgenda: function (agendaId, emailAddress) { return _callNativeFunction("sendAgenda", { agendaId: agendaId, emailAddress: emailAddress }) },

        //Other
        scanBarcode: _callNativeFunction.bind(null, "scanPDF417Barcode", null),
        asyncHttpRequest: function (url, verb, headers, body) { return _callNativeFunction("asyncHttpRequest", { url: url, verb: verb, headers: headers, body: body }) }
    }
}();