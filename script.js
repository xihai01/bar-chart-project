jQuery(function() {
  const drawBarChart = function(data, options, element) {
    //create a div inside element to serve as a wrapper
    element.append('<div class="wrapper"></div>');
    //draw a grid
    drawGrid();
  }

  function drawGrid() {
    //find the max value in dataset and set it as height
    let height = 5;
    //set the width as length of dataset
    let width = data.length;

    //draw grid
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        $('.wrapper').append('<div>hi</div>');
      }
    }
  }

  //testing
  let data = [1, 2, 3, 4, 5];
  let options = {};
  let element = $('.img');
  drawBarChart(data, options, element);
})
