/*General functions */

/* Calling page-relevant functions */
function nextPage() {
	if (currentPage === 1) {
		consentDisplay();
	} else if (currentPage === 2) {
		demographicsChecker();
		page3SetUp();
		console.log(expCondition);
		dataList.push(expCondition);
	} else if (currentPage === 3) {
		instructionsChecker();
		rewardDistributionPicker();
		instructions2Text();
	} else if (currentPage === 6) {
		instructions2Checker();
	} else if (currentPage === 7) {
		choiceChecker();
	} else if (currentPage === 8) {
		choiceCheckerComplex();
	}

}

/* Next page function */
function pageTurner() {
	$("#page" + currentPage).hide();
	currentPage++;
	$("#page" + currentPage).show();
}



/* Page 1 - introduction and demographics form page */
/* Displays consent form */
function consentDisplay() {
	if (consentForm === 0) {
		$("#welcomePage").hide();
		$("#consentForm").show();
	} else {
		consentChecker();
	}
	consentForm += 1;
}



/* Checks whether consent has been provided */
function consentChecker() {
	if ($("#consentCheck").is(":checked")) {
		pageTurner()
	} else {
		$("#consentError").show()
	}
}


/* Checking and collecting demographics information */
function demographicsChecker() {
	var userage = document.getElementById("ua").value;
	if (userage < 15 || userage > 80) {
		$("#ageError").show()
	} else {
		$("#ageError").hide()
	}

	if ($('input[name="gender"]:checked').length > 0) {
		var usergender = document.querySelector('input[name="gender"]:checked').value;
		$("#genderError").hide()
	} else {
		$("#genderError").show()
	}

	if ($('input[name="education"]:checked').length > 0) {
		var usereducation = document.querySelector('input[name="education"]:checked').value;
		$("#eduError").hide()
	} else {
		$("#eduError").show()
	}

	if (userage < 81 && usergender.length > 3 && usereducation.length > 3) {

		dataList.push(parseInt(userage));
		dataList.push(usergender);
		dataList.push(usereducation);

		pageTurner();

	}
}


/* Page 3 - instructions stage 1 */
/* Checks whether the instructions have been stated to be understood */
function instructionsChecker() {
	if ($("#instructionsCheck").is(":checked")) {
		pageTurner();
		trialsGame();
		$('#totalPoints').html(totalPoints);
		$('#totalPointsS2').html(totalPoints);

		if (expCondition === 1) {
			buttonsSimple();
		} else {
			buttonsComplex();
			buttonsComplex2();
		}

	} else {
		$("#instructionsError").show();
	}
}

/* Changing the text of the description if the subject is in the complex condition */
function page3SetUp() {
	if (expCondition === 2) {
		$("#instructionsStage1Text").html("After clicking on the next button, the experiment starts immediately. You are first presented with three pictures: the galaxy you are in, and two spaceships. \
		<br><br> By clicking on one of the two spaceships you choose to travel\
		with that spaceship. Immediatly after, on the same screen, you have to choose which alien will accompany you on your journey by clicking on an alien.\
		With the spaceship and alien you'll travel to a new planet where he looks for treasures. You have 2 seconds to choose a spaceship, and then again 2 seconds to choose an alien. \
		<br><br>The alien will find a treasure of varying size.\
		The treasures the alien finds are resources, and you'll sell these at a market. The prices of the resources go up and down.\
		The points you earn are dependent on the price for which you can sell the resources.<br><br>All points are worth a certain amount of money.\
		For example, at pay-out, 10 points will be worth twice as much as 5 points. \
		Again, every trial you have 2 seconds to choose the alien and again 2 seconds to choose the spaceship you want to travel with.\
		<br><br>This continues until you have finished all the trials. After finishing the trials you will be automatically send to the next page.\
		<br><br>Good luck!");
	}
}



/* Page 4 - trials */
function rewardDistributionPicker() {

	var randomPicker = Math.random()

	if (randomPicker <= 0.25) {

		rewNormal = d1_rew;
		rewOpp = d1_rew_opp;
		rewPen = d1_rew_pen;
		rewOppPen = d1_rew_opp_pen;
		DistName = 'R1';

	}

	if (randomPicker > 0.25 && randomPicker <= 0.50) {

		rewNormal = d2_rew;
		rewOpp = d2_rew_opp;
		rewPen = d2_rew_pen;
		rewOppPen = d2_rew_opp_pen;
		DistName = 'R2';

	}

	if (randomPicker > 0.50 && randomPicker <= 0.75) {

		rewNormal = d3_rew;
		rewOpp = d3_rew_opp;
		rewPen = d3_rew_pen;
		rewOppPen = d3_rew_opp_pen;
		DistName = 'R3';

	}

	else {

		rewNormal = d4_rew;
		rewOpp = d4_rew_opp;
		rewPen = d4_rew_pen;
		rewOppPen = d4_rew_opp_pen;
		DistName = 'R4';

	}
}


function trialsGame() {

	if (expCondition === 1) {

		if (trialCounter < maxTrials) {

			trialCounter += 1;
			console.log(trialCounter);
			currentPage = 4;
			dataList.push(trialCounter);

			stateRandomizer = Math.random();
			picturePositionRandomizer = Math.random();

			timerNewTrial = setTimeout(scorePageTimeOut, 2000);

			if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_1.png")

				$('#leftImage').attr("src", "images/Alien_1.png");

				$('#rightImage').attr("src", "images/Alien_2.png");


			} else if (stateRandomizer <= 0.5 && picturePositionRandomizer > 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_1.png")

				$('#leftImage').attr("src", "images/Alien_2.png");

				$('#rightImage').attr("src", "images/Alien_1.png");


			} else if (stateRandomizer > 0.5 && picturePositionRandomizer <= 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_2.png")

				$('#leftImage').attr("src", "images/Alien_3.png");

				$('#rightImage').attr("src", "images/Alien_4.png");


			} else if (stateRandomizer > 0.5 && picturePositionRandomizer > 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_2.png")

				$('#leftImage').attr("src", "images/Alien_4.png");

				$('#rightImage').attr("src", "images/Alien_3.png");

			}
		}

	} else {

		expCondition = 2;

		if (trialCounter < maxTrials) {

			trialCounter += 1;
			console.log(trialCounter);
			currentPage = 4;
			dataList.push(trialCounter);

			stateRandomizer = Math.random();
			picturePositionRandomizer = Math.random();

			timerNewTrial = setTimeout(scorePageTimeOut3S, 2000);

			if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_1.png");

				$('#leftImage').attr("src", "images/Spaceship_1.png");

				$('#rightImage').attr("src", "images/Spaceship_2.png");


			} else if (stateRandomizer <= 0.5 && picturePositionRandomizer > 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_1.png");

				$('#leftImage').attr("src", "images/Spaceship_2.png");

				$('#rightImage').attr("src", "images/Spaceship_1.png");


			} else if (stateRandomizer > 0.5 && picturePositionRandomizer <= 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_2.png");

				$('#leftImage').attr("src", "images/Spaceship_3.png");

				$('#rightImage').attr("src", "images/Spaceship_4.png");


			} else if (stateRandomizer > 0.5 && picturePositionRandomizer > 0.5) {

				$('#backgroundImage').attr("src", "images/Galaxy_2.png");

				$('#leftImage').attr("src", "images/Spaceship_4.png");

				$('#rightImage').attr("src", "images/Spaceship_3.png");

			}
		}
	}
}

/* Assigning buttons if condition is simple */
function buttonsSimple() {

	$('#leftImage').on('click', scorePageLeft);
	$('#rightImage').on('click', scorePageRight);

}


/* Scorepage when choosing left */
function scorePageLeft() {

	if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {
		dataList.push('State_1');
		dataList.push('Action_1');
		updatePointsTrialR1();
		$('#rewardImage').attr("src", "images/coal.png")
	} else if (stateRandomizer <= 0.5 && picturePositionRandomizer >= 0.5) {
		dataList.push('State_1');
		dataList.push('Action_2');
		updatePointsTrialR2();
		$('#rewardImage').attr("src", "images/hay.png")
	} else if (stateRandomizer > 0.5 && picturePositionRandomizer <= 0.5) {
		dataList.push('State_2');
		dataList.push('Action_3');
		updatePointsTrialR2();
		$('#rewardImage').attr("src", "images/hay.png")
	} else {
		dataList.push('State_2');
		dataList.push('Action_4');
		updatePointsTrialR1();
		$('#rewardImage').attr("src", "images/coal.png")
	}

	$('#page4').hide();
	$('#page5').show();

	dataList.push(points);
	dataList.push(DistName);


	clearTimeout(timerNewTrial);

	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrial, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}

function scorePageRight() {

	if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {
		dataList.push('State_1')
		dataList.push('Action_2');
		updatePointsTrialR2();
		$('#rewardImage').attr("src", "images/hay.png")
	} else if (stateRandomizer <= 0.5 && picturePositionRandomizer >= 0.5) {
		dataList.push('State_1')
		dataList.push('Action_1');
		updatePointsTrialR1();
		$('#rewardImage').attr("src", "images/coal.png")
	} else if (stateRandomizer > 0.5 && picturePositionRandomizer <= 0.5) {
		dataList.push('State_2')
		dataList.push('Action_4');
		updatePointsTrialR1();
		$('#rewardImage').attr("src", "images/coal.png")
	} else {
		dataList.push('State_2')
		dataList.push('Action_3');
		updatePointsTrialR2();
		$('#rewardImage').attr("src", "images/hay.png")
	}

	$('#page4').hide();
	$('#page5').show();

	dataList.push(points);
	dataList.push(DistName);


	clearTimeout(timerNewTrial);

	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrial, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}

function scorePageTimeOut() {

	$('#page4').hide();
	$('#page5').show();
	$('#trialPoints').html(0);
	$('#rewardImage').attr("src", "images/red_cross.png")

	dataList.push('time out');
	dataList.push('time out');
	dataList.push('time out');
	dataList.push('time out');


	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrial, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}

function buttonsComplex() {

	$('#leftImage').on('click', nextPageLeft);
	$('#rightImage').on('click', nextPageRight);

}



function setImage(id, img) {
	$(id).attr("src", img + "?" + new Date().getTime());
}



function nextPageLeft() {

	timeOutValue = timeOutValue + 1;

	modelFreeStage2Randomizer = Math.random();

	console.log(modelFreeStage2Randomizer)

	console.log('nextpage')

	if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {

		stateStage1 = 3;

		dataList.push('State_1');
		dataList.push('Action_1');

		if (modelFreeStage2Randomizer <= 0.5) {

			console.log('31')

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_1.png");
			$('#rightImage2').attr("src", "images/Alien_2.png");

		} else {

			console.log('32')

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_2.png");
			$('#rightImage2').attr("src", "images/Alien_1.png");

		}

	} else if (stateRandomizer <= 0.5 && picturePositionRandomizer >= 0.5) {

		stateStage1 = 4;

		dataList.push('State_1');
		dataList.push('Action_2');

		if (modelFreeStage2Randomizer <= 0.5) {

			console.log('41');

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_3.png");
			$('#rightImage2').attr("src", "images/Alien_4.png");


		} else {

			console.log('42')

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_4.png");
			$('#rightImage2').attr("src", "images/Alien_3.png");

		}

	} else if (stateRandomizer >= 0.5 && picturePositionRandomizer <= 0.5) {

		stateStage1 = 5;

		dataList.push('State_2');
		dataList.push('Action_3');

		if (modelFreeStage2Randomizer <= 0.5) {

			console.log('51')

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_5.png");
			$('#rightImage2').attr("src", "images/Alien_6.png");

		} else {

			console.log('52')

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_6.png");
			$('#rightImage2').attr("src", "images/Alien_5.png");

		}

	} else {

		stateStage1 = 6;

		dataList.push('State_2');
		dataList.push('Action_4');

		if (modelFreeStage2Randomizer <= 0.5) {

			console.log('61')

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_7.png");
			$('#rightImage2').attr("src", "images/Alien_8.png");

		} else {

			console.log('62')

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_8.png");
			$('#rightImage2').attr("src", "images/Alien_7.png");

		}
	}

	dataList.push('left')
	dataList.push(stateRandomizer);
	dataList.push(picturePositionRandomizer);


	nextPage2S();

	clearTimeout(timerNewTrial);

	timerNewTrial = setTimeout(scorePageTimeOut3S, 2000);

	console.log('bbbbb')

}

function nextPageRight() {

	timeOutValue = timeOutValue + 1;

	modelFreeStage2Randomizer = Math.random();

	console.log('nextpage')

	if (stateRandomizer <= 0.5 && picturePositionRandomizer <= 0.5) {

		stateStage1 = 4;
		dataList.push('State_1');
		dataList.push('Action_2');

		if (modelFreeStage2Randomizer <= 0.5) {

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_3.png");
			$('#rightImage2').attr("src", "images/Alien_4.png");

		} else {

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_4.png");
			$('#rightImage2').attr("src", "images/Alien_3.png");

		}


	} else if (stateRandomizer <= 0.5 && picturePositionRandomizer >= 0.5) {

		stateStage1 = 3;
		dataList.push('State_1');
		dataList.push('Action_1');

		if (modelFreeStage2Randomizer <= 0.5) {


			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_1.png");
			$('#rightImage2').attr("src", "images/Alien_2.png");

		} else {

			$('#backgroundImage2').attr("src", "images/Galaxy_1.png");
			$('#leftImage2').attr("src", "images/Alien_2.png");
			$('#rightImage2').attr("src", "images/Alien_1.png");

		}

	} else if (stateRandomizer >= 0.5 && picturePositionRandomizer <= 0.5) {

		stateStage1 = 6;
		dataList.push('State_2');
		dataList.push('Action_4');

		if (modelFreeStage2Randomizer <= 0.5) {

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_7.png");
			$('#rightImage2').attr("src", "images/Alien_8.png");

		} else {

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_8.png");
			$('#rightImage2').attr("src", "images/Alien_7.png");

		}

	} else {

		stateStage1 = 5;
		dataList.push('State_2');
		dataList.push('Action_3');

		if (modelFreeStage2Randomizer <= 0.5) {

			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_5.png");
			$('#rightImage2').attr("src", "images/Alien_6.png");

		} else {


			$('#backgroundImage2').attr("src", "images/Galaxy_2.png");
			$('#leftImage2').attr("src", "images/Alien_6.png");
			$('#rightImage2').attr("src", "images/Alien_5.png");

		}
	}

	dataList.push('left')
	dataList.push(stateRandomizer);
	dataList.push(picturePositionRandomizer);

	nextPage2S();

	clearTimeout(timerNewTrial);

	timerNewTrial = setTimeout(scorePageTimeOut3S, 2000);

}

function nextPage2S() {

	$('#page4').hide();
	$('#page42').show();

}


function buttonsComplex2() {

	$('#leftImage2').on('click', scorePageLeft3S);
	$('#rightImage2').on('click', scorePageRight3S);

}



function scorePageLeft3S() {

	console.log('scorepageLeft');

	dataList.push('State_' + stateStage1);

	if (stateStage1 === 3) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_5');
			updatePointsTrialR1();
			$('#rewardImage').attr("src", "images/coal.png");

		} else {

			dataList.push('Action_6');
			updatePointsTrialR2();
			$('#rewardImage').attr("src", "images/hay.png");

		}
	} else if (stateStage1 === 4) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_7');
			updatePointsTrialR3();
			$('#rewardImage').attr("src", "images/goldnugget.png");

		} else {

			dataList.push('Action_8');
			updatePointsTrialR4();
			$('#rewardImage').attr("src", "images/wood.png")

		}

	} else if (stateStage1 === 5) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_9');
			updatePointsTrialR1();
			$('#rewardImage').attr("src", "images/coal.png");

		} else {

			dataList.push('Action_10');
			updatePointsTrialR2();
			$('#rewardImage').attr("src", "images/hay.png");

		}

	} else if (stateStage1 === 6) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_11');
			updatePointsTrialR3();
			$('#rewardImage').attr("src", "images/goldnugget.png");

		} else {

			dataList.push('Action_12');
			updatePointsTrialR4();
			$('#rewardImage').attr("src", "images/wood.png");

		}
	}

	$('#page42').hide();
	$('#page5').show();

	dataList.push('left');

	dataList.push(modelFreeStage2Randomizer);

	dataList.push(points);
	dataList.push(DistName);


	clearTimeout(timerNewTrial);

	timeOutValue = 0

	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrialComplex, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}


function scorePageRight3S() {

	dataList.push('State_' + stateStage1);

	if (stateStage1 === 3) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_6');
			updatePointsTrialR2();
			$('#rewardImage').attr("src", "images/hay.png");


		} else {

			dataList.push('Action_5');
			updatePointsTrialR1();
			$('#rewardImage').attr("src", "images/coal.png");

		}
	} else if (stateStage1 === 4) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_8');
			updatePointsTrialR4();
			$('#rewardImage').attr("src", "images/wood.png");

		} else {

			dataList.push('Action_7');
			updatePointsTrialR3();
			$('#rewardImage').attr("src", "images/goldnugget.png");

		}

	} else if (stateStage1 === 5) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_10');
			updatePointsTrialR2();
			$('#rewardImage').attr("src", "images/hay.png");

		} else {

			dataList.push('Action_9');
			updatePointsTrialR1();
			$('#rewardImage').attr("src", "images/coal.png");

		}

	} else if (stateStage1 === 6) {

		if (modelFreeStage2Randomizer <= 0.5) {

			dataList.push('Action_12');
			updatePointsTrialR4();
			$('#rewardImage').attr("src", "images/wood.png");

		} else {

			dataList.push('Action_11');
			updatePointsTrialR3();
			$('#rewardImage').attr("src", "images/goldnugget.png");

		}
	}

	$('#page42').hide();
	$('#page5').show();


	dataList.push('right');
	dataList.push(modelFreeStage2Randomizer);

	dataList.push(points);
	dataList.push(DistName);


	clearTimeout(timerNewTrial);

	timeOutValue = 0

	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrialComplex, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}


function scorePageTimeOut3S() {

	$('#page4').hide();
	$('#page42').hide();
	$('#page5').show();
	$('#trialPoints').html(0);
	$('#rewardImage').attr("src", "images/red_cross.png");


	if (timeOutValue === 0) {

		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');

		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');

	} else {

		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');
		dataList.push('time out');

	}

	timeOutValue = 0

	if (trialCounter < maxTrials) {
		timerNewTrial = setTimeout(newTrialComplex, 2000);
	} else {
		timerNewTrial = setTimeout(instructions, 2000);
	}
}


function instructions() {
	$('#page4').hide();
	$('#page5').hide();
	$('#page6').show();
	currentPage = 6;
	$('#totalPointsInstructions').html(totalPoints);
}

function resetTrial() {

	$('#page4').show();
	$('#page5').hide();

}

function newTrial() {

	trialsGame();
	resetTrial();

}

function resetTrialComplex() {

	$('#page4').show();
	$('#page5').hide();
	stateStage1 = 0;

}

function newTrialComplex() {

	trialsGame();
	resetTrialComplex();

}



/* Page 5 - rewards */
// Updating the rewards on the screen
function updatePointsTrialR1() {

	var r1 = rewNormal[trialCounter - 1];
	var r1Capped = r1.toFixed(2);
	var r1_forgone = rewOpp[trialCounter - 1];
	var r1_forgoneCapped = r1_forgone.toFixed(2);
	points = r1;
	points_forgone1 = r1_forgone;

	$('#trialPoints').html(r1Capped);
	updateTotalPoints();
}

function updatePointsTrialR2() {

	var r2 = rewOpp[trialCounter - 1];
	var r2Capped = r2.toFixed(2);
	var r2_foregone = rewNormal[trialCounter - 1];
	var r2_foregoneCapped = r2_foregone.toFixed(2);
	points = r2;
	points_forgone2 = r2_foregone;

	$('#trialPoints').html(r2Capped);
	updateTotalPoints();
}

function updatePointsTrialR3() {

	var r3 = rewPen[trialCounter - 1];
	var r3Capped = r3.toFixed(2);
	var r3_foregone = rewOppPen[trialCounter - 1];
	var r3_foregoneCapped = r3_foregone.toFixed(2);
	points = r3;
	points_forgone3 = r3_foregone;

	$('#trialPoints').html(r3Capped);
	updateTotalPoints();
}

function updatePointsTrialR4() {

	var r4 = rewOppPen[trialCounter - 1];
	var r4Capped = r4.toFixed(2);
	var r4_foregone = rewPen[trialCounter - 1];
	var r4_foregoneCapped = r4_foregone.toFixed(2);
	points = r4;
	points_forgone4 = r4_foregone;

	$('#trialPoints').html(r4Capped);
	updateTotalPoints();
}

function updateTotalPoints() {

	totalPoints = (totalPoints + points);

	$('#totalPoints').html(totalPoints);
	$('#totalPointsS2').html(totalPoints);
}



/* Page 6 - Instructions stage 2 */
function instructions2Checker() {
	if ($("#instructionsCheck2").is(":checked")) {
		if (expCondition === 1) {
			pageTurner();
			trialsModelBasedSimple();
			$('#totalPointsModelBased').html(totalPointsModelBased);
		} else {
			currentPage = 8;
			$('#page6').hide();
			$("#page8").show();
			trialsModelBasedComplex();
			$('#totalPointsModelBasedComplex').html(totalPointsModelBasedComplex);
			$('#totalPointsModelBasedComplex2').html(totalPointsModelBasedComplex);

			$('#statesComplex3').hide();
			$('#statesComplex4').hide();
			$('#statesComplex5').hide();
			$('#statesComplex6').hide();
		}
	} else {
		$("#instructionsError2").show();
	}
}


function instructions2Text() {

	if (expCondition === 2) {

		$('#instructions2').html('In the next stage, the final stage of this experiment, \
														you are presented with a structure of an environment. \
													 	Here, you have to pre-configure the choices you make when \
														you are in a certain state. The worth in points of every end state is indicated below the end-state with -- Reward x: points --. \
														<br><br> You can see a state as being in a certain situation \
														The black arrows indicate where a choice in a certain state \
														leads to. For instance, if you are in State 1 and choose an \
														action, the next state is where the arrow points to. \
														<br><br> Finally, you have to click on the radio buttons below the \
														picture to indicate your choices, and send press when you are happy. \
														Next, two new radio buttons occur, where you have to indicate which actions \
														you want to take in the final states, which lead to pay offs. \
														The program simulates your choices by having you randomly start \
														in one of the two start states. It then walks the path you have indicated, \
														resulting in a pay-off. The points you earn once again determine your total \
														pay-off in this experiment.')
	}
}



/* Page 7 - stage 2 simple */
function trialsModelBasedSimple() {

	if (expCondition === 1){

		if (trialModelBased < maxTrialsModelBased) {

			$('#reward1Simple').html(rewards_mb_r1[trialModelBased]); // should this be index - 1?
			$('#reward2Simple').html(rewards_mb_r2[trialModelBased]); // should this be index - 1?

			trialModelBased += 1;
			dataList.push(trialModelBased)

			startTimerStage2();

		}
	}
}


function trialsModelBasedComplex() {

	if (trialModelBased < maxTrialsModelBased) {

		$('#reward1Complex').html(rewards_mb_r1[trialModelBased]);
		$('#reward2Complex').html(rewards_mb_r2[trialModelBased]);
		$('#reward3Complex').html(rewards_mb_r3[trialModelBased]);
		$('#reward4Complex').html(rewards_mb_r4[trialModelBased]);

		$('#reward1Complex2').html(rewards_mb_r1[trialModelBased]);
		$('#reward2Complex2').html(rewards_mb_r2[trialModelBased]);
		$('#reward3Complex2').html(rewards_mb_r3[trialModelBased]);
		$('#reward4Complex2').html(rewards_mb_r4[trialModelBased]);

		trialModelBased += 1;
		dataList.push(trialModelBased);

		startTimerStage2();

	}

}


function choiceChecker() {

	if ($('input[name="actions1s"]:checked').length > 0) {
		s1_choice_s = document.querySelector('input[name="actions1s"]:checked').value;
		$("#ErrorAB_s").hide()
	} else {
		$("#ErrorAB_s").show()
	}

	if ($('input[name="actions2s"]:checked').length > 0) {
		s2_choice_s = document.querySelector('input[name="actions2s"]:checked').value;
		$("#ErrorCD_s").hide()
	} else {
		$("#ErrorCD_s").show()
	}

	if ($('input[name="actions1s"]:checked').length > 0 && $('input[name="actions2s"]:checked').length > 0) {

		dataList.push(s1_choice_s);
		dataList.push(s2_choice_s);

		endTimerStage2();
		updatePointsModelBasedTrial();


	}
}


function choiceCheckerComplex() {

	if ($('input[name="actions1c"]:checked').length > 0) {
		s1_choice_c = document.querySelector('input[name="actions1c"]:checked').value;
		$("#ErrorAB_c").hide()
	} else {
		$("#ErrorAB_c").show()
	}

	if ($('input[name="actions2c"]:checked').length > 0) {
		s2_choice_c = document.querySelector('input[name="actions2c"]:checked').value;
		$("#ErrorCD_c").hide()
	} else {
		$("#ErrorCD_c").show()
	}

	if ($('input[name="actions1c"]:checked').length > 0 && $('input[name="actions2c"]:checked').length > 0) {

		dataList.push(s1_choice_c);
		dataList.push(s2_choice_c);

		nextPageComplex();

	}

}


function nextPageComplex() {

	$('#page8').hide();
	$('#page82').show();


		if (s1_choice_c === 'a_c') {
			$('#statesComplex3').show();
		} else {
			$('#statesComplex3').hide();
		}

		if (s1_choice_c === 'b_c') {
			$('#statesComplex4').show();
		} else {
			$('#statesComplex4').hide();
		}

		if (s2_choice_c === 'c_c') {
			$('#statesComplex5').show();
		} else {
			$('#statesComplex5').hide();
		}

		if (s2_choice_c === 'd_c') {
			$('#statesComplex6').show();
		} else {
			$('#statesComplex6').hide();
		}
	}



function choiceCheckerComplex2() {

	console.log('choicechecker2');

	if ($('input[name="actions3c"]:checked').length > 0) {
		s3_choice_c = document.querySelector('input[name="actions3c"]:checked').value;
		$("#ErrorEF_c").hide()
	} else {
		$("#ErrorEF_c").show()
	}

	if ($('input[name="actions4c"]:checked').length > 0) {
		s4_choice_c = document.querySelector('input[name="actions4c"]:checked').value;
		$("#ErrorGH_c").hide()
	} else {
		$("#ErrorGH_c").show()
	}

	if ($('input[name="actions5c"]:checked').length > 0) {
		s5_choice_c = document.querySelector('input[name="actions5c"]:checked').value;
		$("#ErrorIJ_c").hide()
	} else {
		$("#ErrorIJ_c").show()
	}

	if ($('input[name="actions6c"]:checked').length > 0) {
		s6_choice_c = document.querySelector('input[name="actions6c"]:checked').value;
		$("#ErrorKL_c").hide()
	} else {
		$("#ErrorKL_c").show()
	}

	if (($('input[name="actions3c"]:checked').length > 0 || $('input[name="actions4c"]:checked').length > 0) && ($('input[name="actions5c"]:checked').length > 0 || $('input[name="actions6c"]:checked').length > 0)) {

		if ( s3_choice_c == null ) {
			s3_choice_c = 0
		}
		if ( s4_choice_c == null ) {
			s4_choice_c = 0
		}
		if ( s5_choice_c == null ) {
			s5_choice_c = 0
		}
		if ( s6_choice_c == null ) {
			s6_choice_c = 0
		}

		dataList.push(s3_choice_c);
		dataList.push(s4_choice_c);
		dataList.push(s5_choice_c);
		dataList.push(s6_choice_c);

		endTimerStage2();
		updatePointsModelBasedTrialComplex();
	}
}



function pageModelBasedPoints() {

	$('#page7').hide();
	$('#page9').show();
	$('#trialPointsModelBased').html(pointsModelBased);


	if (trialModelBased < maxTrialsModelBased) {
		var timerNextModelBasedSimpleTrial = setTimeout(nextModelBasedSimpleTrial, 2000);
	} else {
		var timerNextModelBasedSimpleTrial = setTimeout(endPage, 2000);
	}
}

function pageModelBasedPointsComplex() {

	$('#page82').hide();
	$('#page9').show();
	$('#trialPointsModelBased').html(pointsModelBased);

	if (trialModelBased < maxTrialsModelBased) {
		var timerNextModelBasedComplexTrial = setTimeout(nextModelBasedComplexTrial, 2000);
	} else {
		var timerNextModelBasedComplexTrial = setTimeout(endPage, 2000);
	}
}


function updatePointsModelBasedTrial() {

	if (s1_choice_s === 'a_s' && s2_choice_s === 'c_s') {
		pointsModelBased = rewards_mb_r1[trialModelBased - 1];
	}
	if (s1_choice_s === 'a_s' && s2_choice_s === 'd_s') {
		pointsModelBased = 0.5*(rewards_mb_r2[trialModelBased - 1]) + 0.5*(rewards_mb_r1[trialModelBased - 1]);
	}
	if (s1_choice_s === 'b_s' && s2_choice_s === 'c_s') {
		pointsModelBased = 0.5*(rewards_mb_r2[trialModelBased - 1]) + 0.5*(rewards_mb_r1[trialModelBased - 1]);
	}
	if (s1_choice_s === 'b_s' && s2_choice_s === 'd_s') {
		pointsModelBased = rewards_mb_r2[trialModelBased - 1];
	}

	mb_s_r1 = rewards_mb_r1[trialModelBased - 1]
	mb_s_r2 = rewards_mb_r2[trialModelBased - 1]

	pageModelBasedPoints();
	updateTotalPointsModelBased();
	dataList.push(mb_s_r1);
	dataList.push(mb_s_r2);
	dataList.push(pointsModelBased);
}


function updatePointsModelBasedTrialComplex() {

	if (s3_choice_c === 'e_c' && s5_choice_c === 'i_c') {
		pointsModelBased = rewards_mb_r1[trialModelBased - 1];
	}
	if (s3_choice_c === 'f_c' && s5_choice_c === 'j_c') {
		pointsModelBased = rewards_mb_r2[trialModelBased - 1];
	}
	if (s4_choice_c === 'g_c' && s6_choice_c === 'k_c') {
		pointsModelBased = rewards_mb_r3[trialModelBased - 1];
	}
	if (s4_choice_c === 'h_c' && s6_choice_c === 'l_c') {
		pointsModelBased = rewards_mb_r4[trialModelBased - 1];
	}



	if (s3_choice_c === 'e_c' && s5_choice_c === 'j_c') {
		pointsModelBased = 0.5*(rewards_mb_r1[trialModelBased - 1]) + 0.5*(rewards_mb_r2[trialModelBased - 1]);
	}
	if (s3_choice_c === 'e_c' && s6_choice_c === 'k_c') {
		pointsModelBased = 0.5*(rewards_mb_r1[trialModelBased - 1]) + 0.5*(rewards_mb_r3[trialModelBased - 1]);
	}
	if (s3_choice_c === 'e_c' && s6_choice_c === 'l_c') {
		pointsModelBased = 0.5*(rewards_mb_r1[trialModelBased - 1]) + 0.5*(rewards_mb_r4[trialModelBased - 1]);
	}

	if (s3_choice_c === 'f_c' && s5_choice_c === 'i_c') {
		pointsModelBased = 0.5*(rewards_mb_r2[trialModelBased - 1]) + 0.5*(rewards_mb_r1[trialModelBased - 1]);
	}
	if (s3_choice_c === 'f_c' && s6_choice_c === 'k_c') {
		pointsModelBased = 0.5*(rewards_mb_r2[trialModelBased - 1]) + 0.5*(rewards_mb_r3[trialModelBased - 1]);
	}
	if (s3_choice_c === 'f_c' && s6_choice_c === 'l_c') {
		pointsModelBased = 0.5*(rewards_mb_r2[trialModelBased - 1]) + 0.5*(rewards_mb_r4[trialModelBased - 1]);
	}

	if (s4_choice_c === 'g_c' && s5_choice_c === 'i_c') {
		pointsModelBased = 0.5*(rewards_mb_r3[trialModelBased - 1]) + 0.5*(rewards_mb_r1[trialModelBased - 1]);
	}
	if (s4_choice_c === 'g_c' && s5_choice_c === 'j_c') {
		pointsModelBased = 0.5*(rewards_mb_r3[trialModelBased - 1]) + 0.5*(rewards_mb_r2[trialModelBased - 1]);
	}
	if (s4_choice_c === 'g_c' && s6_choice_c === 'l_c') {
		pointsModelBased = 0.5*(rewards_mb_r3[trialModelBased - 1]) + 0.5*(rewards_mb_r4[trialModelBased - 1]);
	}

	if (s4_choice_c === 'h_c' && s5_choice_c === 'i_c') {
		pointsModelBased = 0.5*(rewards_mb_r4[trialModelBased - 1]) + 0.5*(rewards_mb_r1[trialModelBased - 1]);
	}
	if (s4_choice_c === 'h_c' && s5_choice_c === 'j_c') {
		pointsModelBased = 0.5*(rewards_mb_r4[trialModelBased - 1]) + 0.5*(rewards_mb_r2[trialModelBased - 1]);
	}
	if (s4_choice_c === 'h_c' && s6_choice_c === 'k_c') {
		pointsModelBased = 0.5*(rewards_mb_r4[trialModelBased - 1]) + 0.5*(rewards_mb_r3[trialModelBased - 1]);
	}



	mb_c_r1 = rewards_mb_r1[trialModelBased - 1]
	mb_c_r2 = rewards_mb_r2[trialModelBased - 1]
	mb_c_r3 = rewards_mb_r3[trialModelBased - 1]
	mb_c_r4 = rewards_mb_r4[trialModelBased - 1]

	pageModelBasedPointsComplex();

	dataList.push(mb_c_r1);
	dataList.push(mb_c_r2);
	dataList.push(mb_c_r3);
	dataList.push(mb_c_r4);
	dataList.push(pointsModelBased);
	updateTotalPointsModelBasedComplex();


}



function updateTotalPointsModelBased() {

		totalPointsModelBased = totalPointsModelBased + pointsModelBased;
		totalPointsModelBasedFixed = totalPointsModelBased.toFixed(2);
		$('#totalPointsModelBased').html(totalPointsModelBasedFixed);
		dataList.push(totalPointsModelBasedFixed);

}

function updateTotalPointsModelBasedComplex() {

	totalPointsModelBasedComplex = totalPointsModelBasedComplex + pointsModelBased
	totalPointsModelBasedComplexFixed = totalPointsModelBasedComplex.toFixed(2);
	$('#totalPointsModelBasedComplex').html(totalPointsModelBasedComplexFixed);
	$('#totalPointsModelBasedComplex2').html(totalPointsModelBasedComplexFixed);
	dataList.push(totalPointsModelBasedComplexFixed);

}



function nextModelBasedSimpleTrial() {

	$('#page9').hide();
	$('#page7').show();

	$('input[name="actions1s"]').prop('checked', false);
	$('input[name="actions2s"]').prop('checked', false);

	trialsModelBasedSimple();
}


function nextModelBasedComplexTrial() {

	$('#page9').hide();
	$('#page8').show();

	$('input[name="actions1c"]').prop('checked', false);
	$('input[name="actions2c"]').prop('checked', false);
	$('input[name="actions3c"]').prop('checked', false);
	$('input[name="actions4c"]').prop('checked', false);
	$('input[name="actions5c"]').prop('checked', false);
	$('input[name="actions6c"]').prop('checked', false);

	s3_choice_c = 0;
	s4_choice_c = 0;
	s5_choice_c = 0;
	s6_choice_c = 0;

	trialsModelBasedComplex();

}



function startTimerStage2() {
	startClick = new Date().getTime();
}

function endTimerStage2() {

	var trialTime = new Date().getTime() - startClick;
	var trialTimeSecond = (trialTime)/1000
	dataList.push(trialTimeSecond);
	console.log(trialTimeSecond)

}


function endPage() {

	if (expCondition === 1) {
		updateOverallTotalPoints();
		endPageCollector();
		$('#page9').hide();
		$('#page10').show();
	} else {
		updateOverallTotalPointsComplex();
		endPageCollector();
		$('#page9').hide();
		$('#page10').show();
	}

}


/* Pay out ---> can change this to only reflect a bonus */
function updateOverallTotalPoints() {
	overallTotalPoints = totalPointsModelBased + totalPoints;
	overallTotalPointsCapped = overallTotalPoints.toFixed(2);

	$('#overallTotalPoints').html(overallTotalPointsCapped);

	dataList.push(overallTotalPointsCapped)

	var payOutTrials = (overallTotalPoints / 2200);
	payOutCapped = payOutTrials.toFixed(2);

	$('#payOutTrials').html(payOutCapped);

	dataList.push(payOutCapped);

}


function updateOverallTotalPointsComplex() {

	overallTotalPointsComplex = totalPointsModelBasedComplex + totalPoints;
	overallTotalPointsComplexCapped = overallTotalPointsComplex.toFixed(2);

	$('#overallTotalPoints').html(overallTotalPointsComplexCapped);

	dataList.push(overallTotalPointsComplexCapped)

	var payOutTrials = (overallTotalPointsComplex / 2200);
	payOutCapped = payOutTrials.toFixed(2);

	$('#payOutTrials').html(payOutCapped);

	dataList.push(payOutCapped);

}



/* Collects survey data */
function endPageCollector() {

	// Calculating end time
	var stillToday = new Date();

	var endHours = stillToday.getHours();
	var endMinutes = stillToday.getMinutes();
	var endSeconds = stillToday.getSeconds();


	// Calculating number of minutes and seconds used
	var hoursSpent = endHours - hours;
	var minutesSpent = endMinutes - minutes;
	var secondsSpent = endSeconds - seconds;

	if (hoursSpent === 1) {
		minutesSpent += 60;
	}

	if (secondsSpent < 0) {
		minutesSpent -= 1;
		secondsSpent += 60;
	}

	if (minutesSpent < 10){
		minutesSpent = '0' + minutesSpent;
	}

	if (secondsSpent < 10){
		secondsSpent = '0' + secondsSpent;
	}

	var timeSpent = minutesSpent + ":" + secondsSpent;

	// Calculating end time
	if (endHours < 10){
		endHours = '0' + endHours;
	}

	if (endMinutes < 10){
		endMinutes = '0' + endMinutes;
	}

	if (endSeconds < 10){
		endSeconds = '0' + endSeconds;
	}

	endTime = endHours + ":" + endMinutes + ":" + endSeconds;
	dataList.splice(2, 0, endTime, timeSpent);

	/* Generating, storing and displaying HIT Approval Code */
	var approvalCode = Math.random().toString(36).slice(-8);
	firebase.database().ref('Approval Codes').push(approvalCode);
	$("#approvalCode").html(approvalCode);

	dataList.push(approvalCode)

	ref.push(dataList);



}


// Variables
/* Defining variables */
var currentPage = 1;
var expCondition = 0; // expCondition 1 is simple, expCondition 2 is complex


var dataList = [];


/* Page 1 variables */
var consentForm = 0;


/* Page 4 variables */
var stateRandomizer = 0
var picturePositionRandomizer = 0
var imageClicked = 0 // Default 0, if left is clicked '1', if right is clicked '2'
var timeOutValue = 0;

/* Page 5 variables */
var d1_rew = [0.162694182,0.711980828,1.100700342,1.08309521,0.431919244,0.791199675,0.56008243,1.267818547,1.232079454,1.268341566,1.459202661,1.881796147,2.200905236,2.590641308,2.669377298,2.224015967,2.746215642,3.205831093,4.27142151,4.36419383,4.241817525,3.676911402,3.987411769,3.850964908,3.06580159,3.65611334,3.337605221,3.752615768,4.30402225,4.948608003,5.558072541,5.238936201,5.701907237,5.580171912,5.878212325,6.138880268,6.232174697,7.125914853,8.294056718,9.078083307,9.316801532,9.006952948,9.342805048,8.778846067,8.824960759,7.88649163,8.016318593,8.126739763,8.710227419,8.59326357,8.642717137,8.810296383,7.44024537,7.011093855,6.744410559,7.384729956,6.609735216,6.129114978,5.950385244,6.95491478,6.671028083,6.852025269,6.248227657,6.379479402,6.523853003,5.796171773,5.637108339,5.62056647,4.955737751,4.397260047,4.792273846,4.600298979,4.476267443,4.754302547,4.941836618,5.960018161,6.868736097,6.575703251,7.260204154,7.654022843,8.047548688,8.856686508,9.263442075,9.650798021,9.473818301,9.024463247,9.399377107,8.928345095,9.160514002,9.229123152,8.709297038,8.982110084,9.625406778,9.919274322,9.60868609,8.665481886,8.357812266,9.476051406,9.782154824,9.577422753];
var d1_rew_opp = [9.837305818,9.288019172,8.899299658,8.91690479,9.568080756,9.208800325,9.43991757,8.732181453,8.767920546,8.731658434,8.540797339,8.118203853,7.799094764,7.409358692,7.330622702,7.775984033,7.253784358,6.794168907,5.72857849,5.63580617,5.758182475,6.323088598,6.012588231,6.149035092,6.93419841,6.34388666,6.662394779,6.247384232,5.69597775,5.051391997,4.441927459,4.761063799,4.298092763,4.419828088,4.121787675,3.861119732,3.767825303,2.874085147,1.705943282,0.921916693,0.683198468,0.993047052,0.657194952,1.221153933,1.175039241,2.11350837,1.983681407,1.873260237,1.289772581,1.40673643,1.357282863,1.189703617,2.55975463,2.988906145,3.255589441,2.615270044,3.390264784,3.870885022,4.049614756,3.04508522,3.328971917,3.147974731,3.751772343,3.620520598,3.476146997,4.203828227,4.362891661,4.37943353,5.044262249,5.602739953,5.207726154,5.399701021,5.523732557,5.245697453,5.058163382,4.039981839,3.131263903,3.424296749,2.739795846,2.345977157,1.952451312,1.143313492,0.736557925,0.349201979,0.526181699,0.975536753,0.600622893,1.071654905,0.839485998,0.770876848,1.290702962,1.017889916,0.374593222,0.080725678,0.39131391,1.334518114,1.642187734,0.523948594,0.217845176,0.422577247];
var d1_rew_pen = [-1.837305818,-1.288019172,-0.899299658,-0.91690479,-1.568080756,-1.208800325,-1.43991757,-0.732181453,-0.767920546,-0.731658434,-0.540797339,-0.118203853,0.200905236,0.590641308,0.669377298,0.224015967,0.746215642,1.205831093,2.27142151,2.36419383,2.241817525,1.676911402,1.987411769,1.850964908,1.06580159,1.65611334,1.337605221,1.752615768,2.30402225,2.948608003,3.558072541,3.238936201,3.701907237,3.580171912,3.878212325,4.138880268,4.232174697,5.125914853,6.294056718,7.078083307,7.316801532,7.006952948,7.342805048,6.778846067,6.824960759,5.88649163,6.016318593,6.126739763,6.710227419,6.59326357,6.642717137,6.810296383,5.44024537,5.011093855,4.744410559,5.384729956,4.609735216,4.129114978,3.950385244,4.95491478,4.671028083,4.852025269,4.248227657,4.379479402,4.523853003,3.796171773,3.637108339,3.62056647,2.955737751,2.397260047,2.792273846,2.600298979,2.476267443,2.754302547,2.941836618,3.960018161,4.868736097,4.575703251,5.260204154,5.654022843,6.047548688,6.856686508,7.263442075,7.650798021,7.473818301,7.024463247,7.399377107,6.928345095,7.160514002,7.229123152,6.709297038,6.982110084,7.625406778,7.919274322,7.60868609,6.665481886,6.357812266,7.476051406,7.782154824,7.577422753];
var d1_rew_opp_pen = [7.837305818,7.288019172,6.899299658,6.91690479,7.568080756,7.208800325,7.43991757,6.732181453,6.767920546,6.731658434,6.540797339,6.118203853,5.799094764,5.409358692,5.330622702,5.775984033,5.253784358,4.794168907,3.72857849,3.63580617,3.758182475,4.323088598,4.012588231,4.149035092,4.93419841,4.34388666,4.662394779,4.247384232,3.69597775,3.051391997,2.441927459,2.761063799,2.298092763,2.419828088,2.121787675,1.861119732,1.767825303,0.874085147,-0.294056718,-1.078083307,-1.316801532,-1.006952948,-1.342805048,-0.778846067,-0.824960759,0.11350837,-0.016318593,-0.126739763,-0.710227419,-0.59326357,-0.642717137,-0.810296383,0.55975463,0.988906145,1.255589441,0.615270044,1.390264784,1.870885022,2.049614756,1.04508522,1.328971917,1.147974731,1.751772343,1.620520598,1.476146997,2.203828227,2.362891661,2.37943353,3.044262249,3.602739953,3.207726154,3.399701021,3.523732557,3.245697453,3.058163382,2.039981839,1.131263903,1.424296749,0.739795846,0.345977157,-0.047548688,-0.856686508,-1.263442075,-1.650798021,-1.473818301,-1.024463247,-1.399377107,-0.928345095,-1.160514002,-1.229123152,-0.709297038,-0.982110084,-1.625406778,-1.919274322,-1.60868609,-0.665481886,-0.357812266,-1.476051406,-1.782154824,-1.577422753];

var d2_rew = [3.274911519,2.800643069,2.779387163,2.46915348,2.452661757,2.216486623,3.032415882,3.002355218,3.587145203,4.44204591,4.505097125,4.937270819,4.707374676,5.717429433,5.1037758,5.235355967,5.303776941,5.297210764,5.333463707,4.836473374,5.560304763,5.424411738,5.647805483,5.257151582,5.280871879,5.447014973,5.873982119,5.73478187,5.99327285,5.593167545,5.889100927,5.866736532,4.562959517,4.100189695,4.416131426,4.184933414,4.841959415,5.006941206,4.902454836,5.18493886,5.35594779,5.469043913,4.38289586,4.298306102,4.299793396,5.212002349,5.493618393,4.890995242,5.641420029,5.570815594,5.777670121,5.850528484,5.929768397,5.434254288,4.651661731,4.447466845,4.864239153,5.84678328,5.408688659,5.078911087,4.886723106,5.480125616,5.819508915,5.807324487,6.08248411,6.855115995,7.129612947,8.45803799,7.029366127,7.008469114,6.38521109,7.022016212,6.427406637,6.058666527,5.171781611,5.768984763,5.409991748,6.423703937,6.593429229,6.798706708,7.689080393,7.409274658,8.595683815,9.10911598,9.367474222,9.151435721,9.734984645,9.567464339,8.983963472,9.498930775,9.540240122,9.283658463,9.839121887,9.552740438,8.985389581,8.889326888,8.875244817,8.943092768,9.04690125,9.0815744];
var d2_rew_opp = [6.725088481,7.199356931,7.220612837,7.53084652,7.547338243,7.783513377,6.967584118,6.997644782,6.412854797,5.55795409,5.494902875,5.062729181,5.292625324,4.282570567,4.8962242,4.764644033,4.696223059,4.702789236,4.666536293,5.163526626,4.439695237,4.575588262,4.352194517,4.742848418,4.719128121,4.552985027,4.126017881,4.26521813,4.00672715,4.406832455,4.110899073,4.133263468,5.437040483,5.899810305,5.583868574,5.815066586,5.158040585,4.993058794,5.097545164,4.81506114,4.64405221,4.530956087,5.61710414,5.701693898,5.700206604,4.787997651,4.506381607,5.109004758,4.358579971,4.429184406,4.222329879,4.149471516,4.070231603,4.565745712,5.348338269,5.552533155,5.135760847,4.15321672,4.591311341,4.921088913,5.113276894,4.519874384,4.180491085,4.192675513,3.91751589,3.144884005,2.870387053,1.54196201,2.970633873,2.991530886,3.61478891,2.977983788,3.572593363,3.941333473,4.828218389,4.231015237,4.590008252,3.576296063,3.406570771,3.201293292,2.310919607,2.590725342,1.404316185,0.89088402,0.632525778,0.848564279,0.265015355,0.432535661,1.016036528,0.501069225,0.459759878,0.716341537,0.160878113,0.447259562,1.014610419,1.110673112,1.124755183,1.056907232,0.95309875,0.9184256];
var d2_rew_pen = [1.274911519,0.800643069,0.779387163,0.46915348,0.452661757,0.216486623,1.032415882,1.002355218,1.587145203,2.44204591,2.505097125,2.937270819,2.707374676,3.717429433,3.1037758,3.235355967,3.303776941,3.297210764,3.333463707,2.836473374,3.560304763,3.424411738,3.647805483,3.257151582,3.280871879,3.447014973,3.873982119,3.73478187,3.99327285,3.593167545,3.889100927,3.866736532,2.562959517,2.100189695,2.416131426,2.184933414,2.841959415,3.006941206,2.902454836,3.18493886,3.35594779,3.469043913,2.38289586,2.298306102,2.299793396,3.212002349,3.493618393,2.890995242,3.641420029,3.570815594,3.777670121,3.850528484,3.929768397,3.434254288,2.651661731,2.447466845,2.864239153,3.84678328,3.408688659,3.078911087,2.886723106,3.480125616,3.819508915,3.807324487,4.08248411,4.855115995,5.129612947,6.45803799,5.029366127,5.008469114,4.38521109,5.022016212,4.427406637,4.058666527,3.171781611,3.768984763,3.409991748,4.423703937,4.593429229,4.798706708,5.689080393,5.409274658,6.595683815,7.10911598,7.367474222,7.151435721,7.734984645,7.567464339,6.983963472,7.498930775,7.540240122,7.283658463,7.839121887,7.552740438,6.985389581,6.889326888,6.875244817,6.943092768,7.04690125,7.0815744];
var d2_rew_opp_pen = [4.725088481,5.199356931,5.220612837,5.53084652,5.547338243,5.783513377,4.967584118,4.997644782,4.412854797,3.55795409,3.494902875,3.062729181,3.292625324,2.282570567,2.8962242,2.764644033,2.696223059,2.702789236,2.666536293,3.163526626,2.439695237,2.575588262,2.352194517,2.742848418,2.719128121,2.552985027,2.126017881,2.26521813,2.00672715,2.406832455,2.110899073,2.133263468,3.437040483,3.899810305,3.583868574,3.815066586,3.158040585,2.993058794,3.097545164,2.81506114,2.64405221,2.530956087,3.61710414,3.701693898,3.700206604,2.787997651,2.506381607,3.109004758,2.358579971,2.429184406,2.222329879,2.149471516,2.070231603,2.565745712,3.348338269,3.552533155,3.135760847,2.15321672,2.591311341,2.921088913,3.113276894,2.519874384,2.180491085,2.192675513,1.91751589,1.144884005,0.870387053,-0.45803799,0.970633873,0.991530886,1.61478891,0.977983788,1.572593363,1.941333473,2.828218389,2.231015237,2.590008252,1.576296063,1.406570771,1.201293292,0.310919607,0.590725342,-0.595683815,-1.10911598,-1.367474222,-1.151435721,-1.734984645,-1.567464339,-0.983963472,-1.498930775,-1.540240122,-1.283658463,-1.839121887,-1.552740438,-0.985389581,-0.889326888,-0.875244817,-0.943092768,-1.04690125,-1.0815744];

var d3_rew = [7.366443309,7.316509753,6.952795469,6.819529133,7.680153491,7.180544195,7.490910809,7.268954798,7.005122815,6.710165038,5.679350879,6.211144726,6.292109586,6.677150628,7.189028261,7.025731494,8.219353935,7.499740241,7.382353306,7.495397554,8.568392059,8.091976062,7.765700457,7.6427137,7.969007092,7.820856035,7.037315221,6.747510735,6.299607432,6.378516284,6.368335661,6.895827416,6.300019946,5.911715711,5.077689025,4.434286471,4.54540284,4.6647121,4.250512938,3.800360233,3.814671013,4.035605968,3.762935363,2.963612776,3.76796943,3.850138263,4.147705601,3.981948417,3.708941477,3.269152942,3.776599269,3.760887185,3.655847879,3.876463381,3.712476306,4.392856166,3.923674977,3.058681531,2.615866255,2.432402067,2.877980987,2.832492696,3.253950265,3.321989813,2.752099111,1.796903143,1.206406919,1.081027965,1.708148276,2.007759091,1.477429626,1.270213622,1.467857114,1.281077595,1.503939643,1.664165687,2.635339041,3.160282491,3.031555208,3.585747706,3.220076373,2.916278729,2.873071203,2.977987878,2.286008374,1.096000603,0.519613041,0.882883309,0.971279953,0.479186907,1.036362194,1.539320156,1.92242301,1.9712266,2.294633494,2.274893947,1.772817682,1.905320047,1.816449799,1.589022456];
var d3_rew_opp = [2.633556691,2.683490247,3.047204531,3.180470867,2.319846509,2.819455805,2.509089191,2.731045202,2.994877185,3.289834962,4.320649121,3.788855274,3.707890414,3.322849372,2.810971739,2.974268506,1.780646065,2.500259759,2.617646694,2.504602446,1.431607941,1.908023938,2.234299543,2.3572863,2.030992908,2.179143965,2.962684779,3.252489265,3.700392568,3.621483716,3.631664339,3.104172584,3.699980054,4.088284289,4.922310975,5.565713529,5.45459716,5.3352879,5.749487062,6.199639767,6.185328987,5.964394032,6.237064637,7.036387224,6.23203057,6.149861737,5.852294399,6.018051583,6.291058523,6.730847058,6.223400731,6.239112815,6.344152121,6.123536619,6.287523694,5.607143834,6.076325023,6.941318469,7.384133745,7.567597933,7.122019013,7.167507304,6.746049735,6.678010187,7.247900889,8.203096857,8.793593081,8.918972035,8.291851724,7.992240909,8.522570374,8.729786378,8.532142886,8.718922405,8.496060357,8.335834313,7.364660959,6.839717509,6.968444792,6.414252294,6.779923627,7.083721271,7.126928797,7.022012122,7.713991626,8.903999397,9.480386959,9.117116691,9.028720047,9.520813093,8.963637806,8.460679844,8.07757699,8.0287734,7.705366506,7.725106053,8.227182318,8.094679953,8.183550201,8.410977544];
var d3_rew_pen = [5.366443309,5.316509753,4.952795469,4.819529133,5.680153491,5.180544195,5.490910809,5.268954798,5.005122815,4.710165038,3.679350879,4.211144726,4.292109586,4.677150628,5.189028261,5.025731494,6.219353935,5.499740241,5.382353306,5.495397554,6.568392059,6.091976062,5.765700457,5.6427137,5.969007092,5.820856035,5.037315221,4.747510735,4.299607432,4.378516284,4.368335661,4.895827416,4.300019946,3.911715711,3.077689025,2.434286471,2.54540284,2.6647121,2.250512938,1.800360233,1.814671013,2.035605968,1.762935363,0.963612776,1.76796943,1.850138263,2.147705601,1.981948417,1.708941477,1.269152942,1.776599269,1.760887185,1.655847879,1.876463381,1.712476306,2.392856166,1.923674977,1.058681531,0.615866255,0.432402067,0.877980987,0.832492696,1.253950265,1.321989813,0.752099111,-0.203096857,-0.793593081,-0.918972035,-0.291851724,0.007759091,-0.522570374,-0.729786378,-0.532142886,-0.718922405,-0.496060357, 0.335834313,0.635339041,1.160282491,1.031555208,1.585747706,1.220076373,0.916278729,0.873071203,0.977987878,0.286008374,-0.903999397,-1.480386959,-1.117116691,-1.028720047,-1.520813093,-0.963637806,-0.460679844,-0.07757699,-0.0287734,0.294633494,0.274893947,-0.227182318,-0.094679953,-0.183550201,-0.410977544]
var d3_rew_opp_pen = [0.633556691,0.683490247,1.047204531,1.180470867,0.319846509,0.819455805,0.509089191,0.731045202,0.994877185,1.289834962,2.320649121,1.788855274,1.707890414,1.322849372,0.810971739,0.974268506,-0.219353935,0.500259759,0.617646694,0.504602446,-0.568392059,-0.091976062,0.234299543,0.3572863,0.030992908,0.179143965,0.962684779,1.252489265,1.700392568,1.621483716,1.631664339,1.104172584,1.699980054,2.088284289,2.922310975,3.565713529,3.45459716,3.3352879,3.749487062,4.199639767,4.185328987,3.964394032,4.237064637,5.036387224,4.23203057,4.149861737,3.852294399,4.018051583,4.291058523,4.730847058,4.223400731,4.239112815,4.344152121,4.123536619,4.287523694,3.607143834,4.076325023,4.941318469,5.384133745,5.567597933,5.122019013,5.167507304,4.746049735,4.678010187,5.247900889,6.203096857,6.793593081,6.918972035,6.291851724,5.992240909,6.522570374,6.729786378,6.532142886,6.718922405,6.496060357,6.335834313,5.364660959,4.839717509,4.968444792,4.414252294,4.779923627,5.083721271,5.126928797,5.022012122,5.713991626,6.903999397,7.480386959,7.117116691,7.028720047,7.520813093,6.963637806,6.460679844,6.07757699,6.0287734,5.705366506,5.725106053,6.227182318,6.094679953,6.183550201,6.410977544];

var d4_rew = [1.979834859,1.941097046,1.911699778,2.26152288,1.847320977,3.000608166,2.135595668,1.639144508,1.804810122,2.250526515,1.730008593,2.754674033,2.108120922,1.992965048,2.898304441,3.942695808,3.966874247,4.186822519,3.931724352,4.141141009,4.068203458,3.442701805,3.911310666,4.277285454,3.66543621,4.445587148,5.115362438,4.977204821,5.719100416,6.295840512,5.782928862,5.557331264,5.911949422,5.100102266,5.024459451,5.328938845,5.657855297,5.119602726,5.098097005,5.627248027,6.427712621,6.801604802,6.912392878,6.856757118,6.974608749,7.392490689,7.435892566,7.615433833,7.806420335,9.136237054,8.696484999,9.29188928,9.171296696,8.469883664,8.736399075,8.81787754,8.849789173,8.674394684,8.492765103,8.559973631,8.518783248,8.220937951,8.462778239,8.541303557,7.836559436,8.388158122,8.867383285,8.94974527,8.846267786,8.402602461,8.453076012,7.216259238,7.695099148,8.152569015,8.937535354,8.918500984,8.728885203,8.780150901,9.043440017,9.714030406,8.900767198,8.636153734,8.80485982,8.981209771,9.102952436,9.221297573,9.64847729,9.394548651,9.98041018,8.822902721,8.189329126,8.76833869,8.43830711,7.685222442,8.68918913,9.238598131,9.655326519,9.601875323,9.594825029,9.715077849];
var d4_rew_opp = [8.020165141,8.058902954,8.088300222,7.73847712,8.152679023,6.999391834,7.864404332,8.360855492,8.195189878,7.749473485,8.269991407,7.245325967,7.891879078,8.007034952,7.101695559,6.057304192,6.033125753,5.813177481,6.068275648,5.858858991,5.931796542,6.557298195,6.088689334,5.722714546,6.33456379,5.554412852,4.884637562,5.022795179,4.280899584,3.704159488,4.217071138,4.442668736,4.088050578,4.899897734,4.975540549,4.671061155,4.342144703,4.880397274,4.901902995,4.372751973,3.572287379,3.198395198,3.087607122,3.143242882,3.025391251,2.607509311,2.564107434,2.384566167,2.193579665,0.863762946,1.303515001,0.70811072,0.828703304,1.530116336,1.263600925,1.18212246,1.150210827,1.325605316,1.507234897,1.440026369,1.481216752,1.779062049,1.537221761,1.458696443,2.163440564,1.611841878,1.132616715,1.05025473,1.153732214,1.597397539,1.546923988,2.783740762,2.304900852,1.847430985,1.062464646,1.081499016,1.271114797,1.219849099,0.956559983,0.285969594,1.099232802,1.363846266,1.19514018,1.018790229,0.897047564,0.778702427,0.35152271,0.605451349,0.01958982,1.177097279,1.810670874,1.23166131,1.56169289,2.314777558,1.31081087,0.761401869,0.344673481,0.398124677,0.405174971,0.284922151];
var d4_rew_pen = [-0.020165141,-0.058902954,-0.088300222,0.26152288,-0.152679023,1.000608166,0.135595668,-0.360855492,-0.195189878,0.250526515,-0.269991407,0.754674033,0.108120922,-0.007034952,0.898304441,1.942695808,1.966874247,2.186822519,1.931724352,2.141141009,2.068203458,1.442701805,1.911310666,2.277285454,1.66543621,2.445587148,3.115362438,2.977204821,3.719100416,4.295840512,3.782928862,3.557331264,3.911949422,3.100102266,3.024459451,3.328938845,3.657855297,3.119602726,3.098097005,3.627248027,4.427712621,4.801604802,4.912392878,4.856757118,4.974608749,5.392490689,5.435892566,5.615433833,5.806420335,7.136237054,6.696484999,7.29188928,7.171296696,6.469883664,6.736399075,6.81787754,6.849789173,6.674394684,6.492765103,6.559973631,6.518783248,6.220937951,6.462778239,6.541303557,5.836559436,6.388158122,6.867383285,6.94974527,6.846267786,6.402602461,6.453076012,5.216259238,5.695099148,6.152569015,6.937535354,6.918500984,6.728885203,6.780150901,7.043440017,7.714030406,6.900767198,6.636153734,6.80485982,6.981209771,7.102952436,7.221297573,7.64847729,7.394548651,7.98041018,6.822902721,6.189329126,6.76833869,6.43830711,5.685222442,6.68918913,7.238598131,7.655326519,7.601875323,7.594825029,7.715077849];
var d4_rew_opp_pen = [6.020165141,6.058902954,6.088300222,5.73847712,6.152679023,4.999391834,5.864404332,6.360855492,6.195189878,5.749473485,6.269991407,5.245325967,5.891879078,6.007034952,5.101695559,4.057304192,4.033125753,3.813177481,4.068275648,3.858858991,3.931796542,4.557298195,4.088689334,3.722714546,4.33456379,3.554412852,2.884637562,3.022795179,2.280899584,1.704159488,2.217071138,2.442668736,2.088050578,2.899897734,2.975540549,2.671061155,2.342144703,2.880397274,2.901902995,2.372751973,1.572287379,1.198395198,1.087607122,1.143242882,1.025391251,0.607509311,0.564107434,0.384566167,0.193579665,-1.136237054,-0.696484999,-1.29188928,-1.171296696,-0.469883664,-0.736399075,-0.81787754,-0.849789173,-0.674394684,-0.492765103,-0.559973631,-0.518783248,-0.220937951,-0.462778239,-0.541303557,0.163440564,-0.388158122,-0.867383285,-0.94974527,-0.846267786,-0.402602461,-0.453076012,0.783740762,0.304900852,-0.152569015,-0.937535354,-0.918500984,-0.728885203,-0.780150901,-1.043440017,-1.714030406,-0.900767198,-0.636153734,-0.80485982,-0.981209771,-1.102952436,-1.221297573,-1.64847729,-1.394548651,-1.98041018,-0.822902721,-0.189329126,-0.76833869,-0.43830711,0.314777558,-0.68918913,-1.238598131,-1.655326519,-1.601875323,-1.594825029,-1.715077849];

var points;
var totalPoints = 0;

var trialCounter = 0;
var maxTrials = 100; // CHANGE BACK TO 100!!!!

/* Page 7 variables */
var pointsModelBased;
var totalPointsModelBased = 0;
var totalPointsModelBasedComplex = 0;

var trialModelBased = 0;
var maxTrialsModelBased = 15;

var rewards_mb_r1 = [40.32,50.88,10.32,70.52,30.13,60.09,50.4,30.88,20.47,90.32,70.22,40.36,20.34,30.57,30.41];
var rewards_mb_r2 = [50.68,40.12,30.68,20.48,10.87,30.91,60.6,60.12,70.53,30.48,20.78,50.64,30.66,60.43,60.59];
var rewards_mb_r3 = [30.68,20.12,50.68,10.48,-10.13,90.91,20.6,70.12,90.53,10.48,80.78,30.64,50.66,65.83,40.59];
var rewards_mb_r4 = [20.32,60.88,40.32,50.52,60.13,40.09,30.4,40.88,10.47,40.52,50.22,20.36,0.34,10.57,10.41];

var s3_choice_c;
var s4_choice_c;
var s5_choice_c;
var s6_choice_c;


/* Generic code running when page has loaded */

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10){
	dd='0'+dd;
}

if(mm<10){
	mm='0'+mm;
}

var currentDay = dd + '/' + mm + '/' + yyyy;


var hours = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();

if (hours < 10){
	hours = '0' + hours;
}

if (minutes < 10){
	minutes = '0' + minutes;
}

if (seconds < 10){
	seconds = '0' + seconds;
}

var currentTime = hours + ":" + minutes + ":" + seconds;

dataList.push(currentDay);
dataList.push(currentTime);


/* condition assignment and adminsistration */

var conditionAssigned = false;

/* Initialize firebase */
$(document).ready(function() {
	var config = {
	apiKey: "AIzaSyBWYTR2JwsdhDql23OLZpepywa5HJ4NwVo",
	authDomain: "mbvsmf-688f2.firebaseapp.com",
	databaseURL: "https://mbvsmf-688f2.firebaseio.com",
	projectId: "mbvsmf-688f2",
	storageBucket: "mbvsmf-688f2.appspot.com",
	messagingSenderId: "333505220459"
	};
	firebase.initializeApp(config);

	var database = firebase.database();
	refConditions = database.ref('conditions')
	ref = database.ref('expData');

	refConditions.on('value', decideCondition);

});

/* Counterbalancing and determining the experimental condition */

function decideCondition(data) {

		if (conditionAssigned === false) {

			count1 = 0;
			count2 = 0;

			conditions = data.val();
			keys = Object.keys(conditions);
			for (var i = 0; i < keys.length; i++) {
					k = keys[i];
					condition = conditions[k];

				if (condition === 1)
					count1++;
				if (condition === 2)
					count2++;
			}

			console.log(count1);
			console.log(count2);

			if (count1 > count2 || count1 === count2) {
					expCondition = 2;
			} else {
					expCondition = 1;
			}

			console.log('runrunrun')
			conditionAssigned = true;
			refConditions.push(expCondition);
 		}

}


$(document).ready(function() {

	$('#nextButtonWelcome').click(nextPage);
	$('#nextButtonConsent').click(nextPage);
	$('#nextButtonDemographics').click(nextPage);
	$('#nextButtonInstructions').click(nextPage);
	$('#nextButtonInstructions2').click(nextPage);
	$('#nextButtonModelBasedSimple').click(nextPage);
	$('#nextButtonModelBasedComplex').click(choiceCheckerComplex);
	$('#nextButtonModelBasedComplex2').click(choiceCheckerComplex2);

	$('#page42').hide();
	$('#page82').hide();

});
