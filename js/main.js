
let numberOfRows = 40;
let numberOfColumns = 50;
let running = false;
let grid = new Array(numberOfRows);
let population = 0;
let generation = 1;
let pattern = "";


$( document ).ready(initialSetUp);

function initialSetUp(){
	var htmlStr = "<table class='table'>";
	for(var i=0;i<numberOfRows;i++){
		htmlStr += "<tr>"
		for(var j=0;j<numberOfColumns;j++){
			htmlStr += "<td id='"+i+"-"+j+"' class='dead'></td>";
		}
		htmlStr += "</tr>";
	}
	htmlStr += "</table>";

	$("#grid").html(htmlStr);

	$("td").click(function(){
		var position = this.id.split("-");
		var i =parseInt(position[0]);
		var j =parseInt(position[1]);
		if (this.className ==='live'){
        	this.setAttribute('class', 'dead');
        	grid[i][j] = 0;
        	population--;
	    }else{
	        this.setAttribute('class', 'live');  
	        grid[i][j] = 1;
	        population++;
	    }
	});

	$("#patterns").change(function(){
		createAnimationPattern(this.value);
	});

	initializeStatus();
	
}
function createAnimationPattern(pattern){
	var startX = numberOfColumns/2 - 1;
	var startY = numberOfRows/2 - 1;
	createBlankGrid();
	if(pattern === "The Block"){
		createTheBlockPattern(startX,startY);
		population = 4;
		pattern = "The Block";
	}
	else if(pattern === "The Blinker"){
		createTheBlinkerPattern(startX,startY);
		pattern = "The Blinker";
		population = 3;
	}
	else if(pattern === "The Toad"){
		createTheToadPattern(startX,startY);
		population = 6;
		pattern = "The Toad";
	}
	else if(pattern === "Glider"){
		createGliderPattern(startX,startY);
		population = 5;
		pattern = "Glider";
	}
	else if(pattern === "Random Population"){
		createGliderPattern(10,10);
		createTheBlinkerPattern(12,12);
		createTheToadPattern(14,14);
		createTheBlockPattern(17,17);
		population = 18;
		pattern="Random Population";
	}
	else if(pattern === ""){
		pattern = "";
		createBlankGrid();

	}
}
function initializeStatus(){
	for (let i = 0; i < numberOfRows; i++) {
        grid[i] = new Array(numberOfColumns);
        grid[i].fill(0);
        
    }
    
}

function createGliderPattern(startX, startY){
	

	
	grid[startX][startY] = 1;
	grid[startX][startY+1] = 1;
	grid[startX][startY+2] = 1;
	grid[startX-1][startY+2] = 1;
	grid[startX-2][startY+1] = 1;

	

	createNextGrid();
}
function createTheToadPattern(startX, startY){

	
	grid[startX][startY] = 1;
	grid[startX][startY+1] = 1;
	grid[startX][startY+2] = 1;
	grid[startX+1][startY] = 1;
	grid[startX+1][startY-1] = 1;
	grid[startX+1][startY+1] = 1;
	

	

	createNextGrid();
}
function createTheBlockPattern(startX, startY){
	
	
	grid[startX][startY] = 1;
	grid[startX+1][startY] = 1;
	grid[startX][startY+1] = 1;
	grid[startX+1][startY+1] = 1;

	

	createNextGrid();
}

function createTheBlinkerPattern(startX, startY){
	
	
	grid[startX][startY] = 1;
	grid[startX][startY+1] = 1;
	grid[startX][startY+2] = 1;
	

	

	createNextGrid();
}

function stopAnimation(){
	running = false;
}
function startAnimation(){
	
	if(!running){
		running = true;
		runAnimation();
	}
	
}

function resetAnimation(){
	running = false;
	 setTimeout(function(){
	 	createBlankGrid();
		createAnimationPattern($("#patterns").val());
	 }, 1000);
	

}

function createBlankGrid(){
	stopAnimation();
	population =0;
	generation=0;
	initializeStatus();
	createNextGrid();

}
function runAnimation(){
      
        updateGridToNextTick();
        if (running) {
           setTimeout(runAnimation, 1000);
        }
}

function increment23(){
	if(!running){
		for(var i=0;i<23;i++){
			updateGridArrayToNextTick();

		}
		createNextGrid();
	}
	else{
		alert("Stop current animation!");
	}
}

function updateGridArrayToNextTick(){
	var gridCopy = [];
	for (var i = 0; i < grid.length; i++)
	    gridCopy[i] = grid[i].slice();

	var liveNeighbours;

	for (i=0;i<numberOfRows;i++) {

        for (var j=0; j<numberOfColumns; j++) {
           
            liveNeighbours = getLiveNeighbors(i, j);

            if (grid[i][j] == 1) {
              
                if (liveNeighbours < 2) {
                    gridCopy[i][j] = 0;
                    population--;
                } 
                else if (liveNeighbours > 3) {
                    gridCopy[i][j] = 0;
                    population--;
                }

            } else if (grid[i][j] == 0) {
                
            
                if (liveNeighbours == 3) {
                   
                    gridCopy[i][j] = 1;
                    population++;
                }
            }
        }
    }
    for( i = 0; i < gridCopy.length; i++){
	    grid[i] = gridCopy[i].slice();
    }
    generation++;
}

function updateGridToNextTick(){
	updateGridArrayToNextTick();

    createNextGrid();
}

function createNextGrid(){
	var idString = "";
	for(var i=0;i<numberOfRows;i++){
		for(var j=0;j<numberOfColumns;j++){
			idString = "#"+i+"-"+j;
			if(grid[i][j] === 0){
				
				$(idString).removeClass("live");
				$(idString).addClass("dead");
			}
			if(grid[i][j] === 1){
				
				$(idString).addClass("live");
				$(idString).removeClass("dead");
			}
		}
	}

	$("#population").html(population);
	$("#generation").html(generation);
}

function getLiveNeighbors(row,column){
	var count = 0;
	if(column - 1 >=0 && grid[row][column -1] === 1){
		count++;
	}
	if(column + 1 < numberOfColumns && grid[row][column + 1] === 1){
		count++;
	}
	if(row + 1 < numberOfRows && grid[row +1][column] === 1){
		count++;
	}
	if(row - 1 >=0 && grid[row -1][column] === 1){
		count++;
	}
	if(row - 1 >=0 && column -1 >=0 && grid[row -1][column -1] === 1){
		count++;
	}
	if(row - 1 >=0 && column +1 <numberOfColumns && grid[row -1][column +1] === 1){
		count++;
	}
	if(row + 1 < numberOfRows && column - 1 >=0 && grid[row + 1][column - 1] === 1){
		count++;
	}
	if(row + 1 < numberOfRows && column + 1 < numberOfColumns && grid[row + 1][column + 1] === 1){
		count++;
	}
	return count;
}