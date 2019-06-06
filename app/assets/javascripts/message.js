$(function () {
  function buildHTML(message) {
    var image = message.image ? `<img class="message-text__image" src=${message.image}>` : "";
    var html = `<div class='message' data-id=${message.id}>
                  <div class='message-info'>
                    <div class='message-info__name'>
                      ${message.user_name}
                    </div>
                    <div class='message-info__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='message-text'>
                    <p class='message-text__content'>
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $(window).bind("load", function () {
    if (document.URL.match("/messages")) {
      $('#new_message').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
          })
          .done(function (data) {
            var html = buildHTML(data);
            $('.messages').append(html);
            $('.messages').animate({
              scrollTop: $('.messages')[0].scrollHeight
            }, 'fast');
            $(".form__submit-btn").prop('disabled', false);
            $("#new_message")[0].reset();
          })
          .fail(function (data) {
            alert('error');
          });
      });

      var reloadMessages = function () {
        var last_message_id = $(".message").last().data("id");
        var group_id = $(".current-group").data("group-id");
        $.ajax({
            url: '/groups/' + group_id + '/api/messages',
            type: 'get',
            dataType: 'json',
            data: {
              id: last_message_id
            }
          })
          .done(function (messages) {
            messages.forEach(function (message) {
              var insertHTML = buildHTML(message);
              $('.messages').append(insertHTML);
              $('.messages').animate({
                scrollTop: $('.messages')[0].scrollHeight
              }, 'fast');
            })
          })
          .fail(function () {
            console.log('error');
          });
      };
      setInterval(reloadMessages, 5000);
    }
  });
});
