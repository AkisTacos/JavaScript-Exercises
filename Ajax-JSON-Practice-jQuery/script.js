// Code goes here
$(function(){

  // cache DOM
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  function addOrder(order){
    $orders.append('<li>name: ' + order.name + ', drink:' + order.drink + '</li');
  }

  $.ajax({
    type: 'GET',
    url: "",
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
      url: "",
      data: order,
      success: function(newOrder){
        addOrder(newOrder);
      },
      error: function(){
        alert('error saving order');
      }
    });

  });

});