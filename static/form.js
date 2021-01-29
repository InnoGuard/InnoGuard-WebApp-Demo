$(document).ready(function() {

    $("#sendbtn").on('click', function() {
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
            }
        });
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
