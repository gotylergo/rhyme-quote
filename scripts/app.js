$(function() {

	// Declare variables
	var randomQuoteNo
	var quote1
	var author1

	// Rotating background images

	var changeBackground = function() {
    var bgArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg", "bg12.jpg", "bg13.jpg"];
    var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    var path = 'images/';
    $("body").fadeTo('slow', 0.2, function() {
    	$(this).css("background-image","url('"+path+bg+"')").fadeTo("slow", 1);
		});
	};
	changeBackground();

    // Get input

    $("#getInput").submit(function(event) {
    	event.preventDefault();
    	var tag = $("#topic").val();
    	changeBackground();
    	// Get random quote 1

	    $.ajax({
	    	url: "http://localhost/quotesAPI",
	    	data: {"q" : tag},
	    	dataType: "json",
	    	type: "GET",
	    })

	    .done(function(quoteList){
			randomQuoteNo = Math.floor(Math.random() * quoteList.length);
			quote1 = quoteList[randomQuoteNo].quote;
			author1 = quoteList[randomQuoteNo].author;
			$("#quote1").html(quote1+"<span> - "+author1+"</span>");

			// Get rhyme

		    $.ajax({
		    	url: "http://rhymebrain.com/talk",
		    	data: {"function" : "getRhymes", "word" : tag, "score" : "300", "frequency" : 28, "maxResults" : 50 },
		    	dataType: "json",
		    	type: "GET",
		    })

		    .done(function(rhymeWordList) {

				randomRhymeNo = Math.floor(Math.random() * rhymeWordList.length);
				tag = rhymeWordList[randomRhymeNo].word;

		    	// Get second quote based on rhyme

			    $.ajax({
			    url: "http://localhost/quotesAPI",
			    data: {"q" : tag},
			    dataType: "json",
			    type: "GET",
			    })

		   		.done(function(quoteList) {
					randomQuoteNo = Math.floor(Math.random() * quoteList.length);
					if (quoteList[randomQuoteNo].quote) {
					quote2 = quoteList[randomQuoteNo].quote;
					author2 = quoteList[randomQuoteNo].author;
		   			$("#quote2").html(quote2+"<span> - "+author2+"</span>")
		   		} else {
		   			alert("None!");
		   		}

		   		});
		    });
		});
	});
});