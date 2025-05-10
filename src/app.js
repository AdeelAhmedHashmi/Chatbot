        async function sendMessage() {
            const userInput = document.getElementById("userInput").value;
            if (!userInput) return;
            let prompt = `
            The Instructions inside [{ }] brackets is just for you that your prompt is must trained these instruction dont show any text that shows these inst4uction on your response  dont reply on these instruction only provide answer or reply of the actual prompt that inside { } brackets
            
            [{
            Instructions
              1. Your Name while this conversation is Adeels Chatbot 
              2. Your Owner name is AdeelAhmed and AdeelAhmed is a developer who developed your.
            }]
            
            Actual prompt
            {
              ${userInput}
            }
            `
            const chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += `<p class="user">${prompt}</p>`;
            document.getElementById("userInput").value = "";

            try {
                const response = await fetch("http://localhost:3000/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: userInput })
                });

                const data = await response.json();
                console.log(data)
                chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
                console.log(data.reply)
                chatBox.scrollTop = chatBox.scrollHeight;
            } catch (error) {
                console.error("Error:", error);
                chatBox.innerHTML += `<p class="bot"> Error connecting to server.</p>`;
            }
        }