$(document).ready(function() {
  // Add item to list
  $('#add-form').submit(function(event) {
    event.preventDefault();
    var newItem = $('#new-item').val();
    var newDueDate = $('#new-item-due-date').val();
    var newDueTime = $('#new-item-due-time').val();
    $('#item-list').append('<li><input type="checkbox" class="checkbox"><div class="item"><p class="item-text">' + newItem + '</p></div><span class="due-date">' + newDueDate + ' ' + newDueTime + '</span><button type="button" class="delete">Delete</button></li>');
    $('#new-item').val('');
    $('#new-item-due-date').val('');
    $('#new-item-due-time').val('');
  });
  
  // Check/uncheck item
  $(document).on('change', '.checkbox', function() {
    if ($(this).prop('checked')) {
      $(this).parent().addClass('completed');
      $(this).siblings('.item').children('.item-text').css('text-decoration', 'line-through');
    } else {
      $(this).parent().removeClass('completed');
      $(this).siblings('.item').children('.item-text').css('text-decoration', 'none');
    }
  });
  
  // Delete item
  $(document).on('click', '.delete', function() {
    $(this).parent().remove();
  });
  
  // Set reminder for due date
  setInterval(function() {
    $('.due-date').each(function() {
      var dueDate = new Date($(this).text());
      var currentDate = new Date();
      if (dueDate < currentDate) {
        $(this).siblings('.item').addClass('overdue');
        $(this).after('<span class="reminder">Reminder: ' + $(this).siblings('.item').children('.item-text').text() + ' is overdue!</span>');
      }
    });
  }, 60000); // Check every minute
});
        