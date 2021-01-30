function SendData() {
    $.ajax({
        data : {
            msg_txt: $('#msg_txt').val(),
            // put images and audio next
        },
        type : 'POST',
        url : '/'
    })
    .done(function(data) {
        if (data.error) {
            $('#errorAlert').text(data.error).show();
            $('#success'.hide());
        }
        else {
            //Now construct a quick list element
            var li = "<li class='messages__item messages__item--operator'>" + data.msg_txt + "</li>";
            //Now use appendChild and add it to the list!
            $('#success').append(li).show();
            // do code for modal here, so as soon as something is sent, it checks it
            // $('#success').text(data.msg_txt).show();
            $('#errorAlert').hide();
            $("#msg_txt").val('');
        }
    });
}

$(document).ready(function() {

    // If enter is pressed, send data
    $('#msg_txt').keypress(function(e) {
        if(e.which == 13) {
            // alert('You pressed enter!');
            SendData();
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
        SendData();
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
