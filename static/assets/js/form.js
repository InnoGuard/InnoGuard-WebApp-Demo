function sendResponse() {
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', '/tisane', true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // // console.log( $('#msg_txt').val())
    // console.log("state", xhr.onreadystatechange)
    // xhr.send(JSON.stringify({
    //     data: $('#msg_txt').val()
    // }))

    // response = xhr.response
    // $('.modal-body').html(response);
    // $('#tisaneModal').modal('show');
    
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/tisane",
        data: {
            msg_txt: $('#msg_txt').val(),
        },
        success: function(data) {
            // console.log(data)
            tisane_result = data.result
            if(tisane_result.abuse)
            {
                formatted_result = {
                    type : tisane_result.abuse[0].type,
                    severity : tisane_result.abuse[0].severity,
                    tags : tisane_result.abuse[0].tags
                }
            }
            else formatted_result = "No abuse detected."
            console.log(formatted_result)
            //Now construct a quick list element
            var li = "<li class='messages__item messages__item--operator'>" + data.msg_txt + "</li>";
            //Now use appendChild and add it to the list!
            $('#success').append(li).show();
            $("#msg_txt").val('');
            $('.modal-body').html(JSON.stringify(formatted_result));
            $('#tisaneModal').modal('show');
        },
      });
}

function sendImage() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/gcv",
        data: {
            msg_image: $('#msg_image').val(),
        },
        success: function(data) {
            // console.log(data)
            gcv_result = data.result
            if(gcv_result)
            {
                formatted_result = {
                    type : gcv_result,
                }
            }
            else formatted_result = "No abuse detected."
            console.log(formatted_result)
            // //Now construct a quick list element
            // var li = "<li class='messages__item messages__item--operator'>" + data.msg_txt + "</li>";
            // //Now use appendChild and add it to the list!
            // $('#success').append(li).show();
            // $("#msg_txt").val('');
            $('.modal-body').html(JSON.stringify(formatted_result));
            $('#tisaneModal').modal('show');
        },
      });
}



function SendData() {
    $.ajax({
        data : {
            msg_txt: $('#msg_txt').val(),
            response: data.response
            // put images and audio next
        },
        type : 'POST',
        url : '/',
    })
    .done(function(data) {
        if (data.error) {
            $('#errorAlert').text(data.error).show();
            $('#success').hide();
        }
        else {
            //Now construct a quick list element
            var li = "<li class='messages__item messages__item--operator'>" + data.msg_txt + "</li>";
            //Now use appendChild and add it to the list!
            $('#success').append(li).show();
            // do code for modal here, so as soon as something is sent, it checks 
            // TODO: SEND THE TEST TO TISANE API, GRAB RESULTS AND DISPLAY IN MODAL
            // $('#success').text(data.msg_txt).show();
            $('#errorAlert').hide();
            $('.modal-body').html(data.response);
            $('#tisaneModal').modal('show');
            // if (data.msg_txt == 'Go die you fat person!') {
            //     $('#tisaneModal').modal('show');
            // }
            // if (data.msg_txt == "You're fat and ugly!") {
            //     $('#tisaneModal2').modal('show');
            // }
            // if (data.msg_txt == 'Asians are dumb') {
            //     $('#tisaneModal3').modal('show');
            // }
            // if (data.msg_txt == 'Take off your clothes') {
            //     $('#tisaneModal4').modal('show');
            // }

            // if (data.msg_txt == 'Buss ah wine!') {
            //     $('#tisaneModal5').modal('show');
            // }
            $("#msg_txt").val('');
        }
    });
}

function SendFile() {
    // var form_data = new FormData(document.getElementById("#IGuploads"));
    var form_data = new FormData($('#IGuploads')[0]);
    //fd.append("CustomField", "This is some extra data");
    $.ajax({
        url: '/gcv',  
        type: 'POST',
        data: form_data,
        success:function(response){
            if(response != 0){
                // $("#img").attr("src",response); 
                $(".preview").show(); // Display image element
                $('.modal-body').html(JSON.stringify(response));
                $('#tisaneModal').modal('show');
                // $('#googleVisionModal').modal('show');
             }
            //  else{
            //     alert('file not uploaded');
            //  }
        },
        cache: false,
        contentType: false,
        processData: false
    })
    // .done(function(data) {  
    //     if (data.error) {
    //         $('#errorAlert').text(data.error).show();
    //         $(".preview img").hide();
    //         // $('#success'.hide());
    //     }
    //     else {
    //         $(".preview img").show();
    //         // $('.preview').html(data);
    //         $('#errorAlert').hide();
    //     }
    // });
}

$(document).ready(function() {

    // If enter is pressed, send data
    $('#msg_txt').keypress(function(e) {
        if(e.which == 13) {
            // alert('You pressed enter!');
            sendResponse();
            e.preventDefault();
        }
    });

    // $("#msg_txt").keyup(function(event){
    //     if(event.keyCode == 13){
    //         //call send data function here
    //         console.log("test");
    //         SendData();
    //     } });

    // If the "Send" button is clicked, send data
    $("#sendbtn").on('click', function() {
        // SendData();
        SendFile();
    })

    // $('form').on('submit', function(event) {

    //     $.ajax({
    //         data : {
    //             msg_txt: $('#msg_txt').val(),
    //             // put images and audio next
    //         },
    //         type : 'POST',
    //         url : '/'
    //     })
    //     .done(function(data) {
    //         if (data.error) {
    //             $('#errorAlert').text(data.error).show();
    //             $('#success'.hide());
    //         }
    //         else {
    //             //Now construct a quick list element
    //             var li = "<li>" + data.msg_txt + "</li>";
    //             //Now use appendChild and add it to the list!
    //             $('#success').appendChild(li).show();
    //             // $('#success').text(data.msg_txt).show();
    //             $('#errorAlert').hide();
    //         }

    //     });

    //     event.preventDefault();

    // });
});


// $(document).ready(function (e) {
//     $('#upload').on('click', function () {
//         var form_data = new FormData();
//         var ins = document.getElementById('multiFiles').files.length;
        
//         if(ins == 0) {
//             $('#msg').html('<span style="color:red">Select at least one file</span>');
//             return;
//         }
        
//         for (var x = 0; x < ins; x++) {
//             form_data.append("files[]", document.getElementById('multiFiles').files[x]);
//         }
        
//         $.ajax({
//             url: '/', // point to server-side URL
//             dataType: 'json', // what to expect back from server
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: form_data,
//             type: 'POST',
//             success: function (response) { // display success response
//                 $('#msg').html('');
//                 $.each(response, function (key, data) {							
//                     if(key !== 'message') {
//                         $('#msg').append(key + ' -> ' + data + '<br/>');
//                     } else {
//                         $('#msg').append(data + '<br/>');
//                     }
//                 })
//             },
//             error: function (response) {
//                 $('#msg').html(response.message); // display error response
//             }
//         });
//     });
// });
