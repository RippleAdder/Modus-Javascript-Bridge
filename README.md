Modus-Javascript-Bridge
=============================

Javascript bridge that provides native functionality to web bundles running within Modus Communicate

##### Usage:

Simply include the adrJSBridge.js file and call any of the public methods.  See index.html for usage examples.

 ```javascript
 adr.sendEmail("test@gmail.com", "", "test subject", "test body", onSuccess, onError);
 ```


## Public Methods:


  
### sendEmailEncoded
  Sends an email via the platform's native mail application using base 64 encoding for the parameters
  
| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.9+        |
| Android       | 2.1.6+        |
| Windows       | 1.21.0+       |

##### Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
### sendEmailWithPDFAttachmentFromHTML
  Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied HTML markup, also using base 64 encoding for the parameters

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.9+        |
| Android       | N/A           |
| Windows       | 1.21.0+       |

##### Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* attachmentHTML
  * (string) HTML to save as PDF and attach to email NOTE: this supports SVG
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

### sendEmailWithPDFAttachmentFromHTMLMultiPage
  Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied array of HTML markup pages, also using base 64 encoding for the parameters

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 4.3+          |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* attachmentHTMLPages
  * (array) Array of HTML pages to save as PDF and attach to email NOTE: this supports SVG
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
### sendEmailWithFileAttachmentFromBase64
  Sends an email via the platform's native mail application with a file attachment that is generated from the supplied base64 string representation of the file, also using base 64 encoding for the parameters.  The attached file will be named with the supplied string attachmentName, and this should include the extension (example: quote.pdf)

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 3.1.2+        |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* attachmentName
  * (string) file name of the attachment (you must include the extension)
* attachmentBase64
  * (string) Base 64 representation of the file you would like to attach
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

### sendEmail  **_Deprecated in v1.7.9, use sendEmailEncoded instead_**
  Sends an email via the platform's native mail application
  
| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.0+        |
| Android       | 2.1.6+        |
| Windows       | 1.21.0+       |

##### Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

### getItem
  Gets a value for a specified key from the native local database

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.0+        |
| Android       | N/A           |
| Windows       | 1.21.0+       |

##### Parameters
* key
  * (string) key to retrieve
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


### setItem
  Sets a value for a specified key to the native local database

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.0+        |
| Android       | N/A           |
| Windows       | 1.21.0+       |

##### Parameters
* key
  * (string) key to store
* value
  * (string) value to store
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


### logEvent
  Logs an event to the App Data Room analytics engine, which will then be queued to be sent up to Media Manager when a connection is available

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.0+        |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* object
  * (string) object parameter of event
* action
  * (string) action parameter of event
* additionalParams
  * (string) key value pair listing of additional parameters (example: "email:test@gmail.com")
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


### scanPDF417Barcode
  Scans a PDF 417 barcode and returns the text encoded in the barcode (encoded in base64)
  

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.2+        |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
### captureLead
  Captures a lead and returns the scan string (encoded in base64)


| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.2+        |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

### getCurrentUserName
  Returns the currently logged in user's name (first and last) (encoded in base64)

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 1.7.8+        |
| Android       | 2.1.6+        |
| Windows       | 1.21.0+       |

##### Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
### getCurrentUserEmail
  Returns the currently logged in user's email (encoded in base64)
  
| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 2.6+          |
| Android       | 2.1.6+        |
| Windows       | N/A           |

##### Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
### getCurrentUserRegions
  Returns the currently logged in user's regions (encoded in base64)

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 2.6.3+        |
| Android       | 2.1.6+        |
| Windows       | N/A           |

##### Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

### reloadPage
  Reloads the page

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 4.1.7+        |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
This method has no parameters.

### asyncHttpRequest
  Queues an http request in the mobile app's local database to be run when the app next has an available network connection.  The app will retry a number of times and / or for a period of time in the event of a failure.  You can provide a success and error callback function, but these functions only indicate the success or error of the request being parsed by the mobile app and placed into the database for future processing.  The success or error callback functions do not indicate success or error of the actual HTTP request.  Note:  The request may end up firing at a much later date in the future (when the device is next online).  In essence, you are firing off this request "blind" and your application must not depend on the outcome of this request.  Example use cases include posting results of a quiz, or posting custom analytics data to a third party provider.

| Platforms     | Available     |
| ------------- |:-------------:|
| iOS           | 4.3+          |
| Android       | N/A           |
| Windows       | N/A           |

##### Parameters
* url
  * (string) url to send the http request to
* verb
  * (string) http verb to use in this request.  Acceptable values:  POST, GET, PUT, DELETE
* headers
  * (dictionary) key value pairs of additional headers.  example: { name: 'John', time: '2pm' }
* body
  * (dictionary) body to post.  example: { color: 'Red', fruit: 'Apple' }
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
