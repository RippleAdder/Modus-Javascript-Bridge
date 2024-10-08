<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [User][1]
    *   [getCurrentUserName][2]
        *   [Examples][3]
    *   [getCurrentUserEmail][4]
    *   [getCurrentUserRegions][5]
    *   [getAccessToken][6]
        *   [Examples][7]
    *   [getUser][8]
        *   [Examples][9]
*   [Storage][10]
    *   [getItem][11]
        *   [Parameters][12]
        *   [Examples][13]
    *   [setItem][14]
        *   [Parameters][15]
        *   [Examples][16]
    *   [getGlobalItem][17]
        *   [Parameters][18]
    *   [setGlobalItem][19]
        *   [Parameters][20]
*   [Emails][21]
    *   [sendEmail][22]
        *   [Parameters][23]
        *   [Examples][24]
    *   [sendEmailHtml][25]
        *   [Parameters][26]
        *   [Examples][27]
    *   [sendEmailWithFileAttachmentFromBase64][28]
        *   [Parameters][29]
        *   [Examples][30]
*   [Agendas][31]
    *   [getAgendas][32]
        *   [Examples][33]
    *   [sendAgenda][34]
        *   [Parameters][35]
        *   [Examples][36]
*   [Lead\_Capture][37]
    *   [scanBarcode][38]
*   [Media][39]
    *   [getMediaWithPicker][40]
        *   [Parameters][41]
        *   [Examples][42]
*   [Assets][43]
    *   [getAssetsWithPicker][44]
        *   [Parameters][45]
        *   [Examples][46]
*   [Other][47]
    *   [shareMailTo][48]
        *   [Parameters][49]
        *   [Examples][50]
    *   [closeContainer][51]
        *   [Examples][52]

## User

### getCurrentUserName

Get the current user's username

#### Examples

```javascript
Modus.getCurrentUserName().then((username) => { });
```

Returns **[Promise][53]<[string][54]>** promise with the username

**Meta**

*   **version**: iOS - 1.7.9  | Android - 2.1.6  |  Windows - 4.3.0.0

### getCurrentUserEmail

Get the current user's email

Returns **[Promise][53]<[string][54]>** current user email

**Meta**

*   **version**: iOS - 2.6  | Android - 2.1.6  |  Windows - 5.0.0.0

### getCurrentUserRegions

Returns the currently logged in user's regions

Returns **[Promise][53]<[Array][55]<[string][54]>>** List of current user's regions

**Meta**

*   **version**: iOS - 2.6.3  | Android - 2.1.6  |  Windows - N/A

### getAccessToken

Returns the currently logged in user's access token

#### Examples

```javascript
Modus.getAccessToken().then((token) => { });
```

Returns **[Promise][53]<[string][54]>** An access token

**Meta**

*   **version**: iOS - 5.0.8  | Android - N/A  |  Windows - N/A

### getUser

Returns the currently logged in user (serialized)

#### Examples

```javascript
Modus.getUser().then((userJSON) => { });
```

```javascript
// returns 
{"id":12345,"email":"okenobi@jedicouncil.crst","first_name":"Obi Won","last_name":"Kenobi"}
```

Returns **[Promise][53]<[string][54]>** A serialized user object

**Meta**

*   **version**: iOS - 6.5.0 | Android - N/A  |  Windows - N/A

## Storage

### getItem

Gets a value for a specified key from the native local database

#### Parameters

*   `key` **[string][54]** name of the "key" you want to retrieve the value of

#### Examples

```javascript
Modus.getItem("test").then((val) => {
      //do something
  });
```

Returns **[Promise][53]<[string][54]>** The value of the key. If key does not exist `null` is returned

**Meta**

*   **version**: iOS - 1.7.0  | Android - N/A  |  Windows - N/A

### setItem

Sets a value for a specified key to the native local database

#### Parameters

*   `key` **[string][54]** name of the "key" you want to set the value of
*   `value` **[string][54]** The value you want to assign to the key

#### Examples

```javascript
Modus.setItem("test", "Hello World!").then(() =>{
      // success!
      // no value returned
  });
```

**Meta**

*   **version**: iOS - 1.7.0  | Android - N/A  |  Windows - 5.1.0.0

### getGlobalItem

Gets a value for a specified key from the native local database. This value is accessible between different web bundles

#### Parameters

*   `key` **[string][54]** name of the "key" you want to retrieve the value of

Returns **[Promise][53]<[string][54]>** The value of the key. If key does not exist `null` is returned

**Meta**

*   **version**: iOS - 1.7.0  | Android - N/A  |  Windows - N/A

### setGlobalItem

Sets a value for a specified key to the native local database. This value is accessible between different web bundles

#### Parameters

*   `key` **[string][54]** name of the "key" you want to set the value of
*   `value` **[string][54]** The value you want to assign to the key

**Meta**

*   **version**: iOS - 1.7.0  | Android - N/A  |  Windows - 5.1.0.0

## Emails

### sendEmail

#### Parameters

*   `to` **[string][54]** reciept email address
*   `cc` **[string][54]** carbon copy email address
*   `subject` **[string][54]** subject of the email
*   `body` **[string][54]** body of the email (plaintext only)

#### Examples

```javascript
Modus.sendEmail("test@gmail.com", "", "Test Subject Line", "Test body").then(() =>{
//email sent successfully
});
```

Returns **[Promise][53]** . No data returned.

**Meta**

*   **version**: iOS - 1.7.0  | Android - 2.1.6+  |  Windows - N/A

### sendEmailHtml

#### Parameters

*   `to` **[string][54]** reciept email address
*   `cc` **[string][54]** carbon copy email address
*   `subject` **[string][54]** subject of the email
*   `html` **[string][54]** body of the email (HTML)

#### Examples

```javascript
Modus.sendEmail("test@gmail.com", "", "Test Subject Line", "<h1>Hello World!</h1>").then(() =>
      //email sent successfully
  }).catch((ex) =>{
      //email failed to send
  });
```

Returns **[Promise][53]** . No data returned.

**Meta**

*   **version**: iOS - 1.7.0  | Android - 2.1.6+  |  Windows - N/A

### sendEmailWithFileAttachmentFromBase64

#### Parameters

*   `data` &#x20;
*   `to` **[string][54]** destination email address
*   `cc` **[string][54]** carbon copy email address
*   `subject` **[string][54]** subject of the email
*   `html` **[string][54]** body of the email (plaintext)
*   `attachmentName` **[string][54]** file name of the attachment (you must include the extension)
*   `attachmentBase64` **[string][54]** Base 64 representation of the file you would like to attach

#### Examples

```javascript
Modus.sendEmail("test@gmail.com", "", "Subject Line for HTML", "Check out my attachments").then(() =>
      //email sent successfully
  }).catch((ex) =>{
      //email failed to send
  });
```

Returns **[Promise][53]** . No data returned.

**Meta**

*   **version**: iOS - 5.0.8+  | Android - 4.3.0+  |  Windows - 5.0.0.0+

## Agendas

### getAgendas

#### Examples

```javascript
Modus.getAgendas().then((agendas) => {
      //do something
  });
```

Returns **[Promise][53]<[Array][55]\<Agenda>>** . returns an array of agendas

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A

### sendAgenda

#### Parameters

*   `agendaId` **[Object][56]\<agenda>** The id of the agenda to email
*   `emailAddress` **[Object][56]\<agenda>** destination email address

#### Examples

```javascript
Modus.sendAgenda(12354, "example@gomodus.com").then((agendas) => {
      //native email client opened successfully
  });
```

Returns **[Promise][53]** no data returned

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A

## Lead\_Capture

### scanBarcode

Scans a barcode and returns the text encoded in the barcode

Returns **[Promise][53]<[String][54]>** . returns text encoded in barcode

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A

## Media

### getMediaWithPicker

Opens a media picker in the app that allows a user to choose Modus media items

#### Parameters

*   `excludeMediaIds` **[Object][56]\<agenda>** Ids of media items you don't want to show in the media picker

#### Examples

```javascript
Modus.getMediaWithPicker(null).then((mediaIds) => {
      //do something
  });
```

Returns **[Promise][53]<[Array][55]\<Int>>** . returns an array of media ids

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A  | Web - no support
*   **deprecated**: use getAssetsWithPicker instead

## Assets

### getAssetsWithPicker

Opens a media picker in the app that allows a user to choose Modus assets

#### Parameters

*   `excludeMediaIds` **[Object][56]\<agenda>** ids of media items you don't want to show in the media picker

#### Examples

```javascript
Modus.getAssetsWithPicker(null).then(({mediaIds,vptIds}) => {
      //do something
  });
```

Returns **[Promise][53]<[Object][56]>** . returns an object like this {mediaIds: \[], vptIds: \[]}

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A  | Web

## Other

### shareMailTo

#### Parameters

*   `mailTo` **[string][54]** a mailTo link to open in native/attached application

#### Examples

```javascript
Modus.shareMailTo("mailto:?to=test@helloworld.com&body=Thanks for meeting with me today")
```

Returns **[Promise][53]** . No data returned.

**Meta**

*   **version**: iOS - N/A  | Android - N/A  |  Windows - N/A

### closeContainer

Function to close the containing modal/dialog in an application

#### Examples

```javascript
Modus.closeModal();
```

[1]: #user

[2]: #getcurrentusername

[3]: #examples

[4]: #getcurrentuseremail

[5]: #getcurrentuserregions

[6]: #getaccesstoken

[7]: #examples-1

[8]: #getuser

[9]: #examples-2

[10]: #storage

[11]: #getitem

[12]: #parameters

[13]: #examples-3

[14]: #setitem

[15]: #parameters-1

[16]: #examples-4

[17]: #getglobalitem

[18]: #parameters-2

[19]: #setglobalitem

[20]: #parameters-3

[21]: #emails

[22]: #sendemail

[23]: #parameters-4

[24]: #examples-5

[25]: #sendemailhtml

[26]: #parameters-5

[27]: #examples-6

[28]: #sendemailwithfileattachmentfrombase64

[29]: #parameters-6

[30]: #examples-7

[31]: #agendas

[32]: #getagendas

[33]: #examples-8

[34]: #sendagenda

[35]: #parameters-7

[36]: #examples-9

[37]: #lead_capture

[38]: #scanbarcode

[39]: #media

[40]: #getmediawithpicker

[41]: #parameters-8

[42]: #examples-10

[43]: #assets

[44]: #getassetswithpicker

[45]: #parameters-9

[46]: #examples-11

[47]: #other

[48]: #sharemailto

[49]: #parameters-10

[50]: #examples-12

[51]: #closecontainer

[52]: #examples-13

[53]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[55]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[56]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
