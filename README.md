# Modus-Javascript-Bridge

Javascript bridge that provides native functionality to web bundles running within Modus Communicate

### Plain Old Javascript

Include the **modus-js-bridge.js** file in your application
_TEMPORARY NOTE: the modus-js-bridge.js file is located in 'example/js/modus-js-bridge'_

```html
<script type="module" src="js/modus-js-bridge.js"></script>
<script>
  Modus.getCurrentUserName();
</script>
```

### Using as a module

Include the **modus-js-bridge.js** file in your application
_TEMPORARY NOTE: the modus-js-bridge.js file is located in 'example/js/modus-js-bridge'_

```javascript
import Modus from "./js/modus-js-bridge";
Modus.getCurrentUserName();
```

### General Usage Example

```javascript
Modus.getCurrentUserName().then((username) => {
  console.log("Hello, " + username);
});
```

### Promises and Polyfills

This library heavily relies on native JavaScript promises. This may require a polyfill in order for the bridge to work in older versions of Modus Communicate and Internet Explorer. We suggest using something like "promise-polyfill". See https://github.com/taylorhakes/promise-polyfill for more details

### Table of Contents

[User Methods](#user-methods)  
[Email Methods](#email-methods)  
[Agenda Methods](#agenda-methods)  
[Lead Capture Methods](#lead-capture-methods)  
[Follow Up Methods](#follow-up-methods)  
[File Picker Methods](#file-picker-methods)  
[Other Methods](#other-methods)

## User Methods:

### --- getCurrentUserName ---

Returns the currently logged in user's name (first and last)

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.8+   |
| Android   |  2.1.6+   |
| Windows   | 4.3.0.0+  |

##### Parameters

This method has no parameters.

##### Usage

```javascript
Modus.getCurrentUserName().then((username) => {
  console.log("Hello, " + username);
});
```

### --- getCurrentUserEmail ---

Returns the currently logged in user's email

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |   2.6+    |
| Android   |  2.1.6+   |
| Windows   | 5.0.0.0+  |

##### Parameters

This method has no parameters.

##### Usage

```javascript
Modus.getCurrentUserEmail().then((email) => {
  console.log("Hello, " + email);
});
```

### --- getAccessToken ---

Returns the currently logged in user's access token

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.0.8+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

##### Usage

```javascript
Modus.getAccessToken().then((token) => {
  console.log(token);
});
```

### --- getCurrentUserRegions ---

Returns the currently logged in user's regions

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  2.6.3+   |
| Android   |  2.1.6+   |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

##### Usage

```javascript
Modus.getCurrentUserRegions().then((regions) => {
  //array of strings.["hello", "world]
  console.log(regions);
});
```

## Email Methods:

### --- sendEmail ---

Sends an email via the platform's native mail application

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |  2.1.6+   |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email

##### Usage

```javascript
Modus.sendEmail("test@gmail.com", "", "Test Subject Line", "Test body").then(() =>
  console.log("email sent successfully!");
}).catch((ex) =>{
  console.log("email failed to send");F
});
```

### --- sendEmailHtml ---

Sends an html formatted email via the platform's native mail application

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |  2.1.6+   |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- html
  - (string) html body of email

##### Usage

```javascript
Modus.sendEmailHtml("test@gmail.com", "", "Test Subject Line", "<h1>Hi</h1>").then(() =>
  console.log("email sent successfully!");
}).catch((ex) =>{
  console.log("email failed to send");F
});
```

### --- sendEmailWithPDFAttachmentFromHTML ---

Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied HTML markup, also using base 64 encoding for the parameters

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.9+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email
- attachmentHTML
  - (string) HTML to save as PDF and attach to email NOTE: this supports SVG

### --- sendEmailWithPDFAttachmentFromHTMLMultiPage ---

Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied array of HTML markup pages, also using base 64 encoding for the parameters

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |   4.3+    |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email
- attachmentHTMLPages
  - (array) Array of HTML pages to save as PDF and attach to email NOTE: this supports SVG

### --- sendEmailWithFileAttachmentFromBase64 ---

Sends an email via the platform's native mail application with a file attachment that is generated from the supplied base64 string representation of the file, also using base 64 encoding for the parameters. The attached file will be named with the supplied string attachmentName, and this should include the extension (example: quote.pdf)

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.0.8+   |
| Android   |  4.3.0+   |
| Windows   |   5.0+    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email
- attachmentName
  - (string) file name of the attachment (you must include the extension)
- attachmentBase64
  - (string) Base 64 representation of the file you would like to attach

## Agenda Methods:

### --- getAgendas ---

Returns a stringified json list of agendas (both local and shared) present in the app for this user. Json response will contain an array of agenda objects, each agenda object will have a property titled "agendaId" with an integer id and a property titled "agendaTitle" with a string name.

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |   5.0+    |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### --- sendAgenda ---

Send the media contents of an agenda to a specified email address

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.0.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- agendaId
  - (int) id of the agenda to send (typically sourced from the getAgendas call above)
- destinationEmail
  - (string) email address to send the content to (optional)

## Storage Methods:

### --- getItem ---

Gets a value for a specified key from the native local database

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- key
  - (string) key to retrieve

### --- setItem ---

Sets a value for a specified key to the native local database

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- key
  - (string) key to store
- value
  - (string) value to store

### --- getGlobalItem ---

Gets a value for a specified key from the native local database

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- key
  - (string) key to retrieve

### --- setGlobalItem ---

Sets a value for a specified key to the native local database

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- key
  - (string) key to store
- value
  - (string) value to store

## Lead Capture Methods:

### --- scanBarcode ---

Scans a barcode and returns the text encoded in the barcode

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.2+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### --- captureLead ---

Captures a lead and returns the scan string (encoded in base64)

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.2+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

## Follow Up Methods:

### sendFollowup

Triggers a followup to happen within the app. It allows the user of this function to override the link added to the followup as well by setting the link param to be whatever link you want to send in an email with the appropriate templated email body that is the default behavior of the app. The other two params are optional and can be used in cases where web bundles need to indicate what step to open to in the followup link or indicate what bundle the link is being sent from.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **step**: (string) this is another item that will get appended to the url of the short link sent. It was used to indicate to the web bundle what "step" to open to when loading the link. Omitting it by setting it to "" or null will cause it to not be appended to the url.
- **bundleName**: (string) this is a string that indicates what web bundle is, it then gets added as a url param to the short link. Omitting it by setting it to "" or null will cause it to not be appended to the url.
- **link**: (string) this can be any link you would like to send in the followup, omitting it by setting it to "" or null will result in the app placing in the next followuplink short link for the media item associated with this bundle

### previewNextFollowupLink

Returns the next short link that will be sent in the followup for the corresponding media item associated with the web bundle. This does not increment the short link it just shows what the next one is going to be.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### getFollowupGuid

This method takes an adr.sh short link and returns the associated unique guid used for the Modus Microsite.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **link**: (string) this must be an adr.sh short link for this to work.

## File Picker Methods:

### --- getMediaWithPicker ---

TODO: write a description

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |   5.2+    |
| Android   |   5.2+    |
| Windows   |   5.2+    |

##### Parameters

- **parameter**: [string] description

## Other Methods:

### logEvent

Logs an event to the App Data Room analytics engine, which will then be queued to be sent up to Media Manager when a connection is available

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **object**: (string) object parameter of event
- action
  - (string) action parameter of event
- additionalParams
  - (string) key value pair listing of additional parameters (example: "email:test@gmail.com")

### reloadPage

Reloads the page

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  4.1.7+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### asyncHttpRequest

Queues an http request in the mobile app's local database to be run when the app next has an available network connection. The app will retry a number of times and / or for a period of time in the event of a failure. You can provide a success and error callback function, but these functions only indicate the success or error of the request being parsed by the mobile app and placed into the database for future processing. The success or error callback functions do not indicate success or error of the actual HTTP request. Note: The request may end up firing at a much later date in the future (when the device is next online). In essence, you are firing off this request "blind" and your application must not depend on the outcome of this request. Example use cases include posting results of a quiz, or posting custom analytics data to a third party provider.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |   4.3+    |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- url
  - (string) url to send the http request to
- verb
  - (string) http verb to use in this request. Acceptable values: POST, GET, PUT, DELETE
- headers
  - (dictionary) key value pairs of additional headers. example: { name: 'John', time: '2pm' }
- body

  - (dictionary) body to post. example: { color: 'Red', fruit: 'Apple' }

### promptShareMenuWithData

This method allows a base 64 file to be shared via the share dropdown native to the device you are dealing with. For instance you could send a base64 file via an email, or you could save it to the files app on the device.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |  4.4.2+   |
| Windows   |    N/A    |

##### Parameters

- fileAsBase64
  - (string) File represented in base64
- name
  -(string) The name of the file
