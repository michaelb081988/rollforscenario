	var ranNum = 0; // The random scenario number
	var lasRanNum = 0; // The last scenario, used to skip re-rolling into the same one.
	
	var numberOfScenarios = 6; // Current number of scenarios
	
	// This will become the JSON object we read
	var j = {};	

	// This gets us a random number that is NOT the same as the old one. Multiply Math.random by the number of scenarios available and add 1 so we don't get 0.
	function randomNumber() {
		if(lasRanNum == ranNum) {
			ranNum = Math.floor(Math.random() * numberOfScenarios) +1;
		}
		lasRanNum = ranNum;
		console.log(ranNum);
		return ranNum;
	}
	
	// Get the scenario from the JSON object.
	function getScenario() {
		num = ranNum -1; //Get the JSON object number, random number -1 as the array is 0 indexed.
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
		
		// Used for Google analytics.
		// Lets me view how often scenarios come up.
		ga('send', 'event', 'Scenario', 'Random', $('#scenario-name').text());
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
	
	// Calls chooseScenario() when the dropdown box is changed
	$(document).on('change', '#scenario', function() {
		chooseScenario($('#scenario')[0].selectedIndex);
		});

	// THE LONG JSON string. This is all the scenarios in a single JSON object. 
	// We get this from the file in the JSON folder.
	var jqxhr = $.getJSON( "json/scenarios-2017.json", function() {})
		.done(function(data) {
			j = data; // Load the JSON data from the JSON file into the j variable declared at the top.
			getNumberOfScenarios();
			populateChooseScenario();
			rollScenario();// Aaaand begin. (this runs after the JSON file is loaded...)
		});
