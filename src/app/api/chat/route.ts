import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_KEY });

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

export async function GET() {
    return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}

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
        //process the request msg
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: reqMsg
        })
        return new Response(JSON.stringify({
            success: true,
            message: response.text
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error: any) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message ?? 'Something went wrong'
        }))
    }

}