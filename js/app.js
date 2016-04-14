!function(t){var e=function(e,s){this.element=t(e);this.format=i.parseFormat(s.format||this.element.data("date-format")||"mm/dd/yyyy");this.picker=t(i.template).appendTo("body").on({click:t.proxy(this.click,this)});this.isInput=this.element.is("input");this.component=this.element.is(".date")?this.element.find(".add-on"):false;if(this.isInput){this.element.on({focus:t.proxy(this.show,this),keyup:t.proxy(this.update,this)})}else{if(this.component){this.component.on("click",t.proxy(this.show,this))}else{this.element.on("click",t.proxy(this.show,this))}}this.minViewMode=s.minViewMode||this.element.data("date-minviewmode")||0;if(typeof this.minViewMode==="string"){switch(this.minViewMode){case"months":this.minViewMode=1;break;case"years":this.minViewMode=2;break;default:this.minViewMode=0;break}}this.viewMode=s.viewMode||this.element.data("date-viewmode")||0;if(typeof this.viewMode==="string"){switch(this.viewMode){case"months":this.viewMode=1;break;case"years":this.viewMode=2;break;default:this.viewMode=0;break}}this.startViewMode=this.viewMode;this.weekStart=s.weekStart||this.element.data("date-weekstart")||0;this.weekEnd=this.weekStart===0?6:this.weekStart-1;this.onRender=s.onRender;this.fillDow();this.fillMonths();this.update();this.showMode()};e.prototype={constructor:e,show:function(e){this.picker.show();this.height=this.component?this.component.outerHeight():this.element.outerHeight();this.place();t(window).on("resize",t.proxy(this.place,this));if(e){e.stopPropagation();e.preventDefault()}if(!this.isInput){}var i=this;t(document).on("mousedown",function(e){if(t(e.target).closest(".datepicker").length==0){i.hide()}});this.element.trigger({type:"show",date:this.date})},hide:function(){this.picker.hide();t(window).off("resize",this.place);this.viewMode=this.startViewMode;this.showMode();if(!this.isInput){t(document).off("mousedown",this.hide)}this.element.trigger({type:"hide",date:this.date})},set:function(){var t=i.formatDate(this.date,this.format);if(!this.isInput){if(this.component){this.element.find("input").prop("value",t)}this.element.data("date",t)}else{this.element.prop("value",t)}},setValue:function(t){if(typeof t==="string"){this.date=i.parseDate(t,this.format)}else{this.date=new Date(t)}this.set();this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0);this.fill()},place:function(){var t=this.component?this.component.offset():this.element.offset();this.picker.css({top:t.top+this.height,left:t.left})},update:function(t){this.date=i.parseDate(typeof t==="string"?t:this.isInput?this.element.prop("value"):this.element.data("date"),this.format);this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0);this.fill()},fillDow:function(){var t=this.weekStart;var e="<tr>";while(t<this.weekStart+7){e+='<th class="dow">'+i.dates.daysMin[t++%7]+"</th>"}e+="</tr>";this.picker.find(".datepicker-days thead").append(e)},fillMonths:function(){var t="";var e=0;while(e<12){t+='<span class="month">'+i.dates.monthsShort[e++]+"</span>"}this.picker.find(".datepicker-months td").append(t)},fill:function(){var t=new Date(this.viewDate),e=t.getFullYear(),s=t.getMonth(),a=this.date.valueOf();this.picker.find(".datepicker-days th:eq(1)").text(i.dates.months[s]+" "+e);var n=new Date(e,s-1,28,0,0,0,0),o=i.getDaysInMonth(n.getFullYear(),n.getMonth());n.setDate(o);n.setDate(o-(n.getDay()-this.weekStart+7)%7);var r=new Date(n);r.setDate(r.getDate()+42);r=r.valueOf();var l=[];var c,h,d;while(n.valueOf()<r){if(n.getDay()===this.weekStart){l.push("<tr>")}c=this.onRender(n);h=n.getFullYear();d=n.getMonth();if(d<s&&h===e||h<e){c+=" old"}else if(d>s&&h===e||h>e){c+=" new"}if(n.valueOf()===a){c+=" active"}l.push('<td class="day '+c+'">'+n.getDate()+"</td>");if(n.getDay()===this.weekEnd){l.push("</tr>")}n.setDate(n.getDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(l.join(""));var u=this.date.getFullYear();var p=this.picker.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");if(u===e){p.eq(this.date.getMonth()).addClass("active")}l="";e=parseInt(e/10,10)*10;var f=this.picker.find(".datepicker-years").find("th:eq(1)").text(e+"-"+(e+9)).end().find("td");e-=1;for(var m=-1;m<11;m++){l+='<span class="year'+(m===-1||m===10?" old":"")+(u===e?" active":"")+'">'+e+"</span>";e+=1}f.html(l)},click:function(e){e.stopPropagation();e.preventDefault();var s=t(e.target).closest("span, td, th");if(s.length===1){switch(s[0].nodeName.toLowerCase()){case"th":switch(s[0].className){case"switch":this.showMode(1);break;case"prev":case"next":this.viewDate["set"+i.modes[this.viewMode].navFnc].call(this.viewDate,this.viewDate["get"+i.modes[this.viewMode].navFnc].call(this.viewDate)+i.modes[this.viewMode].navStep*(s[0].className==="prev"?-1:1));this.fill();this.set();break}break;case"span":if(s.is(".month")){var a=s.parent().find("span").index(s);this.viewDate.setMonth(a)}else{var n=parseInt(s.text(),10)||0;this.viewDate.setFullYear(n)}if(this.viewMode!==0){this.date=new Date(this.viewDate);this.element.trigger({type:"changeDate",date:this.date,viewMode:i.modes[this.viewMode].clsName})}this.showMode(-1);this.fill();this.set();break;case"td":if(s.is(".day")&&!s.is(".disabled")){var o=parseInt(s.text(),10)||1;var a=this.viewDate.getMonth();if(s.is(".old")){a-=1}else if(s.is(".new")){a+=1}var n=this.viewDate.getFullYear();this.date=new Date(n,a,o,0,0,0,0);this.viewDate=new Date(n,a,Math.min(28,o),0,0,0,0);this.fill();this.set();this.element.trigger({type:"changeDate",date:this.date,viewMode:i.modes[this.viewMode].clsName})}break}}},mousedown:function(t){t.stopPropagation();t.preventDefault()},showMode:function(t){if(t){this.viewMode=Math.max(this.minViewMode,Math.min(2,this.viewMode+t))}this.picker.find(">div").hide().filter(".datepicker-"+i.modes[this.viewMode].clsName).show()}};t.fn.datepicker=function(i,s){return this.each(function(){var a=t(this),n=a.data("datepicker"),o=typeof i==="object"&&i;if(!n){a.data("datepicker",n=new e(this,t.extend({},t.fn.datepicker.defaults,o)))}if(typeof i==="string")n[i](s)})};t.fn.datepicker.defaults={onRender:function(t){return""}};t.fn.datepicker.Constructor=e;var i={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],dates:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},isLeapYear:function(t){return t%4===0&&t%100!==0||t%400===0},getDaysInMonth:function(t,e){return[31,i.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},parseFormat:function(t){var e=t.match(/[.\/\-\s].*?/),i=t.split(/\W+/);if(!e||!i||i.length===0){throw new Error("Invalid date format.")}return{separator:e,parts:i}},parseDate:function(t,e){var i=t.split(e.separator),t=new Date,s;t.setHours(0);t.setMinutes(0);t.setSeconds(0);t.setMilliseconds(0);if(i.length===e.parts.length){var a=t.getFullYear(),n=t.getDate(),o=t.getMonth();for(var r=0,l=e.parts.length;r<l;r++){s=parseInt(i[r],10)||1;switch(e.parts[r]){case"dd":case"d":n=s;t.setDate(s);break;case"mm":case"m":o=s-1;t.setMonth(s-1);break;case"yy":a=2e3+s;t.setFullYear(2e3+s);break;case"yyyy":a=s;t.setFullYear(s);break}}t=new Date(a,o,n,0,0,0)}return t},formatDate:function(t,e){var i={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()};i.dd=(i.d<10?"0":"")+i.d;i.mm=(i.m<10?"0":"")+i.m;var t=[];for(var s=0,a=e.parts.length;s<a;s++){t.push(i[e.parts[s]])}return t.join(e.separator)},headTemplate:"<thead>"+"<tr>"+'<th class="prev">&lsaquo;</th>'+'<th colspan="5" class="switch"></th>'+'<th class="next">&rsaquo;</th>'+"</tr>"+"</thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};i.template='<div class="datepicker dropdown-menu">'+'<div class="datepicker-days">'+'<table class=" table-condensed">'+i.headTemplate+"<tbody></tbody>"+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+i.headTemplate+i.contTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+i.headTemplate+i.contTemplate+"</table>"+"</div>"+"</div>"}(window.jQuery);+function(t){"use strict";var e=function(e,i){this.$element=t(e);this.$indicators=this.$element.find(".carousel-indicators");this.options=i;this.paused=null;this.sliding=null;this.interval=null;this.$active=null;this.$items=null;this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this));this.options.pause=="hover"&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};e.VERSION="3.3.6";e.TRANSITION_DURATION=600;e.DEFAULTS={interval:6e3,pause:"hover",wrap:true,keyboard:true};e.prototype.keydown=function(t){if(/input|textarea/i.test(t.target.tagName))return;switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()};e.prototype.cycle=function(e){e||(this.paused=false);this.interval&&clearInterval(this.interval);this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval));return this};e.prototype.getItemIndex=function(t){this.$items=t.parent().children(".item");return this.$items.index(t||this.$active)};e.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);var s=t=="prev"&&i===0||t=="next"&&i==this.$items.length-1;if(s&&!this.options.wrap)return e;var a=t=="prev"?-1:1;var n=(i+a)%this.$items.length;return this.$items.eq(n)};e.prototype.to=function(t){var e=this;var i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(t>this.$items.length-1||t<0)return;if(this.sliding)return this.$element.one("slid.bs.carousel",function(){e.to(t)});if(i==t)return this.pause().cycle();return this.slide(t>i?"next":"prev",this.$items.eq(t))};e.prototype.pause=function(e){e||(this.paused=true);if(this.$element.find(".next, .prev").length&&t.support.transition){this.$element.trigger(t.support.transition.end);this.cycle(true)}this.interval=clearInterval(this.interval);return this};e.prototype.next=function(){if(this.sliding)return;return this.slide("next")};e.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")};e.prototype.slide=function(i,s){var a=this.$element.find(".item.active");var n=s||this.getItemForDirection(i,a);var o=this.interval;var r=i=="next"?"left":"right";var l=this;if(n.hasClass("active"))return this.sliding=false;var c=n[0];var h=t.Event("slide.bs.carousel",{relatedTarget:c,direction:r});this.$element.trigger(h);if(h.isDefaultPrevented())return;this.sliding=true;o&&this.pause();if(this.$indicators.length){this.$indicators.find(".active").removeClass("active");var d=t(this.$indicators.children()[this.getItemIndex(n)]);d&&d.addClass("active")}var u=t.Event("slid.bs.carousel",{relatedTarget:c,direction:r});if(t.support.transition&&this.$element.hasClass("slide")){n.addClass(i);n[0].offsetWidth;a.addClass(r);n.addClass(r);a.one("bsTransitionEnd",function(){n.removeClass([i,r].join(" ")).addClass("active");a.removeClass(["active",r].join(" "));l.sliding=false;setTimeout(function(){l.$element.trigger(u)},0)}).emulateTransitionEnd(e.TRANSITION_DURATION)}else{a.removeClass("active");n.addClass("active");this.sliding=false;this.$element.trigger(u)}o&&this.cycle();return this};function i(i){return this.each(function(){var s=t(this);var a=s.data("bs.carousel");var n=t.extend({},e.DEFAULTS,s.data(),typeof i=="object"&&i);var o=typeof i=="string"?i:n.slide;if(!a)s.data("bs.carousel",a=new e(this,n));if(typeof i=="number")a.to(i);else if(o)a[o]();else if(n.interval)a.pause().cycle()})}var s=t.fn.carousel;t.fn.carousel=i;t.fn.carousel.Constructor=e;t.fn.carousel.noConflict=function(){t.fn.carousel=s;return this};var a=function(e){var s;var a=t(this);var n=t(a.attr("data-target")||(s=a.attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,""));if(!n.hasClass("carousel"))return;var o=t.extend({},n.data(),a.data());var r=a.attr("data-slide-to");if(r)o.interval=false;i.call(n,o);if(r){n.data("bs.carousel").to(r)}e.preventDefault()};t(document).on("click.bs.carousel.data-api","[data-slide]",a).on("click.bs.carousel.data-api","[data-slide-to]",a);t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery);$(document).ready(function(){$('a[href="#top"]').click(t);function t(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);console.log(t);t=t.length?t:$("[name="+this.hash.slice(1)+"]");if(t.length){$("html,body").animate({scrollTop:t.offset().top},400);return false}}}function e(t){$("#menu-toggle").css("display","block");$("#menu-content").animate({left:"0"},300);$("html").addClass("noscroll")}function i(t){t.preventDefault();$("#menu-content").animate({left:"-75%"},300,function(){$("#menu-toggle").css("display","none")});$("html").removeClass("noscroll")}var s=document.getElementById("open-menu");s.addEventListener("click",e);var a=document.getElementById("close-menu");a.addEventListener("click",i);var o=function(t){t.preventDefault();$(this).siblings().slideToggle(200,function(){$(this).siblings().toggleClass("active");$(this).parent().siblings().children(".menu-sub-items").slideUp(200,function(){$(this).siblings().removeClass("active")})})};$(".menu-collapse").click(o);$(".category-title").click(function(t){t.preventDefault();$(this).siblings(".sub-category").slideToggle("fast");$(this).toggleClass("active")});var r=function(t){t.preventDefault();var e=$(this).children("img").data("lg");var i=$(this).children("img").data("xl");$("#image-view").children("img").attr("src",e).data("url",i)};$(".thumbnail-image").click(r).hover(r);$("#image-view").click(function(t){t.preventDefault();var e=$(this).children("img").data("url");$("#light-box").children("img").attr("src",e);$("#light-box").fadeIn(300);$("html").addClass("noscroll")});$("#light-box").click(function(){$(this).fadeOut(300);$("html").removeClass("noscroll")});$("body").keypress(function(t){if(t.which==27){$("#light-box").fadeOut(300);c()}});$("#ad-carousel").swiperight(function(){$(this).carousel("prev")});$("#ad-carousel").swipeleft(function(){$(this).carousel("next")});if($("head > title").text()=="會員登入"){$("header .login").removeClass("login")}else if($("head > title").text()=="忘記密碼"){$("header .login").removeClass("login").attr("href","/login")}function l(t){$(t).fadeIn("slow");$(t+" .content").slideDown();$("html").addClass("noscroll")}function c(){$(".popout-animation").children(".content").slideUp();$(".popout-animation").fadeOut("slow");$(".popout-animation .body").html("");$("html").removeClass("noscroll")}function h(){var t=document.getElementsByClassName("close-popout");$(".close-popout").click(c);$(".close-popout-area").click(c)}function d(t){c();$("#popout").load("/popout/"+t,function(){l("."+t);h()})}function u(t){c();$("#popout").load("/popout/"+t,function(){l(".popout-notice");h()})}$(document).on("click",".login",function(t){t.preventDefault();d("popout-login")});$(document).on("click",".forgot-pwd",function(t){t.preventDefault();d("popout-forgot-password")});var p=["notice-add-cart-success","notice-checkout-fail","notice-register-success","notice-search-fail"];for(var f=0;f<p.length;f++){$(document).on("click","."+p[f],function(t){t.preventDefault();u($(this).prop("class"))})}$(document).on("click",".popout-video",function(t){t.preventDefault();var e=$(this).data("video");m("none",e)});function m(t,e,i){v(e,i,t)}function v(t,e,i){t=typeof t!=="undefined"?t:"";e=typeof e!=="undefined"?e:"";i=typeof i!=="undefined"?i:"";c();$("#popout").load("/popout/popout-alert",function(){if(i=="success"){$(".popout .message").html(t).parent().prepend('<i class="material-icons notice-icon icon-with-circle">&#xE876;</i>')}else if(i=="wrong"){$(".popout .message").html(t).parent().prepend('<i class="material-icons notice-icon icon-yellow">&#xE000;</i>')}else{$(".popout .body").html(t).prepend('<img class="ratio" src="/image/16x9.png"/>');$(".popout .close-popout").hide();$(".popout .head").hide();$(".popout .content").css("max-width","90%")}l(".popout-notice");h();if(e!==""){setTimeout(function(){c()},e)}})}$(document).on("click",".popout-alert-success",function(t){t.preventDefault();m("success","Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet")});$(document).on("click",".popout-alert-wrong",function(t){t.preventDefault();m("wrong","錯誤提示<br>三秒後自動關閉",3e3)});var g=0;var w=0;var y=$("#header-category-bar > li").length;for(var f=0;f<y;f++){g+=$("#header-category-bar > li"+":nth-child("+f+")").width()}w=g-$("#header-category-bar").width();var b=$(".category > ul");$(".arrow-left").mouseenter(function(){b.animate({scrollLeft:0},1e3)}).mouseleave(function(){b.stop()});$(".arrow-right").mouseenter(function(){b.animate({scrollLeft:w+300},1e3)}).mouseleave(function(){b.stop()});var k={};var D=1;var M=0;var x={};Number.prototype.format=function(t,e){var i="\\d(?=(\\d{"+(e||3)+"})+"+(t>0?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(i,"g"),"$&,")};function T(){var t=confirm("確定要從購物車移除?");if(t==true){D=0}else{D=1}}function I(){var t=[];var e=0;t=$(".pricing > .price");for(var i=0;i<t.length;i++){e+=Number($(t[i]).attr("data-total-price"))}$("#sub-total-price").text(function(){return e.format()});$("#sub-total-price").attr("data-sub-total-price",function(){return e});$("#total-price").text(function(){n=e+$("#shipping-cost").data("shipping-cost");return n.format()})}function S(t){x.parent().siblings("input").val(function(){if(t=="-"){if($(this).val()<=1){T();return D}else{D=Number($(this).val())-1;return D}}else{D=Number($(this).val())+1;return D}})}function F(){k=x.parents(".quantity-step").parent().siblings(".pricing").children(".price");k.text(function(){n=D*$(this).data("price");return n.format(0)});k.attr("data-total-price",function(){return D*$(this).data("price")});I()}$(".quantity-minus > button").click(function(){x=$(this);S("-");F()});$(".quantity-plus > button").click(function(){x=$(this);S("+");F()});$(".quantity-step > input").keyup(function(){console.log();if(Number($(this).val())<=0||isNaN($(this).val()/1)){D=0}else{D=$(this).val()}x=$(this);F()});I()});+function(t){"use strict";function e(){var t=document.createElement("bootstrap");var e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e){if(t.style[i]!==undefined){return{end:e[i]}}}return false}t.fn.emulateTransitionEnd=function(e){var i=false;var s=this;t(this).one("bsTransitionEnd",function(){i=true});var a=function(){if(!i)t(s).trigger(t.support.transition.end)};setTimeout(a,e);return this};t(function(){t.support.transition=e();if(!t.support.transition)return;t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);