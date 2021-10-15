jQuery(function() {
  const drawBarChart = function(data, options, element) {
    //create a div inside element to serve as a wrapper
    element.append('<div class="wrapper"></div>');
    //draw a grid
    drawGrid(data);
  }

  function drawGrid(data) {
    //find the max value in dataset and set it as height
    let height = Math.max(...data);
    //set the width as length of dataset
    let width = data.length;
    //get the width and height of the rendering element
    const elmWidth = parseInt(element.css('width')) / width;
    const elmHeight = parseInt(element.css('height')) / height;

    let yCoords = height;
    //draw grid
    for (let i = 1; i <= height; i++) {
      for (let j = 1; j <= width; j++) {
        //assign a unique class for each bar in grid with coordinates
        let str = `<div class="bar b${j}-${yCoords}"></div>`;
        $('.wrapper').append(str);
      }
      yCoords--;
    }

    //set width and height of individual grids
    $('.bar').css('width', elmWidth);
    $('.bar').css('height', elmHeight);
  }

  //testing
  let data = [1, 2, 13, 4, 5, 6];
  let options = {};
  let element = $('.img');
  drawBarChart(data, options, element);
})
