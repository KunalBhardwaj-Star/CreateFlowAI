import "dotenv/config";

const getGroqAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: req.body.message
                }
            ]
        })
    };

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            options
        );

        const data = await response.json();

        //console.log(data);

        return data.choices[0].message.content;

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
}

export default getGroqAPIResponse;