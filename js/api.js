define(['settings'], function(settings) {
	'use strict';
	var userData_ = {};
	var characters_ = {};
	var meanings_ = {};
	var meaningsList = "";
	var characterList = "";

	var vocabulary_ = {};
	var vocabularyList = "";

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
				console.clear();
				if(document.getElementById('kanjiOption').checked || document.getElementById('radicalOption').checked)
				{
					data.requested_information.forEach(function (character) {
						characters_[character.character] = character;
						characterList += character.character + " ";
					});
					console.log(characterList);

					data.requested_information.forEach(function (meaning) {
						meanings_[meaning.meaning] = meaning;
						meaningsList += meaning.meaning + " ";
					});
					console.log(meaningsList);
				}
				else
				{
					data.requested_information.general.forEach(function (character)
					{
						vocabulary_[character.character] = character;
						vocabularyList += character.character + " ";
					});
					console.log(vocabularyList);

					data.requested_information.general.forEach(function (meaning) {
						meanings_[meaning.meaning] = meaning;
						meaningsList += meaning.meaning + " ";
					});
					console.log(meaningsList);
				}

				
				onComplete();
			});
},
get userData() { return userData_; },
get characters() { return characters_; }
};
});
