
	var ranNum = -1; // The random scenario number
	var lasRanNum = -1; // The last scenario, used to skip re-rolling into the same one.
	
	var numberOfScenarios = 6; // Current number of scenarios
	
	// This will become the JSON object we read
	var j = {};	

	// This gets us a zero-based index that is NOT the same as the old one.
	function randomNumber() {
		if(lasRanNum < 0) {
			// No scenario is selected so the probability is distributed over numberOfScenarios items.
			ranNum = Math.floor(Math.random() * numberOfScenarios);
		} else {
			// A scenario is selected so the probability is distributed over (numberOfScenarios - 1) items since we want to avoid the current selection.
			ranNum = Math.floor(Math.random() * (numberOfScenarios - 1));
			if(ranNum >= lasRanNum) {
				ranNum++;
			}
		}
		lasRanNum = ranNum;
		console.log(ranNum);
		return ranNum;
	}
	
	// Get the scenario from the JSON object.
	function getScenario() {
		var scen = j.scenario[ranNum]; //Get the scenario here
		
		//Assign the scenario strings to the various HTML areas on the page.
		$('#scenario-name').text(scen['title']);
		$('#special-rules').html("<b>Scenario Elements:</b>" + scen['special']);
		$('#victory-conditions').html(scen['victory']);
		$("#scenario-image").attr("src","img/"+scen['image']);
		
		return true;
	}
	
	// Called to ranomdly generate the number, then get the scenario from the list.
	function rollScenario() {
		randomNumber();
		getScenario();
		$('#scenario')[0].selectedIndex = 0; //Resets the scenario dropdown so there is no visual inconsistency.
		
		// Used for Google analytics.
		// Lets me view how often scenarios come up.
		ga('send', 'event', 'Scenario 2019', 'Random', $('#scenario-name').text());
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
	
	// Adds the loaded scenarios into the Choose Scenario dropdown
	function populateChooseScenario() {
		$.each(j.scenario, function(i, item) {
			$('#scenario').append($('<option>', {
				value: item.id,
				text: item.title
			}));
		});
	}
	
	// Counts the objects in the JSON array. Probably a lazy way to do this but it works.
	function getNumberOfScenarios() {
		numberOfScenarios = 0;
		$.each(j.scenario, function(i, item) {
			numberOfScenarios++;
		});
	}
	
	// Calls chooseScenario() with a zero-based index when the dropdown box is changed
	$(document).on('change', '#scenario', function() {
		chooseScenario($('#scenario')[0].selectedIndex - 1);
		});

	// THE LONG JSON string. This is all the scenarios in a single JSON object. 
	// We get this from the file in the JSON folder.
	var jqxhr = $.getJSON( "json/scenarios-2019.json", function() {})
		.done(function(data) {
			j = data; // Load the JSON data from the JSON file into the j variable declared at the top.
			getNumberOfScenarios();
			populateChooseScenario();
			rollScenario();// Aaaand begin. (this runs after the JSON file is loaded...)
		});
