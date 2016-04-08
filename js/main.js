$( document ).ready(function() {

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
    categoryItem.animate({scrollLeft: 1000}, 1000);
  })
  .mouseleave(function() {
    categoryItem.stop();
  });

});
