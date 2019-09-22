"strict mode";

function updateImage (file) {
    let newImage = document.getElementById('curImg')
    console.log(file)
    newImage.src = file
 }


// Create the XHR object.
function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeRequest() {
    let url = `query?`
    let xhr = createRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object  
      console.log(object)
      updateImage(object);
    };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

setInterval(makeRequest, 5000);