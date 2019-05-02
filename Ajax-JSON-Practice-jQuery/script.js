// Code goes here
// RESTful get post put delete
$(function(){

  // cache DOM
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  var orderTemplate = $('#order-template').html();

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

  $orders.delegate('.remove', 'click', function() {
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: "http://localhost:3000/posts/" + $(this).attr('data-id'),
      success: function(){
        $li.fadeOut(500, function(){
          $(this).remove();
        });
      }
    });
  });

  $orders.delegate('.editOrder', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.name').val( $li.find('span.name').html() );
    $li.find('input.drink').val( $li.find('span.drink').html() );
    $li.addClass('edit');
  });

  $orders.delegate('.cancelEdit', 'click', function(){
    $(this).closest('li').removeClass('edit');
  });

  $orders.delegate('.saveEdit', 'click', function() {
    var $li = $(this).closest('li');
    var order = {
      name: $li.find('input.name').val(),
      drink: $li.find('input.drink').val()
    };

    $.ajax({
      type: 'PUT',
      url: "http://localhost:3000/posts/" + $li.attr('data-id'),
      data: order,
      success: function(newOrder){
        $li.find('span.name').html(order.name);
        $li.find('span.drink').html(order.drink);
        $li.removeClass('edit');
      },
      error: function() {
        alert('error updating order');
      }

    });

  });


});
