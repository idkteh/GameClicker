let bubbles = [];                     // declaring an empty array
let counter = 0;                      // declaring an empty variable that will be used as a counter
let button;                           // declaring an empty variable for the restart button
let score_c = 255;                    // declaring an variable that will be used for the colour of the text

function setup() {                    // function that creates everything after we start the program
  createCanvas(400, 400);             // this line creates a canvas so that we're able to see what the program shows
  for(let i = 0; i < 1; i++ ){        // this loop adds values to variables that are used as parameters and creates an object
  let x = random(width);
  let y = random(height);
  let r = 50;
  let b = new Bubble(x,y,r);      // variable b is assigned the object
  bubbles.push(b);                // variable b is put into an array
  }
}


function mousePressed(){                     // this function declares what happens when we press the mouse
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX,mouseY);             // this activates the click function when the mouse is pressed
  }
}

function draw() {                                 // this function lets us display the object and the background
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
  bubbles[i].move();                             // this line activates the move function that is declared in the class andit moves the object
  bubbles[i].show();                             // this line activates the show function that is declared in the class and it shows the object
  }
}

class Bubble{                                    // declaring the class called Bubble
  constructor(x,y,r){                            // declaring constructor with parameters
    this.x = x;                                  // declaring properties of the class and assigning them values that we put into the variables
    this.y = y;
    this.r = r;
    
    this.colour1 = random(255);                 // assigning random colour to properties that we'll later use for the design of our object
    this.colour2 = random(255);
    this.colour3 = random(255);
  }

  clicked(px,py){                               //declaring function for the class that will change what happens when we click the mouse
    let d = dist(px, py, this.x, this.y);       // this measures the distance from mouse to the centre of the circle and assigns this value to the variable d
  if(d < this.r){                               // if the distance from the mouse to the centre is smaller than radius while the mmouse is pressed, is smaller than radius, the radius gets smaller, the colours of the circle change and the program adds 1 point to the counter
    counter+=1;
    this.r -=1;
    
    this.colour1 = random(255);
    this.colour2 = random(255);
    this.colour3 = random(255);
    
    }
  else{                                        // if the codition while the mouse is pressed isn't met, the program executes these lines of code
    this.r = 0;                                
    noStroke();
    this.colour1 = 0;
    this.colour2 = 0; 
    this.colour3 = 0;
                                              // these lines make sure that the colour of the object is the same as the colour of the background, if we wanted more flexible user interaction we can add an input where the user can set the colour in the console and change those 0 into variables.
    
    score_c = 0;                              // we changed the colour of the text so that it blends with background as well           
    button = createButton('Restart');          
    button.position(170,240);                 // these lines create button called 'Restart', they set its position and when the button is pressed,they call the function that resets the whole game
    button.mousePressed(resetSketch);
      }
  }

  move(){                                     // declaring function for the class that controls the movement of the object 
    this.x = this.x + random(-5,5);           // this makes the object position changed according the random numbers that are assigned to the variables
    this.y = this.y + random(-5,5);

    if (this.x > width){                      // these conditions make sure that the object can't leave the boundries of the canvas; if the object moves behind those boundries these conditions bounce it back so that the player can continue playing
      this.x = this.x - 8;
    }
    else if (this.x<0){
      this.x = this.x + 8;
    }
    else if (this.y>height){
      this.y = this.y - 8;
    }
    else if (this.y<0){
      this.y = this.y + 8;
    }
  }
  
  
  show(){                                                // declaring function for the class that controls what is being shown
    stroke(this.colour1,this.colour2,this.colour3);      // setting the colour of the object
    noFill();                                            // making the object transparent
    strokeWeight(5);                                     // setting the thickness of the outline of the object
    ellipse(this.x,this.y,this.r*2);                     // setting the size of the object
    textSize(20);                                        // setting the size of the text
    textFont('Comic Sans Ms');                           // setting the font
    noStroke();                                          // making the text have no outline
    strokeWeight(1);                                     // adjusting the size of the text so that it's easier to read
    fill(score_c);                                       // filling the text whilst using variable that's set to 255, making the text white
    text('Score: ',15,30);                               // displaying the text that says 'Score'
    text (counter,80,30);                                // displaying the counter that shows how many times has the user clicked inside the object
  
    if (this.colour1 === 0 && this.colour2 === 0 && this.colour3 ===0){           //when the else statement in the clicked function is executed, all colours variables are changed to 0; when this happens this if statements is executed
      textSize(50)                                       // setting the text size to be bigger
      fill(random(255),random(255),random(255))          // setting the colour to be random
      frameRate(8)                                       // reducing the frame rate so that the changing colours of the text are not so flashing and agressive
      text('GAME OVER', 50,200);                         // displaying the text 'GAME OVER'
      textSize(20)                                       // changing the text size to be smaller so we can display score underneath the game over text
      text('Your score: '+ counter,135,230);             // displaying the text 'Your score' with the counter showing user's score
    }
  }
}

function resetSketch(){                                  // this function resets the page
  window.location.reload();                              // this command reloads page
}
