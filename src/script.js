import React, { useRef } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";
import { FontAwesomeIcon } from "https://esm.sh/@fortawesome/react-fontawesome@latest"
import { faQuoteLeft } from "https://esm.sh/@fortawesome/free-solid-svg-icons@latest";
import { faTumblr, faTwitter } from "https://esm.sh/@fortawesome/free-brands-svg-icons";

const { useState, useEffect } = React;

const App = () => {
  const [quote, setQuote] = useState({});
  const [tweetUrl, setTweetUrl] = useState("");
  const [tumblrUrl, setTumblrUrl] = useState("");
  
  useEffect(() => {
    getNewQuote();
  }, []);
  
  useEffect(() => {
    if (quote.text && quote.author) {
      const newTweetUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURI(
        `"${quote.text}" ${quote.author}` )}`;
      setTweetUrl(newTweetUrl);
    }
  }, [quote]);
  
  useEffect(() => {
    if (quote.text && quote.author) {
      const tumblr = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURI(quote.author)}&content=${encodeURI(quote.text)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
      setTumblrUrl(tumblr);
    }
  }, [quote]);
  
  const getNewQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });      
      setRandomBodyColor();
    } catch (error) {
      console.error('Error fetching new quote:', error);
    }
  };

  const setRandomBodyColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
    document.body.style.color = randomColor;
    
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
      button.style.backgroundColor = randomColor;
    });
  };
  
  const tweetQuote = () => {
    window.open(tweetUrl, '_blank');
  };
  
  const tumblrQuote = () => {
    window.open(tumblrUrl, '_blank');
  };
  
  return (
    <div class="quote-box">
	  <div class="quote-text">
		<FontAwesomeIcon icon={faQuoteLeft} /> <span id="text">{ quote.text }</span>
	  </div>
	  <div class="quote-author">
		- <span id="author">{ quote.author }</span>
	  </div>
	  <div class="buttons">
		<a href={tweetUrl} class="button" id="tweet-quote" title="Tweet this quote!" target="_blank">
		  <FontAwesomeIcon icon={faTwitter} />
		</a>
     <a href={tumblrUrl} class="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank">
		   <FontAwesomeIcon icon={faTumblr} />
		</a>
		<button class="button" id="new-quote" onClick={getNewQuote}>New quote</button>
	  </div>
	</div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
