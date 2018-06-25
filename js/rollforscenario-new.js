	var ranNum = 0; // The random scenario number
	var lasRanNum = 0; // The last scenario, used to skip re-rolling into the same one.
	
	//THE LONG JSON string. This is all the scenarios in a single JSON object.
	var j = JSON.parse('{"scenario":[{"id":"1","title":"Scenario 1: The Pit II","killbox":"YES","special":"<p>Mark two rectangular zones (6\\" x 12\\") and one circular zone (12\\" diameter) and place two objectives in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p><ul><li><b>Zone: Control = 1 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</b></li></ul>","image":"scenario1-2017.jpg"},{"id":"2","killbox":"YES","title":"Scenario 2: Standoff","special":"<p>Mark two rectangular zones (6\\" × 12\\") and two circular zones (12\\" diameter) and place two objectives in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p> <ul><li><b>Zone: Control = 1 CP</b></li><li>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</li></ul>","image":"scenario2-2017.jpg"},{"id":"3","killbox":"YES","title":"Scenario 3: Spread the Net","special":"<p>Mark two rectangular zones (6\\" × 12\\") and one circular zone (12\\" diameter) and place two flags in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP</b></li><li><b>Enemy Flag: Control = 1 CP</b></li><li>Flag: Control = 1 CP</li></ul>","image":"scenario3-2017.jpg"},{"id":"4","killbox":"YES","title":"Scenario 4: Breakdown","special":"<p>Mark one rectangular zone (6\\" × 12\\") and two circular zones (12\\" diameter) in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p><ul><li>Zone: Control = 1 CP</li></ul>","image":"scenario4-2017.jpg"},{"id":"5","killbox":"YES","title":"Scenario 5: Outlast","special":"<p>Mark two circular zones (12\\" diameter) and place two flags in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP</b></li><li><b>Flag: Control = 1 CP</b></li></ul>","image":"scenario5-2017.jpg"},{"id":"6","killbox":"YES","title":"Scenario 6: Recon II","special":"<p>Mark one rectangular zone (6\\" × 12\\") and place two flags and two objectives in accordance with the diagram below. Starting on the second player\'s second turn, at the end of each player\'s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP</b></li><li><b>Flag: Control = 1 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</b></li></ul>","image":"scenario6-2017.jpg"}]}');
	
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
	
	// Aaaand begin. (this runs after the page loads...)
	rollScenario();
