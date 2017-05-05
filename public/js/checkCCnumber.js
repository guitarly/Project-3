$(document).ready(function() {
  var timer = null;
  $('#ccNumber').keydown(function() {
    clearTimeout(timer);
    timer = setTimeout(checkNumber, 1000)
  });


  function checkNumber() {

    var validCard = function(num) {

      var numberArr = num.toString().split('');

      for (var i = numberArr.length - 2; i >= 0; i -= 2) {
        numberArr[i] = numberArr[i] * 2;
      }

      numberArr = numberArr.join('').split('');

      var summed = numberArr
        .map(function(n) {
          return n = parseInt(n);
        })
        .reduce(function(sum, m) {
          return sum + m;
        });

      return summed % 10 == 0;
    };



    var ccValue = document.getElementById("ccNumber").value;
    console.log(ccValue);
    console.log(validCard(ccValue));
    if (!validCard(ccValue)) {

      alert('CreditCard # is not Valid');
    };

  };


});
