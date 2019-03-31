// Code goes here
$(function(){

  // cache DOM
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  var orderTemplate = "" +
  "<li>" +
  "<p><strong>Name:</strong> {{name}}</p>" +
  "<p><strong>Drink:</strong> {{drink}}</p>" +
  "<button data-id='{{id}}' class='remove'>X</button" +
  "</li>";

  function addOrder(order){
    $orders.append(Mustache.render(orderTemplate,order));
  }

  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/posts",
    success: function(orders){
      $.each(orders, function(i, order){
        // $orders.append('<li>my order</li>');
        addOrder(order);
      });

      // console.log('success', orders);
    },
    error: function(){
      alert('error loading orders');
    }
  });

  $('#add-order').on('click', function(){

    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };

    $.ajax({
      type: 'POST',
      url: "http://localhost:3000/posts",
      data: order,
      success: function(newOrder){
        addOrder(newOrder);
      },
      error: function(){
        alert('error saving order');
      }
    });

  });

  $('.remove').on('click', function() {
    $.ajax({
      type: 'DELETE',
      url: '/api/orders/' + $(this).attr('data-id');
    });
  })

});
