$(function(){
  animateTitle();
  boardLoad();
  $("div[class^='col'] img").click(
    function(){
      this.remove();
      //console.log("Click: "+);
    }
  );
  removeSweetsInlineHorizontal();

  $("body").click(
    function(){
      $(sweetElementsToRemove).each(function( index ) {
        // console.log( index + ": " + $(this));
        $(this).effect("pulsate", 1000, function(){
            //$(this).remove();
            // console.log(this);
        });
      });
    }
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
      sweetNumber = getRandomSweetNumber();
      colElement = $(".col-"+i);
      colElement.append("<img class='elemento' src='image/"+sweetNumber+".png' alt='sweet' data-sweet-number='"+sweetNumber+"'>");
    }
  }
}

function getRandomSweetNumber(){
 return Math.floor((Math.random() * 4) + 1);
}

var sweetElementsToRemove = [];

function removeSweetsInlineVertical(){
  for (var i = 1; i <= 7; i++) {
    for (var j = 0; j < 7;j++) {
      colElement = $(".col-"+i);
    }
  }
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
