import { GoogleGenAI } from "@google/genai";
import { error } from "console";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_KEY });

export async function POST(req: Request) {
    try {
        const { reqMsg } = await req.json();
        if (!reqMsg) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Request message is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        //stream data
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.0-flash-001',
            contents: { role: 'user', parts: [{ text: reqMsg }] }
        })

        // streamResult.stream is a ReadableStream of events/chunks
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        if (chunk.candidates && chunk.candidates[0].content?.parts) {
                            const text = chunk.candidates[0]?.content?.parts[0].text || "";
                            if (text) {
                                controller.enqueue(encoder.encode(text));
                            }
                        }
                    }
                } catch (error) {
                    controller.error(error)
                } finally {
                    controller.close()
                }
            }
        })

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            }
        })
    } catch (error: any) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message ?? 'Something went wrong'
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
    )
    }
}