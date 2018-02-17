  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8cyH1g6-E3aTEaU_33F0-3xhRV2hjPMU",
    authDomain: "collaborative-sketch-f506a.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-f506a.firebaseio.com",
    projectId: "collaborative-sketch-f506a",
    storageBucket: "collaborative-sketch-f506a.appspot.com",
    messagingSenderId: "302468663504"
  };
  firebase.initializeApp(config);
  
  var pointsData = firebase.database().ref();
  var points = [];
  
  function setup() {
      var canvas = createCanvas(400, 400);
      background(255);
      fill(0);
      pointsData.on("child_added", function (point) {
            points.push(point.val());
      });
      pointsData.on("child_removed", function () {
      points = [];
      });
      
      canvas.mousePressed(drawPoint);
      canvas.mouseMoved(drawPointIfMousePressed);
  }
  
  function draw() {
      background(255);
      
      
      for (var i=0; i< points.length; i++) {
        var point=points[i];
        ellipse(point.x, point.y, 5, 5);
      }
  }
  
  function drawPoint() {
    pointsData.push({x: mouseX, y: mouseY})
  }

  function drawPointIfMousePressed() {
      if (mouseIsPressed) {
          drawPoint();
      }
  }
  
$("#saveDrawing").on("click", saveDrawing);

  function saveDrawing() {
    saveCanvas();
  }

$("#clearDrawing").on("click", clearDrawing);

  function clearDrawing() {
    pointsData.remove();
    points = [];
  }