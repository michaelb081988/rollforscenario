	var ranNum = 0; // The random scenario number
	var lasRanNum = 0; // The last scenario, used to skip re-rolling into the same one.
	
	// This will become the json string we read
	var j = {};	

	// This gets us a random number that is NOT the same as the old one. Multiply Math.random by the number of scenarios available and add 1 so we don't get 0.
	function randomNumber() {
		if(lasRanNum == ranNum) {
			ranNum = Math.floor(Math.random()*6) +1;
		}
		lasRanNum = ranNum;
		console.log(ranNum);
		return ranNum;
	}
	
	// Get the scenario from the JSON object.
	function getScenario() {
		num = ranNum -1; //Get the json object number, random number -1 as the array is 0 indexed.
		var scen = j.scenario[num]; //Get the scenario here
		
		//Assign the scenario strings to the various HTML areas on the page.
		$('#scenario-name').text(scen['title']);
		$('#special-rules').html("<b>Kill Box: </b>" + scen['killbox'] + "<br/>" + scen['special']);
		$('#victory-conditions').html(scen['victory']);
		$("#scenario-image").attr("src","img/"+scen['image']);
		
		return true;
	}
	
	// Called to ranomdly generate the number, then get the scenario from the list.
	function rollScenario() {
		randomNumber();
		getScenario();
		ga('send', 'event', 'Scenario', 'Random', $('#scenario-name').text()); // Used for Google analytics. Lets me view how often scenarios come up.
	}
	
	// The reroll scenario button at the top of the page. Empties some of the screen text to cleanly randomise a new scenario.
	$('#reroll').click( function() {
		$('#scenario-name').text("");
		$('#special-rules').html("");
		$("#scenario-image").attr("src","");
		rollScenario();
		});
	
	// The drop down if someone chooses a scenario. Sets the random number to the selected scenario and continues like normal.
	function chooseScenario(i) {
		ranNum = i;
		getScenario();
		ga('send', 'event', 'Scenario', 'Selected', $('#scenario-name').text());
	}
	
	// Dropdown box for the Objectives.
	
	$(document).on('change', '#objective1', function() {
		$("#objective1-image").attr("src","img/objective"+$("#objective1")[0].selectedIndex+"-2017.jpg");
	});
	
	// Calls chooseScenario() when the dropdown box is changed
	$(document).on('change', '#scenario', function() {
		chooseScenario($('#scenario')[0].selectedIndex);
		});
		
	// Outdated, not in use, but still funny to me.
	$('.funnybutton').click( function() {
		$('body').addClass("comic");
		ga('send', 'event', 'Funny', 'Funny', 'Funny');
	});

	//THE LONG JSON string. This is all the scenarios in a single JSON object. We get this from the file in the json folder.
	var jqxhr = $.getJSON( "json/scenarios-2017.json", function() {})
		.done(function(data) {
			j = data; // Load the json data from the json file into the j variable declared at the top.
			rollScenario();// Aaaand begin. (this runs after the json file is loaded...)
		});
