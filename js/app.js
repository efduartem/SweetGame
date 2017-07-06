$(function(){
  //animateTitle();
  boardLoad();
  $(".btn-reinicio").click(
    function(){
      if($(this).text()=="Iniciar"){
        $(this).text("Reiniciar");
      }else{
        location.reload();
      };
      startTimer();
    }
  );
  removeSweetsInlineHorizontal();
  removeSweetsInlineVertical();
  removeSweetsFromBoard(boardLoad);
  $("body").click(
  );
});


function animateTitle() {
    $('h1').animate({ color: '#FFFFFF' }, { duration: 1000 })
           .animate({ color: '#DCFF0E' }, { duration: 1000, complete: animateTitle });
}

function boardLoad(){
  var colElement;
  var sweetNumber;
  for (var i = 1; i <= 7; i++) {
    for (var j = 0; j < 7;j++) {
      colElement = $(".col-"+i);
      // console.log($(colElement).children().last());
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
            // console.log(sweetElementsToRemoveTemp);
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
          // console.log(sweetElementsToRemoveTemp);
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
    // console.log( index + ": " + $(this));
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
