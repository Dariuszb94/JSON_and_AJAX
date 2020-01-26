var pageCounter=1; //click the button counter
var animalContainer=document.getElementById("animal-info"); //links animal-info div

var btn=document.getElementById("btn"); //links btn button
btn.addEventListener("click", function(){ //add click function to btn button
var ourRequest=new XMLHttpRequest(); //create new instance of XMLHttpRequest
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+pageCounter+'.json'); //get data from outside
ourRequest.onload=function(){ //parsing data to json
if (ourRequest.status>=200 && ourRequest.status<400){ //error handling
	var ourData = JSON.parse(ourRequest.responseText);
renderHTML(ourData);
}else{
	alert("Connected to server with error");
}

};

ourRequest.onerror=function () {
alert("Connection error");
};
ourRequest.send();
pageCounter++;
if (pageCounter>3){
	btn.classList.add("hide-me");
}
});

function renderHTML(data) { //loop through data
	var htmlString=""
	for (let i=0;i<data.length;i++){
		htmlString += "<p>" + data[i].name+"is a "+data[i].species+"that likes to eat "
		for (let j=0;j<data[i].foods.likes.length; j++){
			if(j==0){
htmlString+=data[i].foods.likes[j];
			}else{
				htmlString+=" and "+data[i].foods.likes[j];
			}
		}
htmlString+=' and dislikes ';
for (let j=0;j<data[i].foods.dislikes.length; j++){
			if(j==0){
htmlString+=data[i].foods.dislikes[j];
			}else{
				htmlString+=" and "+data[i].foods.dislikes[j];
			}
		}
		htmlString+='.</p>';
	}
animalContainer.insertAdjacentHTML('beforeend',htmlString) //add text to animal-info div
}