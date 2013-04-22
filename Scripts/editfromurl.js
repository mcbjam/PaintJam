
$(document).ready(function () {

    $("#editfromurl").click(editfromurl);
})

function editfromurl() {
    var src = $('#url').val();
    var img = new Image();
    $('#loader').empty();
    // wrap our new image in jQuery, then:
    $(img)
      // once the image has loaded, execute this code
      .load(function () {
          // set the image hidden by default    
          $(this).hide();

          // with the holding div #loader, apply:
          $('#loader')
            // remove the loading class (so no background spinner), 
            .removeClass('loading')
            // then insert our image
            .append(this);
          // fade our image in to create a nice effect
          $(this).fadeIn();
          launchEditor('image1', src);
      })

      // if there was an error loading the image, react accordingly
      .error(function () {
          alert('Choose a valid mage URL');
      })
      // *finally*, set the src attribute of the new image to our image
      .attr('src', src);
}