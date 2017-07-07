$(function(){
  animateTitle();
  boardLoad(makeDraggable);
  $(".btn-reinicio").click(
    function(){
      if($(this).text()=="Iniciar"){
        $(this).text("Reiniciar");
        removeSweetsInlineHorizontal();
        removeSweetsInlineVertical();
        removeSweetsFromBoard(boardLoad);
      }else{
        location.reload();
      };
      startTimer();
    }
  );
});

function makeDraggable(){
  $(".elemento").draggable({
    start: function(){
      $(this)
        .off("click")
        .css("z-index","2")
    },
    stop: function(){
      $(this).css({"left":0, "top":0});
    }
  });

  $(".elemento").droppable({
    accept: ".elemento",
    drop: function(event, ui){
      event.preventDefault();
        $("#movimientos-text").text(Number($("#movimientos-text").text())+1);
      var a = $(ui.draggable)[0];

      var b = $(this)[0];
      if($(a).nextAll().length == 6){
        var aNext = $(a).next();
        var bNext = $(b).next();

        $(aNext).before($(b));
        $(bNext).before($(a));
      }else{
        var aPrev = $(a).prev();
        var bPrev = $(b).prev();

        $(aPrev).after($(b));
        $(bPrev).after($(a));
      }
      removeSweetsInlineHorizontal();
      removeSweetsInlineVertical();
      removeSweetsFromBoard(boardLoad);
    }
  })
}

function animateTitle() {
    $('.main-titulo').animate({ color: '#FFFFFF' }, { duration: 1000 })
           .animate({ color: '#DCFF0E' }, { duration: 1000, complete: animateTitle });
}

function boardLoad(){
  var colElement;
  var sweetNumber;
  for (var i = 1; i <= 7; i++) {
    for (var j = 0; j < 7;j++) {
      colElement = $(".col-"+i);
      for (var k = 0; k < (7-$(colElement).children().length); k++) {
          sweetNumber = getRandomSweetNumber();
          if($(colElement).children().length > 0){
            $($(colElement).children().first()).before("<img class='elemento' src='image/"+sweetNumber+".png' alt='sweet' data-sweet-number='"+sweetNumber+"'>");
          }else{
              colElement.append("<img class='elemento' src='image/"+sweetNumber+".png' alt='sweet' data-sweet-number='"+sweetNumber+"'>");
          }
      }
    }
  }
  if($(".btn-reinicio").text()=="Reiniciar"
    && !$(".finish-game").is(":visible")){
      removeSweetsInlineHorizontal();
      removeSweetsInlineVertical();
      removeSweetsFromBoard(boardLoad);
  }
  makeDraggable();
}

function getRandomSweetNumber(){
 return Math.floor((Math.random() * 4) + 1);
}

var sweetElementsToRemove = [];

function removeSweetsInlineVertical(){
  var col, previous, previousElement, current, sweetElementsToRemoveTemp;
  $("div[class^='col']").each(
    function( index ) {
      col = $(this).children();
      previous = $(col[0]).attr("data-sweet-number");
      previousElement = $(col[0]);
      sweetElementsToRemoveTemp = [];
      for (var i = 1; i <= col.length; i++) {
        current = $(col[i]).attr("data-sweet-number");
        if(previous == current){
          sweetElementsToRemoveTemp.push(previousElement);
        }else{
          sweetElementsToRemoveTemp.push(previousElement);
          if(sweetElementsToRemoveTemp.length >= 3){
            $.merge(sweetElementsToRemove, sweetElementsToRemoveTemp);
          }
          sweetElementsToRemoveTemp = [];
        }
        previous = current;
        previousElement = $(col[i]);
      }
    });
}

function removeSweetsInlineHorizontal(){
  var row, previous, previousElement, current, sweetElementsToRemoveTemp;
  for (var j = 1; j <= 7; j++) {
    row = $("div[class^='col']").find("img:nth-of-type("+j+")");
    previous = $(row[0]).attr("data-sweet-number");
    previousElement = $(row[0]);
    sweetElementsToRemoveTemp = [];
    for (var i = 1; i <= row.length; i++) {
      current = $(row[i]).attr("data-sweet-number");
      if(previous == current){
        sweetElementsToRemoveTemp.push(previousElement);
      }else{
        sweetElementsToRemoveTemp.push(previousElement);
        if(sweetElementsToRemoveTemp.length >= 3){
          $.merge(sweetElementsToRemove, sweetElementsToRemoveTemp);
        }
        sweetElementsToRemoveTemp = [];
      }
      previous = current;
      previousElement = $(row[i]);
    }
  }
}

function removeSweetsFromBoard(boardLoad){
  $(sweetElementsToRemove).each(function( index ) {
    $(this).effect("pulsate", 1000, function(){
        $("#score-text").text(Number($("#score-text").text())+10);
        $(this).remove();
    });
  });
  sweetElementsToRemove = [];
  setTimeout(function(){boardLoad();}, 1800);
}

function finishedGame(){
  $('.panel-tablero').hide(1000);
  $('.time').hide(1000);
  $('.panel-score').animate({width:"100%"},{duration:1200});
  setTimeout(function(){
    $('.finish-game').show(1000);
  }, 1000);
}

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
    finishedGame();
  }else{
    document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
