// scroll smooth
$( document ).ready(function() {
  $('a[href="#top"]').click(goTop);
  function goTop() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      console.log(target);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  };
});


// menu collapse
function openMenuAction(event) {
  event.preventDefault();
  $('#menu-toggle').css("display", "block");
  $('#menu-content').animate({
    left: "0"
  }, 300);
  $('html').addClass('noscroll');
};
function closeMenuAction(event){
  event.preventDefault();
  $('#menu-content').animate({
    left: "-75%"
  }, 300, function() {
      $('#menu-toggle').css("display", "none");
  });
  $('html').removeClass('noscroll');
};
$( document ).ready(function() {
  $('#open-menu').click(openMenuAction);
  $('#close-menu').click(closeMenuAction);
});


// menu-item collapse
var menuItemClickAction = function(event){
  event.preventDefault();
  $(this).siblings().slideToggle(200, function(){
    $(this).siblings().toggleClass('active');
    $(this).parent().siblings().children('.menu-sub-items').slideUp(200, function(){
      $(this).siblings().removeClass('active');
    });
  });
};
$( document ).ready(function() {
  $('.menu-collapse').click(menuItemClickAction);
});


// category collapse  (product list page)
$( document ).ready(function() {
  $('.category-title').click(function(event) {
    event.preventDefault();
    $(this).siblings('.sub-category').slideToggle("fast");
    $(this).toggleClass('active');
  });
});


// product detail image switch
var switchImage = function(event) {
  event.preventDefault();
  var lg = $(this).children('img').data('lg');
  var xl = $(this).children('img').data('xl');
  $('#image-view').children('img').attr('src', lg).data('url', xl);
}
$( document ).ready(function() {
  $('.thumbnail-image').click(switchImage).hover(switchImage);
});


// image light box
$( document ).ready(function() {
  $('#image-view').click(function(event) {
    event.preventDefault();
    var url = $(this).children('img').data('url');
    $('#light-box').children('img').attr('src', url);
    $('#light-box').fadeIn(300);
    $('html').addClass('noscroll');
  });
  $('#light-box').click(function() {
    $(this).fadeOut(300);
    $(this).children('img').attr('src', "");
    $('html').removeClass('noscroll');
  });
  $('body').keypress(function(e){
    if(e.which == 27){
      $('#light-box').fadeOut(300);
      closePopout();
    }
  });
});


// ad-banner swipe
$( document ).ready(function() {
  $("#ad-carousel").swiperight(function() {
	  $(this).carousel('prev');
	});
  $("#ad-carousel").swipeleft(function() {
    $(this).carousel('next');
  });
});


// popout
function openPopout(target) {
  $(target).fadeIn('slow');
  $(target + ' .content').slideDown();
  $('html').addClass('noscroll');
}
function closePopout() {
  $('.popout-animation').children('.content').slideUp();
  $('.popout-animation').fadeOut('slow');
  $('.popout-animation .body').html('');
  $('html').removeClass('noscroll');
}
function addClosePopoutEvent() {
  var closePopoutClass = document.getElementsByClassName('close-popout')
  $('.close-popout').click(closePopout);
  $('.close-popout-area').click(closePopout);
};
function openMemberPopout(target) {
  closePopout();
  $('#popout').load('/popout/' + target, function() {
    openPopout('.' + target);
    addClosePopoutEvent();
  });
};
function openNoticePopout(target) {
  closePopout();
  $('#popout').load('/popout/' + target, function() {
    openPopout('.popout-notice');
    addClosePopoutEvent();
  });
};
$( document ).ready(function() {

  if ( $('head > title').text() == "會員登入") {
    $('header .login').removeClass('login');
  } else if ($('head > title').text() == "忘記密碼") {
    $('header .login').removeClass('login').attr('href', '/login');
  }

  $(document).on('click', '.login', function(e){
    e.preventDefault();
    openMemberPopout('popout-login');
  });
  $(document).on('click', '.forgot-pwd', function(e){
    e.preventDefault();
    openMemberPopout('popout-forgot-password');
  });

  var noticeArray = ["notice-add-cart-success", "notice-checkout-fail", "notice-register-success", "notice-search-fail"];
  for (var i = 0; i < noticeArray.length; i++) {
    $(document).on('click', '.' + noticeArray[i] ,function(e) {
      e.preventDefault();
      openNoticePopout( $(this).prop('class') );
    });
  }

});


// popout video
$(document).on('click', '.popout-video' ,function(e) {
  e.preventDefault();
  var videoPath = $(this).data('video');
  popoutAlert("none", videoPath);
});


// popout alert (state, message, durations)
  // popoutAlert("success", "success!", 3000);
  // popoutAlert("wrong", "wrong!", 5000);
function popoutAlert(state, message, durations) {
  openAlert(message, durations, state);
};
function openAlert(text, time, state) {
  text = typeof text !== 'undefined' ? text : "";
  time = typeof time !== 'undefined' ? time : "";
  state = typeof state !== 'undefined' ? state : "";
  closePopout();
  $('#popout').load('/popout/popout-alert', function() {
    if (state == "success") {
      $('.popout .message').html(text).parent().prepend('<i class="material-icons notice-icon icon-with-circle">&#xE876;</i>');
    } else if (state == "wrong") {
      $('.popout .message').html(text).parent().prepend('<i class="material-icons notice-icon icon-yellow">&#xE000;</i>');
    } else {
      $('.popout .body').html(text).prepend('<img class="ratio" src="/image/16x9.png"/>');
      $('.popout .close-popout').hide();
      $('.popout .head').hide();
      $('.popout .content').css("max-width", '90%');
    }//endif
    openPopout('.popout-notice');
    addClosePopoutEvent();
    if ( time !== "") {
      setTimeout(function(){
        closePopout();
      }, time);
    } //end if
  });
};
$(document).on('click', '.popout-alert-success' ,function(e) {
  e.preventDefault();
  popoutAlert("success", "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet");
});
$(document).on('click', '.popout-alert-wrong' ,function(e) {
  e.preventDefault();
  popoutAlert("wrong", "錯誤提示<br>三秒後自動關閉", 3000);
});


// category bar hover scroll
$( document ).ready(function() {
  var categoryWidth = 0;
  var scrollWidth = 0;
  var categoryNumbers = $('#header-category-bar > li').length;

  for (var i = 0; i < categoryNumbers; i++) {
    categoryWidth += $('#header-category-bar > li' + ':nth-child(' + i + ')').width();
  }
  scrollWidth = categoryWidth - $('#header-category-bar').width();

  var categoryItem = $('.category > ul');
  $('.arrow-left')
  .mouseenter(function() {
    categoryItem.animate({scrollLeft: 0}, 1000);
  })
  .mouseleave(function(){
    categoryItem.stop()
  });

  $('.arrow-right')
  .mouseenter(function() {
    categoryItem.animate({scrollLeft: scrollWidth+300}, 1000);
  })
  .mouseleave(function() {
    categoryItem.stop();
  });
});


// product quantity
var target = {};
var quantity = 1;
var thisButton = {};

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
function removeConfirm() {
  var retVal = confirm("確定要從購物車移除?");
  if( retVal == true ){
    //do remove item
    quantity = 0;
  }
  else{
    quantity = 1;
  }
};
function quantityCounting(operating) {
  thisButton.parent().siblings('input').val(function(){
    var currentQuantity =  Number($(this).val());
    if (operating == "-") {
      if ( $(this).val() <= 1 ) {
        removeConfirm();
        return quantity;
      } else {
        thisButton.addClass('active'); //set active class to btn
        quantity = currentQuantity - 1;
        thisButton.removeClass('active');
        return quantity;
      }
    } else {
      thisButton.addClass('active');
      quantity = currentQuantity + 1;
      thisButton.removeClass('active');
      return quantity;
    }
  });
};

$( document ).ready(function() {

  $('.quantity-minus > button').click(function(event){
    event.preventDefault();
    thisButton = $(this);
    quantityCounting("-");
  });
  $('.quantity-plus > button').click(function(event){
    event.preventDefault();
    thisButton = $(this);
    quantityCounting("+");
  });
  $('.quantity-step > input').keyup(function(){
    if ( Number($(this).val()) <= 0 || isNaN($(this).val() / 1) ) {
      quantity = 0;
    } else {
      quantity = $(this).val();
    }
    $(this).val(quantity);
  });

});
