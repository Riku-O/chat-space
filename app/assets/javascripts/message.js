$(function () {
  function buildHTML(message) {
    if (message.image) {
      var image = `<img class="message-text__image" src=${message.image}>`;
    } else {
      var image = "";
    }
    var html = `<div class='message'>
                  <div class='message-info'>
                    <div class='message-info__name'>
                      ${message.name}
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
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    console.log("あああ")
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
        console.log(data);

        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 'fast');
        $(".form__submit-btn").prop('disabled', false);
        $("#new_message")[0].reset();
      })
      .fail(function (data) {
        console.log(data);
        alert('error');
      });
  });
});
