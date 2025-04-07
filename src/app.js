        async function sendMessage() {
            const userInput = document.getElementById("userInput").value;
            if (!userInput) return;
            
            const chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += `<p class="user">${userInput}</p>`;
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