$(function() {

	// Declare variables
	let randomQuoteNo;
	let quote1;
	let author1;
	let randomRhymxeNo;

	// Rotating background images

	const changeBackground = function() {
	    const bgArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg", "bg12.jpg", "bg13.jpg", "bg14.jpg"];
	    let bg = bgArray[Math.floor(Math.random() * bgArray.length)];
	    const path = "images/";
	    $(".content").stop().animate({backgroundColor: "rgba(0, 0, 0, 1)"}, 600 ,function() {
		    $("main").css("background-image",`url('${path}${bg}')`);
		    $(".content").stop().animate({backgroundColor: "rgba(0, 0, 0, 0.2)"}, 600);
		});
	};
	changeBackground();

    // Get input

    $("#getInput").submit(function(event) {
		$(".load").show();
    	event.preventDefault();
    	let tag = $("#topic").val();
    	changeBackground();
    	// Get random quote 1

	    $.ajax({
	    	url: "//webdesign.tylerjustyn.com/oldsite/quotesAPI",
	    	data: {"q" : tag},
	    	dataType: "jsonp",
	    	crossDomain: true,
	    	type: "GET",
	    	success: function(quoteList){
				// If no quote1 found, alert user to try again	    	
		    	if (quoteList.length === 0) {
		    		$("#quote1").html(`No quotes found ending in "${tag}"`);
					$("#quote2").html("Please try again.");
				}
		    	// If quote1 found
				else {
					randomQuoteNo = Math.floor(Math.random() * quoteList.length);
					quote1 = quoteList[randomQuoteNo].quote;
					author1 = quoteList[randomQuoteNo].author;
					$("#quote1").html(`"${quote1}"<span> - ${author1}</span>`);
					$("#quote2").html("Loading....");

					// Get rhyme

				    $.ajax({
				    	url: "//rhymebrain.com/talk",
				    	data: {"function" : "getRhymes", "word" : tag, "score" : "300", "frequency" : 28, "maxResults" : 3},
				    	dataType: "json",
				    	type: "GET",
				    })

				    .done(function(rhymeWordList) {
				    	let i = 0;
				    	getRhymeWord(i, rhymeWordList);
					});
				}
					function getRhymeWord(i, rhymeWordList){
						if(i<rhymeWordList.length){
							getSecondQuote(i,rhymeWordList);
						} else {
							$("#quote2").html("Cannot find a matching quote that rhymes");
						}
					}
					function getSecondQuote(i, rhymeWordList){
						randomNo = Math.floor(Math.random() * rhymeWordList.length);
						tag = rhymeWordList[randomNo].word;
						rhymeWordList.splice(randomNo,1);
						$.ajax({
						    url: "//webdesign.tylerjustyn.com/oldsite/quotesAPI",
						    data: {"q" : tag},
						    dataType: "jsonp",
						    crossDomain: true,
						    type: "GET",
						    success: function(quoteList){
		    	   				if (quoteList.length > 0) {
		    						randomQuoteNo = Math.floor(Math.random() * quoteList.length);
		    						quote2 = quoteList[randomQuoteNo].quote;
		    						author2 = quoteList[randomQuoteNo].author;
		    			   			$("#quote2").html(`"${quote2}"<span> - ${author2}</span>`);
		    			   		} else {
		    			   			getRhymeWord(i,rhymeWordList);
		    			   		}
						    },
						    complete: function() {
						    	$('.load').hide();
						    }
					    });
					
					}
	    	}
	    });
	});
	$("#modal1").modal();
});