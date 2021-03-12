  # Foobar
  
  Calling app for altek
  
  ## Installation
  
  
  ```bash
  npm install altek-call-app
  ```
  
  ## Usage
  
  ```js
import AppCall from "altek-call-app";
  
const companyName = 'cnu'
const myNumber = '888'

const app = new AppCall({extension: myNumber}) 
  ```
  
  ## Init
  ````js

app.init(companyName,myNumber)
````
  
  ## Calling
  
   ````js  
const number = '+1 999 999 9999' 
  app.call(number)
  ````

  ## Decline
   ````js  
  app.decline()
  ````

  ## Pressing a button on the dial
   ````js  
  app.sendDigits(number)
  ````

  ## Mute microphone
   ````js  
  app.mute(true)            // disable microphone
  app.mute(false)           // enable microphone
  app.mute(!app.isMuted())
  ````
  ## Microphone status
   ````js  
    app.isMuted()
  ````

  ## Handlers
   ````js  
setIsConnect        // Toggles connection states
connectHandler      // Calls a function when connected to a call
disconnectHandler   // Calls a function when disconnected
incomingHandler     // Calls a function on an incoming call     => From
acceptHandler       // Calls a function when accepted call      => From
callingHandler      // Calls a function when outgoing call      => To
missedCallHandler   // Calls the function if you missed a call  => From

const incomingHandler = (From) => {
    console.log(From)
}

const app = new AppCall({incomingHandler})
  ````
