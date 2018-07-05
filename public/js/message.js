    $(function() {
        loadAllContact();
        messagesScrollTop();
    });

    var socket = io();
    var room_name;
    var username = $("#username").val();
    var sent_id = $("#sent-id").val();
    var replies_id;

    function messagesScrollTop() {
        $(".messages").animate({
            scrollTop : $(document).height()
        }, "fast");
    };

    function loadAllContact() {
        
        var data = {};
            data.username = username;
                
        $.ajax({
            type: 'GET',
            //data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/messages/contacts/'+username,  
            //url: '/messages/contacts',                    
            success: function(data) {
                var contact = "";
                $.each(data, function(i, item) {
                    if(i == 0){
                        $("#replies-name").html(item.username);
                        replies_id = item._id;
                    }
                    contact += '<li class="contact '+(i == 0 ? 'active' : '') +'" id="'+item._id+'" >';
                    contact += '<div class="wrap">';
                    contact += '<span class="contact-status online"></span> ';
                    contact += '<img src="/images/replies.png" alt="" />';
                    contact += '<div class="meta">';
                    contact += '<p class="name">'+item.username+'</p>';
                    contact += '</div>';
                    contact += '</div>';
                    contact += '</li>';
                });
                $(contact).appendTo($('#contact-list')); 
                loadHistory(sent_id, replies_id);

                $('.contact').click(function() {
                    $( ".contact" ).each(function() {
                        $(this).removeClass( "active" );
                    });
                    $(this).addClass( "active" );
                    loadHistory(sent_id, $(this).attr("id"));

                });

            }
        });
    };

    function loadHistory(sent_id, replies_id) {
        var data = {};
            data.sent_id = sent_id;
            data.replies_id = replies_id;
                
        $.ajax({
            type: 'GET',
            //data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/messages/histories/'+sent_id+'/'+replies_id,                      
            success: function(data) {
                room_name = data.room_name;
                $("#replies-name").html(data.replies_name);
                $("#chat-history").html(null);
                $.each(data.history, function(i, item) {
                    if (item.sent == sent_id) {
                        $('<li class="sent"><img src="/images/sent.png" alt="" /><p>'
                        + item.message + '</p></li>').appendTo($('.messages ul'));
                    } else {
                        $('<li class="replies"><img src="/images/replies.png" alt="" /><p>'
                        + item.message + '</p></li>').appendTo($('.messages ul'));
                    }
                    $('.message-input input').val(null);
                });
                messagesScrollTop();
            }
        });
    }

    function newMessage() {
        var message = $(".message-input input").val();
        if ($.trim(message) == '') {
            return false;
        }
        var data = {};
            data.room_name = room_name;
            data.sent_id = sent_id;
            data.replies_id = replies_id;
            data.message = message;
                
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/messages/save',                      
            success: function(data) {

                socket.emit('chat', {
                    room_name: room_name,
                    username: username,
                    message: message
                });

            }
        });

    };

    socket.on('chat', function(data) {
        if(data.room_name == room_name){
            if (data.username == username) {
                $('<li class="sent"><img src="/images/sent.png" alt="" /><p>'
                + data.message + '</p></li>').appendTo($('.messages ul'));
            } else {
                $('<li class="replies"><img src="/images/replies.png" alt="" /><p>'
                + data.message + '</p></li>').appendTo($('.messages ul'));
            }

            $('.message-input input').val(null);
            messagesScrollTop();
        }
        
    });

    $('.submit').click(function() {
        newMessage();
    });

    $(window).on('keydown', function(e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });

    $('#logout').click(function() {
        window.location.replace("http://localhost:8080/");
    });