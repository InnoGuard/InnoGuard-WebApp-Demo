$(document).ready(function() {

    $.ajax({
        data: {
            msg_txt: $('#msg_txt').val(),
            // put images and audio next
        },
        type: 'POST',
        url: '/'
    })
    .done(function(data) {
        if (data.error) {
            $('#errorAlert').text(data.error).show();
            $('successAlert'.hide());
        }
        else {
            $('successAlert').text(data.name).show();
            $('#errorAlert').hide();
        }

    });

    event.preventDefault();
})