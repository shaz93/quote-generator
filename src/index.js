 const apiKey = ""; // Automatically injected at runtime

      function generateQuote(event) {
        event.preventDefault();

        let topicInput = document.querySelector("#topic");
        let topic = topicInput.value.trim();

    
        document.querySelector("#quote").innerHTML = "Searching the cosmos...";

        let systemPrompt = "Write a beautiful, single-sentence quote about the given topic. Do not include quotes around it, and do not include the author's name.";
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        let payload = {
          contents: [{ parts: [{ text: `Topic: ${topic}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then((response) => response.json())
          .then((data) => {
            let quote = data.candidates[0].content.parts[0].text.trim();

            
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