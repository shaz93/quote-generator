const apiKey = "643960765dfbctb234c6b4f7o500facf";

      // Presets selector interaction
      function selectPreset(val) {
        document.querySelector("#topic").value = val;
        document.querySelector("#topic").focus();
      }

      function generateQuote(event) {
        event.preventDefault();

        let topicInput = document.querySelector("#topic");
        let submitButton = document.querySelector("#submit-btn");
        let optionsContainer = document.querySelector("#options-container");
        let topic = topicInput.value.trim();

        // Beautiful Loading State
        document.querySelector("#quote").innerHTML = `<span class="loading-text">Channelling cosmic thoughts about "${topic}"...</span>`;
        optionsContainer.style.display = "none";
        
        submitButton.disabled = true;
        submitButton.value = "Channelling...";

        let prompt = `Generate a beautiful, single-sentence quote about ${topic}`;
        let context = "Do not include quotation marks around the quote, and do not include the author name.";
        let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

        axios.get(url)
          .then((response) => {
            let quote = response.data.answer.trim();

            // Clear the loader text
            document.querySelector("#quote").innerText = "";

            // Simple Typewriter Initialization
            new Typewriter("#quote", {
              strings: quote,
              autoStart: true,
              delay: 30,
              cursor: "",
            });

            // Reveal copy/tweet action buttons
            optionsContainer.style.display = "flex";
            document.querySelector("#copy-btn").innerText = "Copy Quote";
          })
          .catch((error) => {
            document.querySelector("#quote").innerHTML = "Oops! Something went wrong. Please try again.";
          })
          .finally(() => {
            submitButton.disabled = false;
            submitButton.value = "Generate Quote";
          });
      }

      // Sandbox-safe copy text procedure
      document.querySelector("#copy-btn").addEventListener("click", () => {
        let quoteText = document.querySelector("#quote").innerText;
        let copyBtn = document.querySelector("#copy-btn");

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(quoteText)
            .then(() => {
              showSuccessFeedback(copyBtn);
            })
            .catch(() => {
              fallbackCopy(quoteText, copyBtn);
            });
        } else {
          fallbackCopy(quoteText, copyBtn);
        }
      });

      function fallbackCopy(text, buttonElement) {
        let tempTextarea = document.createElement("textarea");
        tempTextarea.value = text;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);
        showSuccessFeedback(buttonElement);
      }

      function showSuccessFeedback(buttonElement) {
        buttonElement.innerText = "✓ Copied!";
        setTimeout(() => {
          buttonElement.innerText = "Copy Quote";
        }, 2000);
      }

      // Tweet Option
      document.querySelector("#tweet-btn").addEventListener("click", () => {
        let quoteText = document.querySelector("#quote").innerText;
        let tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quoteText + '"')}`;
        window.open(tweetUrl, "_blank");
      });

      // Form submission hook
      let quoteFormElement = document.querySelector("#quote-generator-form");
      quoteFormElement.addEventListener("submit", generateQuote);