$( document ).ready( function(){
  $( "#outputDiv" ).on( 'click', '#deactivateButton', function(){
    console.log('inside deactivateButton');
    // $(this).
    //how do I target just the button and the name its associated to?
        var updateUserId = $(this).attr('data-id');
        console.log("this id = " + updateUserId);
        var updateUser = {
          "active": false,
          "id": updateUserId
        }; // close object
        $.ajax({
          type: 'POST',
          url: '/updateUser',
          data: updateUser
        }); // end ajax
  }); // end deactivate button

  $( "#outputDiv" ).on( 'click', '#deleteButton', function(){
    console.log('inside deleteButton');
    // $(this).
    //how do I target just the button and the name its associated to?
        var delUserId = $(this).attr('data-id');
        console.log("this id = " + delUserId);
        var delUser = {
          "id": delUserId
        }; // close object
        $.ajax({
          type: 'POST',
          url: '/deleteUser',
          data: delUser
        }); // end ajax
        $(this).remove();
  }); // end deactivate button

  $( '#addButton' ).on( 'click', function(){
    // get username from input
    var newUserName = $( '#usernameIn' ).val();
    // create object to post
    var newUser={
      "username": newUserName,
      "active": true
    };// end object

    // send object to server as a post
    $.ajax({
      type: 'POST',
      url: '/createNew',
      data: newUser
    }); // end ajax
  }); // end addbutton



  $('#getUsers').on('click', function(){
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      success: function( data ){
      showUsers( data );
      } // end success
    }); //end ajax
  });

  function showUsers( users ){
    console.log( 'in showUsers:' + users );
    for( i=0; i<users.length; i++ )
    {
      // var userDiv = "<div>" + userOut + userButton + "</div>";
      var something = document.createElement('div');
      var userOut = "<p>" + users[ i ].username + ", active: " + users[ i ].active + " created: " + users[ i ].created + "</p>";
      something.textContent = userOut;
      $('body').append( something );
      var userButton = "<button id='deactivateButton' data-id='" + users[ i ].id + "'>Deactivate " + users[ i ].username + "</button>";
      $('body').append( userButton );
      var deleteButton = "<button id='deleteButton' data-id='" + users[ i ].id + "'>Delete " + users[ i ].username + "</button>";
      $('body').append( deleteButton );
    } // end for loop
  } // end show users

}); // end jQuery
