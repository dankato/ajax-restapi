$(function() {
  // get/read
  $('#get-button').on('click', function() {
    console.log('get clicked');
    $.ajax({
      url: '/products',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        const tbodyElement = $('tbody');
        tbodyElement.html('');
        response.products.forEach(function(product) {
          tbodyElement.append('\
            <tr>\
              <td class="id">' + product.id + '</td>\
              <td>\
                <input type="text" class="name" value=" ' + product.name + ' "></td>\
                <td>\
                  <button class="update-button">UPDATE/PUT</button>\
                  <button class="delete-button">DELETE</button>\
                </td>\
            </tr>\
          ');
        });
      }
    });
  });

  // create/post
  $('#create-form').on('submit', function(event) {
    event.preventDefault();
    const createInput = $('#create-input');
    $.ajax({
      url: '/products',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name: createInput.val() }),
      success: function(response) {
        console.log(response);
        createInput.val('');
        $('#get-button').click();
      }
    })
  })

  // update/put
  $('table').on('click', '.update-button', function() {
    const rowElement = $(this).closest('tr');
    const id = rowElement.find('.id').text();
    const newName = rowElement.find('.name').val();

    $.ajax({
      url: '/products/' + id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newName: newName }),
      success: function(response) {
        console.log(response);
        $('#get-button').click();
      }
    });
  });
});
