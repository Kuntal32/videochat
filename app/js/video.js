var selfEasyrtcid = "";
 
 
function connect() {
  easyrtc.setVideoDims(640,480);
  easyrtc.setRoomOccupantListener(convertListToButtons);
  easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
 // console.log(loginSuccess);
 }
 
 
function clearConnectList() {
  var otherClientDiv = document.getElementById("otherClients");
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild);
  }
}
 
 
function convertListToButtons (roomName, data, isPrimary) {
	//console.log(roomName);
  clearConnectList();
  var otherClientDiv = document.getElementById("otherClients");
  
  for(var easyrtcid in data) {
  console.log(data);
    var button = document.createElement("button");
    button.onclick = function(easyrtcid) {
      return function() {
        performCall(easyrtcid);
      };
    }(easyrtcid);
	button.className = "btn btn-sm";
    var label = document.createTextNode(easyrtc.idToName(easyrtcid));
    button.appendChild(label);
    otherClientDiv.appendChild(button);
  }
}
 
 
function performCall(otherEasyrtcid) {
  easyrtc.hangupAll();
 
  var successCB = function() {};
  var failureCB = function() {};
  easyrtc.call(otherEasyrtcid, successCB, failureCB);
}
 
 
function loginSuccess(easyrtcid) {

  selfEasyrtcid = easyrtcid;
  
  document.getElementById("iam").innerHTML = "I am " + document.getElementById("uname").value;
 //document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
}
 
 
function loginFailure(errorCode, message) {
  easyrtc.showError(errorCode, message);
}