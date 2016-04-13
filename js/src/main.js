$( document ).ready(function() {

  // scroll smooth
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

  // scroll page
  var windowWidth = $(window).width();
  if (windowWidth < 768) {
    $('html, body').scrollTop(50);
  }

  // menu collapse
  function openMenuAction(event) {
    // event.preventDefault();
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

  var openMenu = document.getElementById('open-menu');
  openMenu.addEventListener('click', openMenuAction);

  var closeMenu = document.getElementById('close-menu');
  closeMenu.addEventListener('click', closeMenuAction);

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

  $('.menu-collapse').click(menuItemClickAction);

  // category collapse
  $('.category-title').click(function(event) {
    event.preventDefault();
    $(this).siblings('.sub-category').slideToggle("fast");
    $(this).toggleClass('active');
  });

  // product detail image switch
  var switchImage = function(event) {
    event.preventDefault();
    var lg = $(this).children('img').data('lg');
    var xl = $(this).children('img').data('xl');
    $('#image-view').children('img').attr('src', lg).data('url', xl);
  }
  $('.thumbnail-image').click(switchImage).hover(switchImage);

  // image light box
  $('#image-view').click(function(event) {
    event.preventDefault();
    var url = $(this).children('img').data('url');
    $('#light-box').children('img').attr('src', url);
    $('#light-box').fadeIn(300);
    $('html').addClass('noscroll');
  });
  $('#light-box').click(function() {
    $(this).fadeOut(300);
    $('html').removeClass('noscroll');
  });

  $('body').keypress(function(e){
    if(e.which == 27){
      $('#light-box').fadeOut(300);
      closePopout();
    }
  });

  // ad-banner swipe
  $("#ad-carousel").swiperight(function() {
	  $(this).carousel('prev');
	});
  $("#ad-carousel").swipeleft(function() {
    $(this).carousel('next');
  });

  // popout
  if ( $('head > title').text() == "會員登入") {
    $('header .login').removeClass('login');
  } else if ($('head > title').text() == "忘記密碼") {
    $('header .login').removeClass('login').attr('href', '/login');
  }
  function openPopout(target) {
    $(target).fadeIn('slow');
    $(target + ' .content').slideDown();
    $('html').addClass('noscroll');
  }
  function closePopout() {
    $('.popout-animation').children('.content').slideUp();
    $('.popout-animation').fadeOut('slow');
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
    $('#popout').load('/popout/' + target, function() {
      closePopout();
      openPopout('.popout-notice');
      addClosePopoutEvent();
    });
  };

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
    $('#popout').load('/popout/popout-alert', function() {
      closePopout();
      if (state == "success") {
        $('.popout .message').html(text).parent().prepend('<i class="material-icons notice-icon icon-with-circle">&#xE876;</i>');
      } else if (state == "wrong") {
        $('.popout .message').html(text).parent().prepend('<i class="material-icons notice-icon icon-yellow">&#xE000;</i>');
      } //endif
      openPopout('.popout-notice');
      addClosePopoutEvent();
      if ( time !== "") {
        setTimeout(function(){
          closePopout();
        }, time);
      } //end if
    });
  };

  // category bar hover scroll
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

  // product quantity
  var target = {};
  var quantity = 1;
  var price = 0;
  var thisButton = {};

  function removeConfirm() {
    // if ( $('#shoppingCart') ) {
    //   console.log("in shopping cart!");
    // }
    var retVal = confirm("確定要從購物車移除?");
    if( retVal == true ){
      //do remove item
      quantity = 0;
    }
    else{
      quantity = 1;
    }
  };
  function totalPriceCounting() {
    var eachPrice = [];
    var subTotalPrice = 0;
    eachPrice = $('.pricing > .price');
    for (var i = 0; i < eachPrice.length; i++) {
      subTotalPrice += Number( $(eachPrice[i]).attr('data-total-price') );
    }
    $('#sub-total-price').text(function() {
      return subTotalPrice;
    });
    $('#sub-total-price').attr('data-sub-total-price', function() {
      return subTotalPrice;
    });
    $('#total-price').text(function() {
      return subTotalPrice + $('#shipping-cost').data('shipping-cost');
    });
  };
  function quantityCounting(operating) {
    thisButton.parent().siblings('input').val(function(){
      if (operating == "-") {
        if ( $(this).val() <= 1 ) {
          removeConfirm();
          return quantity;
        } else {
          quantity = Number($(this).val()) - 1;
          return quantity;
        }
      } else {
        quantity = Number($(this).val()) + 1;
        return quantity;
      }
    });
  };
  function priceCounting() {
    target = thisButton.parents('.quantity-step').parent().siblings('.pricing').children('.price');
    target.text(function(){
      return quantity * $(this).data('price');
    });
    target.attr('data-total-price', function() {
      return quantity * $(this).data('price');
    });
    totalPriceCounting();
  };
  $('.quantity-minus > button').click(function(){
    thisButton = $(this);
    quantityCounting("-");
    priceCounting();
  });
  $('.quantity-plus > button').click(function(){
    thisButton = $(this);
    quantityCounting("+");
    priceCounting();
  });
  $('.quantity-step > input').keyup(function(){
    console.log( );
    if ( Number($(this).val()) <= 0 || isNaN($(this).val() / 1) ) {
      quantity = 0;
    } else {
      quantity = $(this).val();
    }
    thisButton = $(this);
    priceCounting();
  });
  totalPriceCounting();

});
