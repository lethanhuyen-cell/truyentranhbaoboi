import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { text, voice } = body;
        
        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Retrieve API key from environment variables (secured on Server-side)
        const apiKey = process.env.FPT_AI_API_KEY || 'sUsUf2sWEhcLYaLAQYGkVNFjW6XGkMLG'; 
        const selectedVoice = voice || 'banmai';

        // Clean text to avoid reading punctuation: "không đọc các dấu câu"
        const cleanedText = text.replace(/[,.;?!:—\-\"\'\(\)\[\]\{\}]/g, ' ');

        const response = await fetch("https://api.fpt.ai/hmi/tts/v5", {
            method: "POST",
            headers: {
                "api_key": apiKey,
                "api-key": apiKey,
                "voice": selectedVoice,
                "speed": "0",
                "format": "mp3"
            },
            body: cleanedText
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return NextResponse.json({ error: errorMsg || "Failed to generate audio from FPT.AI" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("FPT AI server API Route connection error", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
