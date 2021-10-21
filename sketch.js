var ball;
var position, database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    //.ref is used to refer to a particular property and dataBase
    //.on is a listener that listens to changes happening in the reference property
    // if there is a change the function after "value", is executed
    //dataBase properties are writte in 👍sigle quotes👍

    var ballPosition = database.ref('dot/position')
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position!== undefined){

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    }       
    drawSprites();
}

function writePosition(x,y){
    //.set replaces the child of refered position with the values mentioned in a bracket
    //.update updates the child of refered position with the values mentioned in a bracket
    database.ref('dot/position').set({
        'x': position.x+x,
        'y': position.y+y
    })
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;

}

function showError(){
console.log("this is how a data base looks");

}
