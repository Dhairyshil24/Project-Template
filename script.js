const quoteContainer = document.getElementById('quote-container');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const Loader = document.getElementById('loader');



let apiQuotes = [];

//show loading
function loading(){
    Loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){

    Loader.hidden = true;
    quoteContainer.hidden = false;
    
}

//show new quote
function newQuote(){

    loading();
    //Pick a random quote from apiQuotes
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //If author was not present, case handling
    if(!quote.author){
        quoteAuthor.textContent = 'UnKnown';
    }else{
        quoteAuthor.textContent = quote.author;

    }

    //check quote length to determine styling 

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    


    quoteText.textContent = quote.text;

    complete();


}

// Get Quotes from API
async function getQuotes(){
    loading();
    const aipUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {

        const response = await fetch(aipUrl);
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        //catch error here
        alert(error);
    }
    complete();
}

//tweer-quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

//add event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On-Load
getQuotes();

