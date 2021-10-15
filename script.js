jQuery(function() {
  const drawBarChart = function(data, options, element) {
    //create a div inside element to serve as a wrapper
    element.append('<div class="wrapper"></div>');
    //draw a grid
    drawGrid(data, element);
    //fill in the bars with colour
    colorGrid(data, element);
  }

  function drawGrid(data, element) {
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

  //color the bars
  function colorGrid(data, element) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j <= data[i]; j++) { //height of each bar
        //color the appropraite divs
        let str = `div.b${i + 1}-${j}`;
        console.log(str);
        $(str).css('background-color', 'red');
      }
    }
  }

  //testing
  let data = [1, 2, 3, 4, 5];
  let options = {};
  let element = $('.img');
  drawBarChart(data, options, element);
})
