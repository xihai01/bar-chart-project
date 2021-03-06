jQuery(function() {
  const drawBarChart = function(data, options, element) {
    //create a div inside element to hold together bar chart and y-axis
    element.append('<div class="box"></div>')
    //create a box to wrap bar chart and y-axes labels
    $('.box').append('<div class="title-label"></div>');
    //create bar chart inside title-label
    $('.title-label').append('<div class="wrapper"></div>');
    //draw a grid
    drawGrid(data, element);
    //fill in the bars with colour
    colorGrid(data, options);
    labelTitleAndAxes();
    setTitle(options);
    setXLables(options);
    //re-adjust the width and height of bar chart
    let yLabelWidth = parseFloat($('.y-axis').css('width'));
    //const yLabelHeight = parseFloat($('.y-axis').css('height'));
    let wrapperWidth = parseFloat($('.wrapper').css('width'));
    let titleHeight = $('.title').css('height');
    $('.wrapper').css('width', `${yLabelWidth + wrapperWidth}`);
    $('.y-axis').css('margin-top', titleHeight);
  }

  function drawGrid(data, element) {
    //find the max value in dataset and set it as height
    let height = Math.max(...data);
    //set the width as length of dataset
    let width = data.length;
    //get the width and height of the rendering element
    const elmWidth = parseFloat(element.css('width')) / width;
    const elmHeight = parseFloat(element.css('height')) / height;
   // console.log(element.css('height'));

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

  //color the bars and display data values in bars
  function colorGrid(data, options) {
    //if options does not have a color field, use black as default
    let color = '';
    if (options.hasOwnProperty('color')) {
      color = options.color;
    } else {
      color = 'black';
    }

    for (let i = 0; i < data.length; i++) {
      let posIndex = displayDataValues(i);
      for (let j = 1; j <= data[i]; j++) { //height of each bar
        //color the appropriate divs
        let str = `div.b${i + 1}-${j}`;
        $(str).css('background-color', (typeof(color) === 'string') ? color : color[i]);
        //display data values in bars if option exists
        if (options.hasOwnProperty('showData') && j === posIndex) {
          //add data value to bar
          $(str).text(data[i]);
        }
      }
    }
  }

  //calculate the height index (j) at which the data value should be placed
  function displayDataValues(index) {
    if (options.hasOwnProperty('showData') && options.showData[0] === true) {
      //get the position string
      const str = options.showData[1];
      switch (str) {
        case 'up':
          return data[index];
        case 'down':
          return 1;
        case 'middle':
          return Math.ceil(data[index] / 2);
        default:
          break;
      }
    }
  }

  //label title and axes
  function labelTitleAndAxes() {
    $('.box').prepend('<div class="y-axis"></div>');
    //append title to top of element
    $('.title-label').prepend('<div class="title">This is a bar chart</div>');
    //append x-axis label to bottom
    $('.title-label').append('<div class="x-axis"></div>');
  }

  //set the name, font-size and color of the title
  function setTitle(options) {
    let name = '';
    let fontSize = '';
    let color = '';
    //hide title by default
    if (!(options.hasOwnProperty('title'))) {
      $('.title').css('display', 'none');
      return;
    }
    //16px and black by default if font-size and color not specified
    if (typeof(options.title[1]) !== 'string') fontSize = '16px';
    else fontSize = options.title[1];

    if (typeof(options.title[2]) !== 'string') color = 'black';
    else color = options.title[2];

    //set the title of bar chart
    name = options.title[0];
    $('.title').text(name);
    $('.title').css('font-size', fontSize);
    $('.title').css('color', color);
  }

  //set the x-axis labels
  function setXLables(options) {
    //hide x-axis labels by default if property doesn't exist
    if (!(options.hasOwnProperty('xLabel'))) {
      $('.x-axis').css('display', 'none');
      return;
    }
    const width = data.length;
    //create data.length div's to serve as labels for x-axis
    let i = 0;
    while (i < width) {
      let div = '<div class="x-label"`>' + options.xLabel[i] + '</div>';
      $('.x-axis').append(div);
      i++;
    }
    //center labels
    const elmWidth = parseFloat(element.css('width')) / width;
    $('.x-label').css('width', `${elmWidth}`);
    $('.x-label').css('text-align', 'center');
  }

  //testing
  let data = [1, 7, 5, 9, 15, 10, 22, 3];
  let options = {color: ['red', 'blue', 'orange', 'purple', 'green',
    'grey', 'aqua', 'brown'],
    showData: [true, 'middle'], title: ['Quarterly FInancial Budget Report', '30px', 'orange'],
    xLabel: ['One', 'Seven', 'Five', 'NIne', 'Fifteen', 'Ten',
    'Twenty-Two', 'Three']};
  let element = $('.img');
  drawBarChart(data, options, element);
});
/**showData => true/false (shows/hides data values)
'up'/'middle'/'down' (positions data value on top/middle/bottom of bars)**/
/**title => name, font-size and color. Default => no title
 * font-size and color is optional. Default font-size and color
 * is 16px and black respectively**/
/**xLabel => default font-size and color is 30px and black**/
