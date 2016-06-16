$( document ).ready( function(){
  $( "#outputUserList" ).on( 'click', '#deactivateButton', function(){
    console.log('inside deactivateButton');
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
        $('#active').text('false');
  }); // end deactivate button

  $( "#outputUserList" ).on( 'click', '#deleteButton', function(){
    console.log('inside deleteButton');

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
        // $('#line').remove();
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
    // return and append to dom

  }); // end addbutton



  $('#getUsers').on('click', function(){
    $.ajax({
      type: 'GET',
      url: '/getUsers',
      success: function( data ){
      showUsers( data );
      console.log('in getUsers data: ' + data);
      } // end success
    }); //end ajax
  });

  function showUsers( users ){
    console.log( 'in showUsers:' + users );
    for( i=0; i<users.length; i++ )
    {
      $( '#usernameIn' ).val( "" );
      // document.getElementById('outputUserList').innerHTML = '';

      // var userOut = "<p>" + users[ i ].username + ", active: " + users[ i ].active + " created: " + users[ i ].created + "</p>";
      // $('#outputDiv').append( userOut );
      var userButton = "<button class='btn' id='deactivateButton' data-id='" + users[ i ].id + "'>deactivate " + "</button>";
      // $('#outputDiv').append( userButton );
      var deleteButton = "<button class='btn' id='deleteButton' data-id='" + users[ i ].id + "'>delete " + "</button>";
      // $('#outputDiv').append( deleteButton );

      var userLine = '<td>' + users[i].id + '</td>' + '<td>' + users[i].username + '</td>' + '<td id="active">' + users[i].active + '</td>' + '<td>' + users[i].created + '</td>' + '<td>' + userButton + '</td>' + '<td>' + deleteButton + '</td>';
      document.getElementById('outputUserList').innerHTML += '<tr id="line">' + userLine + '<tr>';

    } // end for loop
  } // end show users

}); // end jQuery
