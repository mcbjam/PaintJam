//var baseurl = 'http://mafreemcbjam.zapto.org/mcbjam7/';
//var baseurl = 'http://www.mcbjam.com/';
var baseurl = 'https://facebook-mcbjam.eu01.aws.af.cm/';
$(document).ready(function () {

    //var fbAppId = '445930615488341';
   // var fbAppId = '241755759297550';
    var fbAppId = "559121044132256"  // appfogg
    

    var albums = '';
    var profilresponse = '';
    

    window.fbAsyncInit = function () {
        FB.init({
            appId: fbAppId,        // App ID
            status: true,           // check login status
            cookie: true,           // enable cookies to allow the server to access the session
            xfbml: true            // parse page for xfbml or html5 social plugins like login button below
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // connected
                profil();
                if (document.location.href == baseurl+"editphoto.html") {
                    dojob();
                }
            } else if (response.status === 'not_authorized') {
                
                profil();
            } else {
                //document.location.href = "/mcbjam7/";
                // not_logged_in
                //login();
            }
        });
    };

    // Load the SDK Asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    // $("#postonfacebook").click(postphoto);
    $("#postonfacebook").click(uploadphoto);

})


function postphoto() {
    // Post photo from local. Don't work yet

    accesstoken = FB.getAuthResponse()['accessToken'];
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function () {
        context.drawImage(imageObj, 69, 50);
    };
    imageObj.src = $('#image1').attr('src');

    var dataURL = canvas.toDataURL("image/png");

    //var datafinal= dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    var datafinal = dataURL.replace("data:image/png;base64,", "");

    FB.api('/10151170935408614/photos', 'post', {
        source: datafinal,

    }, function (response) {

        if (!response || response.error) {
            alert('Error!');
        } else {
            alert('Upload OK!');
        }
    });


    //var postMSG = "Your message";
    //var url = 'https://graph.facebook.com/10151170935408614/photos?access_token=' + accesstoken + "&message=" + postMSG;
    //var imgURL = "$('#image1').attr('src')";//change with your external photo url
    //var formData = new FormData();
    //formData.append("source", imgURL);

    //$.ajax({
    //    url: url,
    //    data: formData,
    //    cache: false,
    //    contentType: false,
    //    processData: false,
    //    type: 'POST',

    //    success: function (data) {
    //        alert("POST SUCCESSFUL");
    //    }
    //});
}

function uploadphoto() {
    //Upload photo from url WOrk
    var imgURL = $('#image1').attr('src');
    FB.api('/10151524688338614/photos', 'post', {
        message: profilresponse.name +' Edited a Photo using Paint Jam on www.mcbjam.com',
        url: imgURL,
      
    }, function (response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            alert('Your Photo was upload on Facebook');
        }
    });
}



function login() {
    FB.login(function (response) {
        if (response.authResponse) {
            accesstoken = FB.getAuthResponse()['accessToken'];
            profil();
            dojob();
        } else {
            alert(response);
        }
    }, { scope: scopes });
}

function profil() {
    FB.api('/me?fields=picture,name,name_format,link', function (response) {
        profilresponse = response;
        $('#profil').attr('src', response.picture.data.url);
    });
}


function dojob() {
    FB.api('/me/albums?fields=id,name,link,photos.fields(id,name,link,picture,source)', function (resp) {
        albums = resp.data;
        $('#albumlist').empty();
        if (resp.data.length > 0) {
            var ul = document.getElementById('albumlist');
            for (var i = 0, l = resp.data.length; i < l; i++) {
                var album = resp.data[i];
                $('#albumlist').append('<li><a onclick=choosealbum("' + album.id + '")> ' + album.name + '</a></li>');
            }
            choosealbum(resp.data[0].id);
        }
    });
    $("#hero").hide();
    $("#app").show();

}
function dojobredirect() {
    document.location.href = baseurl + "editphoto.html";
}
function choosealbum(id) {

    $('#albums').empty();
    for (var i = 0, n = albums.length; i < n; i++) {
        var album = albums[i];
        if (album.id == id) {
            i = n;
            if (album.photos) {
                for (var j = 0, l = album.photos.data.length; j < l; j++) {
                    var photo = album.photos.data[j];
                    var urlpicture = photo.picture;
                    var source = photo.source;
                    $('#albums').append('<img src="' + urlpicture + '" onclick=choosephoto("' + source + '") />');
                }
                $('#albums').append('</div>');
            }
        }
    }
   // choosephoto(album.photos.data[0].source);
}



function choosephoto(picture) {
   // $('#image1').attr('src', picture);
    launchEditor('image1', picture);
}

function post() {
    FB.api('me/freemcbjam:facetook', 'post', { profile: "http://www.facebook.com/pages/Freemcbjam-Community/263502307119653" },
    function (response) {
        alert('post ok');
    }
    );
}

function posttowall() {
    FB.api('498485180217277/freemcbjam:facetook', 'post', { profile: "http://www.facebook.com/pages/Freemcbjam-Community/263502307119653" },
    function (response) {
        alert(response);
    }
    );
}



function postToFeed() {

    // calling the API ...
    var obj = {
        method: 'feed',
        redirect_uri: 'www.mcbjam.com',
        link: 'http://mafreemcbjam.zapto.org/mcbjam7/customizephoto.html',
        picture: $('#image1').attr('src'),
        name: 'Customize Your Photo',
        caption: 'Reference Documentation',
        description: 'Using Dialogs to interact with users.',
        source: 'dataimage',
    };
    function callback(response) {
        document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
    }
    FB.ui(obj, callback);
}


