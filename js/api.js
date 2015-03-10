define(['settings','order'], function(settings,order)
{
	'use strict';
	var userData_ = {};
	var characters_ = {};

	// custom variables
	
	var meanings_ = {};
	var vocabulary_ = {};

	var meaningsList = "";
	var characterList = "";
	var vocabularyList = "";
	
	var resultsTest = "";
	var resultsTest2 = "";
	var resultsTest3 = "";
	// end custom variables

	return {
		load: function(onComplete) {
			var key = settings.api_key;
			if(document.getElementById('vocabOption').checked)
			{
				var url = 'https://www.wanikani.com/api/user/' + key + '/vocabulary?callback=define';
			}
			else if(document.getElementById('radicalOption').checked)
			{
				var url = 'https://www.wanikani.com/api/user/' + key + '/radicals?callback=define';
			}
			else
			{
				var url = 'https://www.wanikani.com/api/user/' + key + '/kanji?callback=define';
			}

			require([url], function(data) {
				if (data.error !== undefined) {
					var messageElem = document.getElementById('message');
					messageElem.innerHTML = "API Error: " + data.error.message;
					return;
				}
				userData_ = data.user_information;
				if(document.getElementById('kanjiOption').checked)
				{
					resultsTest = "";
					characterList = "";
					characters_ = {};
					data.requested_information.forEach(function (character)
					{
						characters_[character.character] = character;
						characterList += character.character + " ";
						if(character.user_specific == null)
						{
							resultsTest += '<span class="unseen">' + character.character + '</span> ';
							//console.log("SRS unseen");
						}
						else
						{
							resultsTest += '<span class="' + character.user_specific.srs + '">' + character.character + '</span> '; 
							//console.log("SRS " + character.user_specific.srs);
						}
					});
					//console.log(characterList);
					
					data.requested_information.forEach(function (meaning)
					{
						meanings_[meaning.meaning] = meaning;
						meaningsList += meaning.meaning + " ";
					});
					order.data = characterList;
				}
				else if(document.getElementById('radicalOption').checked)
				{
					resultsTest2 = "";
					characterList = "";
					characters_ = {};
					data.requested_information.forEach(function (character)
					{
						characters_[character.character] = character;
						characterList += character.character + " ";
						if(character.character == null)
						{
							if(character.user_specific == null)
							{
								resultsTest2 += '<span class="image-unseen">' + '<img src="' + character.image + '" width="16px" height="16px"/></span>';
								//console.log("SRS unseen");
							}
							else
							{
								resultsTest2 += '<span class="' + character.user_specific.srs + '">' + '<img src="' + character.image + '" width="16px" height="16px"/></span>';
								//console.log("SRS " + character.user_specific.srs);
							}
						}
						else
						{
							if(character.user_specific == null)
							{
								resultsTest2 += '<span class="unseen">' + character.character + '</span> ';
								//console.log("SRS unseen");
							}
							else
							{
								resultsTest2 += '<span class="' + character.user_specific.srs + '">' + character.character + '</span> '; 
								//console.log("SRS " + character.user_specific.srs);
							}
						}
					});
					order.data = characterList;
				}
				else
				{
					resultsTest3 = "";
					characterList = "";
					characters_ = {};
					data.requested_information.general.forEach(function (character)
					{
						characters_[character.character] = character;
						characterList += character.character + " ";
						if(character.user_specific == null)
						{
							resultsTest3 += '<span class="unseen">' + character.character + '</span> ';
							//console.log("SRS unseen");
						}
						else
						{
							resultsTest3 += '<span class="' + character.user_specific.srs + '">' + character.character + '</span> '; 
							//console.log("SRS " + character.user_specific.srs);
						}
					});
					//console.log(vocabularyList);

					data.requested_information.general.forEach(function (meaning)
					{
						meanings_[meaning.meaning] = meaning;
						meaningsList += meaning.meaning + " | ";
					});
					order.data = characterList;
				}
				//console.log(meaningsList);
				//console.log("Complete Dump " + JSON.stringify(data.requested_information));
				/*
				document.getElementById('meaningResults').value = meaningsList;
				document.getElementById('characterResults').value = characterList;
				document.getElementById('vocabResults').value = vocabularyList;
				*/
				document.getElementById('outputTestResults').innerHTML = resultsTest;
				document.getElementById('outputTestResults2').innerHTML = resultsTest2;
				document.getElementById('outputTestResults3').innerHTML = resultsTest3;
				onComplete();
			});
},
get userData() { return userData_; },
get characters() { return characters_; }
};
});
