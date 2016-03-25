$(function(){
	$('#searchform').submit(function(){
		//get current value and add to items list
		var searchterms = $("#searchterms").val();
		//call our search youtube function
		getResultsFromYouTube(searchterms);
		return false;
	});
});

function getResultsFromYouTube (searchterms) {
	//call youtube API using AJAX
	//build url for the request
		var url = "http://www.omdbapi.com/?s="+searchterms +"&plot=short";
		//use jquery json shortcut
		$.getJSON(url, function(jsondata){
			//handle the results
			addResultTitles(jsondata);
		});
		
}

function addResultTitles(jsondata) {
	//create a string to contain our HTML code to inject
	var htmlstring = "";
	//iterate over the collection of results
	for (var i=0; i<5; i++){
		var title = jsondata.Search[i].Title;
		var poster = jsondata.Search[i].Poster;
		var year = jsondata.Search[i].Year;
		var type = jsondata.Search[i].Type;
		var plot = jsondata.Search[i].Plot;
		var imdbID = jsondata.Search[i].imdbID;


		var imdb = "http://www.imdb.com/title/" +  imdbID;

		if(type == "movie")
		{
		if (poster == "N/A")
		{
			if (type == "game")
			{
				poster = "https://image.freepik.com/free-icon/gamepad_318-80930.png";
			}
			else
			{
				poster = "http://icons.iconarchive.com/icons/enhancedlabs/longhorn-pinstripe/128/Reel-with-film-copy-icon.png";
			}
		}
			htmlstring += "<li> Title:  " + title + "</li>"
			+ "<ul>" +
				"<li> Year:" + year +"</li>" +
				"<li> Type:" + type +"</li>" +
				"<li> Poster :<img src ='"+poster+"'/></li>"+
				"<li> IMDB :<a href ='"+imdb+"'>[Link]</a></li>"+
				"<li>Plot: "+ plot +"</li>"+
				"</ul>"
			;
		}
	}
	
	//inject the HTML into our empty list
	$("#results").html(htmlstring);
}


