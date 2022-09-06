function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetection = ml5.objectDetector("cocoSSD", modelLoaded);
}
function modelLoaded(){
    console.log("cocoSSD is initialized!");
    Status=true;
    objectDetection.detect(img, gotResult);
}
img = "";
Status = "";
objects=[];
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function preload(){
    img = loadImage("almirah.jpg");
}
function draw(){
    image(img, 0, 0, 640, 420);
    if(Status!= ""){
        for(i=0; i<objects.length; i++){
            fill("orange");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("orange");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number").innerHTML = "Number of Obejcts detected : "+objects.length;
        }
    }
}