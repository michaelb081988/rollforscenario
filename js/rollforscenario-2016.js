var ranNum = 0;
	var lasRanNum = 0;
	var j = JSON.parse('{"scenario":[{"id":"1","title":"Scenario 1: Entrenched","killbox":"NO","special":"<p>Mark two zones (12&quot; × 6&quot; rectangle) and place two objectives in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Friendly Zone: Dominate = 1 CP</b></li><li><b>Enemy Zone: Control = 1 CP, Dominate = 2 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective) < /b></li > < /ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within the enemy zone.</p>","image":"scenario2016-1.jpg"},{"id":"2","killbox":"NO","title":"Scenario 2: Line Breaker","special":"<p>Place four flags and two objectives in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows: </p> <ul> <li><b>Enemy Flag: Control = 1 CP, Dominate = 2 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within 4&quot; of the enemy flag.</p>","image":"scenario2016-2.jpg"},{"id":"3","killbox":"YES","title":"Scenario 3: Take and Hold","special":"<p>Place two flags in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows: </p> <ul> <li><b>Friendly Flag: Dominate = 1 CP</b></li><li><b>Enemy Flag: Control = 1 CP, Dominate = 2 CP</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within 4&quot; of the enemy flag</p>","image":"scenario2016-3.jpg"},{"id":"4","killbox":"YES","title":"Scenario 4: The Pit","special":"<p>Place two flags and a zone (12&quot;-diameter circle) in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP, Dominate = 2 CP</b></li><li><b>Friendly Flag: Dominate = 1 CP</b></li><li><b>Enemy Flag: Control = 1 CP, Dominate = 2 CP</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within 4&quot; of the enemy flag and within the zone.</p>","image":"scenario2016-4.jpg"},{"id":"5","killbox":"YES","title":"Scenario 5: Extraction","special":"<p>Place two flags and two objectives in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Flag: Control = 1 CP, Dominate = 1 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within 4&quot; of a flag</p>","image":"scenario2016-5.jpg"},{"id":"6","killbox":"NO","title":"Scenario 6: Incursion","special":"<p>Place three flags in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Flag: Control = 1 CP, Dominate = 1 CP</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the ScenarioReference Sheet. For the 3rd tiebreaker, double the army points within 4&quot; of each flag.</p>","image":"scenario2016-6.jpg"},{"id":"7","killbox":"NO","title":"Scenario 7: Outlast","special":"<p>Mark two zones (12&quot;-diameter circles) in accordance with the diagram below. Starting on the second player\’s second turn, at the end of each player\’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP, Dominate = 2 CP</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the Scenario Reference Sheet. For the 3rd tiebreaker, double the army points within each zone.</p>","image":"scenario2016-7.jpg"},{"id":"8","killbox":"NO","title":"Scenario 8: Recon","special":"<p>Mark a zone (6&quot; × 12&quot; rectangle) and place two flags and two objectives in accordance with the diagram below. Starting on the second player’s second turn, at the end of each player’s turn, a player earns control points (CP) as follows:</p> <ul> <li><b>Zone: Control = 1 CP, Dominate = 2 CP</b></li><li><b>Flag: Dominate = 1 CP</b></li><li><b>Enemy Objective: Destroyed/Removed from Play = 1 CP (once per objective)</b></li></ul>","victory":"<p>The first player to earn at least 5 control points and have more control points than the opponent immediately wins the game. If time runs out before a player has won the game via scenario or assassination victory, break the tie as outlined on the ScenarioReference Sheet. For the 3rd tiebreaker, double the army points within the zone and within 4&quot; of the flags.</p>","image":"scenario2016-8.jpg"}]}');
	
	function randomNumber() {
		if(lasRanNum == ranNum) {
			ranNum = Math.floor(Math.random()*8) +1;
		}
		lasRanNum = ranNum;
		console.log(ranNum);
		return ranNum;
	}
	
	function getScenario() {
		num = ranNum -1;
		var scen = j.scenario[num];
		$('#scenario-name').text(scen['title']);
		$('#special-rules').html("<b>Kill Box: </b>" + scen['killbox'] + "<br/>" + scen['special']);
		$('#victory-conditions').html(scen['victory']);
		$("#scenario-image").attr("src","img/"+scen['image']);
		return true;
	}
	
	function rollScenario() {
		randomNumber();
		getScenario();
		ga('send', 'event', 'Scenario', 'Random', $('#scenario-name').text());
	}
	
	$('#reroll').click( function() {
		$('#scenario-name').text("");
		$('#special-rules').html("");
		$('#victory-conditions').html("");
		$("#scenario-image").attr("src","");
		rollScenario();
		});
		
	function chooseScenario(i) {
		ranNum = i;
		getScenario();
		ga('send', 'event', 'Scenario', 'Selected', $('#scenario-name').text());
	}
	
	$(document).on('change', '#objective1', function() {
		$("#objective1-image").attr("src","img/objective"+$("#objective1")[0].selectedIndex+".jpg");
	});
	$(document).on('change', '#objective2', function() {
		$("#objective2-image").attr("src","img/objective"+$("#objective2")[0].selectedIndex+".jpg");
	});
	$(document).on('change', '#scenario', function() {
		chooseScenario($('#scenario')[0].selectedIndex);
		});
		
	$('.funnybutton').click( function() {
		$('body').addClass("comic");
		ga('send', 'event', 'Funny', 'Funny', 'Funny');
	});
	
	rollScenario();