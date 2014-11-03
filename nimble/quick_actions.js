//<script src="https://rawgit.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js"></script>

//////////////
// Setting up the environment
//////////////

// Important Elements
var sidePanel = $("#rpanel > div > div > div.lastChild > table > tbody");
var prevButton= $("#cpanel > div > div > div > div > table > tbody > tr:nth-child(1) > td > div > div.profileHeader > div > table > tbody > tr > td:nth-child(1) > div");
var nextButton = $("#cpanel > div > div > div > div > table > tbody > tr:nth-child(1) > td > div > div.profileHeader > div > table > tbody > tr > td:nth-child(4) > div");
var contactDefault = $("#contact_default");
var taskField = $("#cpanel > div > div > div > div > table > tbody > tr.inlineFormsCell > td > div > div.formContainer > div > div.nmbl-FormTextBox.subject.nmbl-FormTextBox-tipped > input")
var contactDetails = $("#details");
var companyID;
var headers;

// Establishing sane defaults
function getDefaults(){
    companyID = window.location.hash.split("id=")[1].split("&")[0];
    headers = {
        "Authorization": "Nimble token=\"5f733185-6a2b-4ee4-9fe8-f06279020520\"",
        "X-Nimble-Company": "Burstworks%2C%20Inc.",
        "X-Nimble-Company-Id": companyID,
//        "X-Nimble-User": "chris@burstworks.com",
//        "X-Nimble-User-Id": "5441854efaed2949f81d2124"
    };
}
var success = function(){console.log('success!')}
var error = function(){alert('Failure!')};

//////////////
// Quick Action Methods
//////////////

// Nimble Requests
function sendNimbleRequest(data){
    var request = $.ajax({
        url: "https://app.nimble.com/api/v1/contact/" + companyID + "?_method=put",
        type: "PUT",
        data: data,
        headers: headers,
        success: success,
        error: error
    })
}

function setLeadStatus(status){
    switch(status){
        case "sourcing":
            value="Sourcing";
            break;
        case "qualified":
            value="Qualified";
            break;
        case "engaged":
            value="Engaged";
            break;
        case "not_qualified":
            value="Not Qualified";
            break;
    }   
    data = "{\"type\":\"person\", \"fields\":{\"lead status\":[{\"value\":\"" + 
                value + "\", \"field_id\":\"5441854ffaed2949f81d219b\", \"group\":\"Lead Details\", \"label\":\"lead status\", \"modifier\":\"\"}]}}",
    sendNimbleRequest(data);
}

function setNotQualifiedReason(reason){
    switch(reason){
        case "tooBig":
            data="{\"type\": \"company\",\"fields\": {\"Too Big\": [{\"value\": \"yes\",\"field_id\": \"5446ea26ae3156331b31341a\",\"group\": \"Details\",\"label\": \"Too Big\",\"modifier\": \"\"}]}}";
            break;
        case "badRev":
            data="{\"type\": \"company\",\"fields\": {\"Bad Revenue Fit\": [{\"value\": \"yes\",\"field_id\": \"5446ecbbb0bc223125c27d03\",\"group\": \"Details\",\"label\": \"Bad Revenue Fit\",\"modifier\": \"\"}]}}";
            break;
        case "badCulture":
            data="{\"type\": \"company\",\"fields\": {\"Bad Culture Fit\": [{\"value\": \"yes\",\"field_id\": \"5446ecc5cfb5786ab44cef2e\",\"group\": \"Details\",\"label\": \"Bad Culture Fit\",\"modifier\": \"\"}]}}";
            break;
        case "noContact":
            data="{\"type\": \"company\",\"fields\": {\"No Contact Info\": [{\"value\": \"Yes\",\"field_id\": \"5453d151ae315627f56fcb2b\",\"group\": \"Details\",\"label\": \"No Contact Info\",\"modifier\": \"\"}]}}";
            break;
    }
    sendNimbleRequest(data);
}

//////////////
// Estbalish Shortcuts
//////////////

$.getScript('https://rawgit.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js', function(){
    console.log('jquery.hotkeys loaded successfully');

    // Navigation
    $(document).bind('keydown', 'alt+right', function(){
        nextButton[0].click();
    });
    $(document).bind('keydown', 'alt+left', function(){
        prevButton[0].click();
    });


    // Lead status
    $(document).bind('keydown', 'alt+1', function(){
        setLeadStatus('sourcing');
    });
    $(document).bind('keydown', 'alt+2', function(){
        setLeadStatus('qualified');
    });
    $(document).bind('keydown', 'alt+3', function(){
        setLeadStatus('engaged');
    });
    $(document).bind('keydown', 'alt+0', function(){
        setLeadStatus('not_qualified');
    });


    // Windows
    $(document).bind('keydown', 'alt+c', function(){
        contactDefault[0].click();
        console.log('click');
    });
    $(document).bind('keydown', 'alt+d', function(){
        contactDetails[0].click();
    });
});


//////////////
// Actions and listeners
//////////////

getDefaults();

// Construct and insert the quick actions panel

var quickActions="";
quickActions += "<tr>";
quickActions += "    <td align=\"left\" style=\"vertical-align: top;\">";
quickActions += "        <div class=\"nmbl-Nimblet\">";
quickActions += "            <div class=\"nmbl-Nimblet-Header\">";
quickActions += "                <span class=\"nmbl-Nimblet-Header-Title\">Quick Actions<\/span>";
quickActions += "                <span class=\"gwt-InlineLabel clear\"><\/span>";
quickActions += "            <\/div>";
quickActions += "            <div class=\"nmbl-Nimblet-Content\">";
quickActions += "                <div class=\"ContactSocialNetworksView\">";
quickActions += "                    <a class=\"viewStreams\" href=\"#\" aria-hidden=\"true\" style=\"display: none;\">View streams<\/a>";
quickActions += "                    <a href=\"javascript:setLeadStatus('sourcing');\">Sourcing (alt+1)<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setLeadStatus('qualified');\">Qualified (alt+2)<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setLeadStatus('engaged');\">Engaged (alt+3)<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setLeadStatus('not_qualified');\">Not Qualified (alt+0)<\/a><br\/>";
quickActions += "                    <hr\/>";
quickActions += "                    <a href=\"javascript:setNotQualifiedReason('tooBig');\">Too Big<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setNotQualifiedReason('badRev');\">Bad Revenue Fit<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setNotQualifiedReason('badCulture');\">Bad Culture Fit<\/a><br\/>";
quickActions += "                    <a href=\"javascript:setNotQualifiedReason('noContact');\">Insufficient Contact Information<\/a><br\/>";
quickActions += "                    <hr\/>";
quickActions += "                    Previous (alt+left) <br\/>";
quickActions += "                    Next (alt+right) <br\/>";
quickActions += "                <\/div>";
quickActions += "            <\/div>";
quickActions += "        <\/div>";
quickActions += "    <\/td>";
quickActions += "<\/tr>";
quickActions += "";

sidePanel.prepend(quickActions)

// Reset defaults on page change
window.onhashchange = function(){
    getDefaults();
    console.log(companyID);
    setTimeout(function(){taskField.blur();},500);
    setTimeout(function(){taskField.blur();},1000);
}