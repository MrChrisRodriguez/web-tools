var elm = "<tr><td align=\"left\" style=\"vertical-align: top;\"><div class=\"nmbl-Nimblet\"><div class=\"nmbl-Nimblet-Header\"><span class=\"nmbl-Nimblet-Header-Title\">Quick Actions</span><span class=\"gwt-InlineLabel clear\"></span></div><div class=\"nmbl-Nimblet-Content\"><div class=\"ContactSocialNetworksView\"><a class=\"viewStreams\" href=\"#\" aria-hidden=\"true\" style=\"display: none;\">View streams</a> <a href=\"javascript:setLeadStatus('sourcing');\">Sourcing</a><br/><a href=\"javascript:setLeadStatus('not_qualified');\">Not Qualified</a><br/><hr/><a href=\"javascript:setNotQualifiedReason('tooBig');\">Too Big</a><br/><a href=\"javascript:setNotQualifiedReason('badRev');\">Bad Revenue Fit</a><br/><a href=\"javascript:setNotQualifiedReason('badCulture');\">Bad Culture Fit</a><br/><a href=\"javascript:setNotQualifiedReason('noContact');\">Insufficient Contact Information</a><br/></div></div></div></td></tr>"

$('#rpanel > div > div > div.lastChild > table > tbody').prepend(elm)

// -----

var company_id = window.location.hash.split("id=")[1].split("&")[0];
window.onhashchange = function(){
    company_id = window.location.hash.split("id=")[1].split("&")[0];
    console.log(company_id);
}

var headers = {
    "Authorization": "Nimble token=\"5f733185-6a2b-4ee4-9fe8-f06279020520\"",
    "X-Nimble-Company": "Burstworks%2C%20Inc.",
    "X-Nimble-Company-Id": company_id,
    "X-Nimble-User": "chris@burstworks.com",
    "X-Nimble-User-Id": "5441854efaed2949f81d2124"
};
var success = function(){console.log('success!')}
var error = function(){alert('Failure!')};

    
function sendNimbleRequest(data){
    var request = $.ajax({
        url: "https://app.nimble.com/api/v1/contact/" + company_id + "?_method=put",
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