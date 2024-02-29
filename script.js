function _0x1b09(_0x126be8,_0x502140){const _0x2b4063=_0x30ea();return _0x1b09=function(_0x55d560,_0x1cb240){_0x55d560=_0x55d560-0x0;let _0x49db96=_0x2b4063[_0x55d560];return _0x49db96;},_0x1b09(_0x126be8,_0x502140);}const _0x56f985=_0x1b09,_0x53bbc3=(function(){let _0x4f27b7=!![];return function(_0x27d3d3,_0x4fef7d){const _0xeab765=_0x4f27b7?function(){const _0x2253b3=_0x1b09;if(_0x4fef7d){const _0x583ba8=_0x4fef7d[_0x2253b3(0x0)](_0x27d3d3,arguments);return _0x4fef7d=null,_0x583ba8;}}:function(){};return _0x4f27b7=![],_0xeab765;};}()),_0x49db96=_0x53bbc3(this,function(){const _0x1c284f=_0x1b09;return _0x49db96[_0x1c284f(0x1)]()[_0x1c284f(0x2)](_0x1c284f(0x3))[_0x1c284f(0x1)]()['constructor'](_0x49db96)[_0x1c284f(0x2)](_0x1c284f(0x3));});_0x49db96();const _0x2b4063=(function(){let _0x6e2523=!![];return function(_0x14e998,_0x53f55c){const _0x2753b1=_0x6e2523?function(){const _0x4ba07b=_0x1b09;if(_0x53f55c){const _0x21b46e=_0x53f55c[_0x4ba07b(0x0)](_0x14e998,arguments);return _0x53f55c=null,_0x21b46e;}}:function(){};return _0x6e2523=![],_0x2753b1;};}()),_0x502140=_0x2b4063(this,function(){const _0x25c020=_0x1b09,_0x5601d3=function(){const _0x260b4c=_0x1b09;let _0x443323;try{_0x443323=Function(_0x260b4c(0x4)+_0x260b4c(0x5)+');')();}catch(_0x1d9f27){_0x443323=window;}return _0x443323;},_0x544ae0=_0x5601d3(),_0x5d3ba1=_0x544ae0[_0x25c020(0x6)]=_0x544ae0[_0x25c020(0x6)]||{},_0x162212=[_0x25c020(0x7),_0x25c020(0x8),'info',_0x25c020(0x9),_0x25c020(0xa),_0x25c020(0xb),_0x25c020(0xc)];for(let _0xa058f4=0x0;_0xa058f4<_0x162212[_0x25c020(0xd)];_0xa058f4++){const _0x5a99e9=_0x2b4063['constructor']['prototype'][_0x25c020(0xe)](_0x2b4063),_0x1ada2c=_0x162212[_0xa058f4],_0xf4a5e7=_0x5d3ba1[_0x1ada2c]||_0x5a99e9;_0x5a99e9[_0x25c020(0xf)]=_0x2b4063[_0x25c020(0xe)](_0x2b4063),_0x5a99e9['toString']=_0xf4a5e7[_0x25c020(0x1)][_0x25c020(0xe)](_0xf4a5e7),_0x5d3ba1[_0x1ada2c]=_0x5a99e9;}});function _0x30ea(){const _0x1142a5=['apply','toString','search','(((.+)+)+)+$','return\x20(function()\x20','{}.constructor(\x22return\x20this\x22)(\x20)','console','log','warn','error','exception','table','trace','length','bind','__proto__','AIzaSyAJaPIcB18nXckz4nbbljjSWyWk_l5RtMQ','silentroom-2221a.firebaseapp.com','silentroom-2221a','silentroom-2221a.appspot.com','628407592601'];_0x30ea=function(){return _0x1142a5;};return _0x30ea();}_0x502140();const firebaseConfig={'apiKey':_0x56f985(0x10),'authDomain':_0x56f985(0x11),'projectId':_0x56f985(0x12),'storageBucket':_0x56f985(0x13),'messagingSenderId':_0x56f985(0x14),'appId':'1:628407592601:web:f404858489d3d2965b7a08'};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
var isDoNotDisturbOn = false;
var currentRequestId = null; 
function listenToValue() {
  firestore.collection("roomSettings").doc("gRKAAwqbZQqOO9Gx9YrN").onSnapshot((doc) => {
    if (doc.exists) {
      isDoNotDisturbOn = doc.data().isOn;
      updateElementDisplay();
    }
  }, (error) => {
    console.log("Error listening to document:", error);
  });
}

function updateElementDisplay() {
  var values = document.querySelectorAll(".value");
  var image = document.querySelector(".image");
  var message = document.querySelector(".message");
  values.forEach(value => {
    value.textContent = isDoNotDisturbOn ? "Do Not Disturb" : 'Feel Free to Enter';
  });
  message.textContent = isDoNotDisturbOn ? "Daniel is currently busy" : "";
  image.src = isDoNotDisturbOn ? "./moon_icon_fill.png" : "./moon_icon_notFill.png";
  
  var requestButton = document.querySelector("#requestButton");
  if (requestButton) {
    requestButton.style.display = isDoNotDisturbOn ? "block" : "none";
  }
}

function sendRequest() {
  if (isDoNotDisturbOn) {
    var requesterName = window.prompt("Please enter your name:");
    
    if (requesterName) {
      firestore.collection("requests").add({
        status: "pending",
        requesterName: requesterName,
        requestTime: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("Request sent with ID: ", docRef.id);
        alert("Your request has been sent successfully.");
        currentRequestId = docRef.id; // Store the request ID
        listenToRequestStatus(docRef.id); // Listen for updates to this request's status
      })
      .catch((error) => {
        console.error("Error sending request: ", error);
        alert("There was an error sending your request.");
      });
    } else {
      alert("You must enter your name to send a request.");
    }
  } else {
    alert("Do Not Disturb is not activated. There's no need to send a request.");
  }
}

function listenToRequestStatus(requestId) {
  firestore.collection("requests").doc(requestId).onSnapshot((doc) => {
    if (doc.exists) {
      var requestStatus = doc.data().status;
      sessionStorage.setItem('requestStatus', status);
      // Call a function to update the UI with this status
      updateRequestStatusUI(requestStatus);
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.log("Error getting document:", error);
  });
}

function updateRequestStatusUI(status) {
  var statusElement = document.querySelector("#requestStatus");
  if (!statusElement) {
    statusElement = document.createElement("div");
    statusElement.id = "requestStatus";
    document.body.appendChild(statusElement);
  }

  // Clear previous classes
  statusElement.className = "";

  // Add class based on status
  statusElement.classList.add(status);

  // Update the text and class based on the status
  switch (status) {
    case "pending":
      statusElement.textContent = "Your request is being reviewed.";
      break;
    case "approved":
      statusElement.textContent = "Your request has been approved. Feel free to enter.";
      break;
    case "denied":
      statusElement.textContent = "Your request has been denied.";
      break;
    default:
      statusElement.textContent = "The status of your request is currently unknown. Please check back later.";
      statusElement.classList.add("unknown"); // Add class for unknown status
      break;
  }
}





// Initialize the listener to update UI based on the current "Do Not Disturb" status
listenToValue();

// Attach the event listener to the "Request to Enter" button
document.querySelector("#requestButton").addEventListener("click", sendRequest);