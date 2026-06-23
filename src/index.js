 const apiKey = "643960765dfbctb234c6b4f7o500facf";

      function generateQuote(event) {
        event.preventDefault();

        let topicInput = document.querySelector("#topic");
        let topic = topicInput.value.trim();

        // Clear the display with an initial loading note
        document.querySelector("#quote").innerHTML = `<span class="loading-text">Searching the cosmos for "${topic}"...</span>`;

        let prompt = `Generate a beautiful, single-sentence quote about ${topic}`;
        let context = "Do not include quotation marks around the quote, and do not include the author name.";
        let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

        // Get content via Axios & trigger the custom Typewriter configuration
        axios.get(url)
          .then((response) => {
            let quote = response.data.answer.trim();

            new Typewriter("#quote", {
              strings: quote,
              autoStart: true,
              delay: 30,
              cursor: "",
            });
          })
          .catch((error) => {
            document.querySelector("#quote").innerHTML = "Oops! Something went wrong. Please try again.";
          });
      }

      let quoteFormElement = document.querySelector("#quote-generator-form");
      quoteFormElement.addEventListener("submit", generateQuote);