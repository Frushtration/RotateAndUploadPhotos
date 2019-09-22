
$(document).ready(function () { 
    var options = { 
        beforeSubmit: showRequest,  // pre-submit callback 
        success: showResponse  // post-submit callback 
    }; 

    // bind to the form's submit event 
    $('#frmUploader').submit(function () { 
        $(this).ajaxSubmit(options); 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    }); 
}); 

// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    if (formData[0].value == ""){
        alert('No photo selected');
        return false;
    }
    alert('Uploading is starting.'); 
    return true; 
} 

// post-submit callback 
function showResponse(responseText, statusText, xhr, $form) { 
    clearForm();
    console.log(responseText)
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText ); 
   
} 

function clearForm() {
    let form = document.getElementById('frmUploader');
    form.reset();
}