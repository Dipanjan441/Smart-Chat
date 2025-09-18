import { MessageState, Sender } from "./types"

export const getFormattedMessageData = (text: string, sender: Sender): MessageState => {
    return (
        {
            id: String(Date.now())+'-'+sender,
            text,
            sender
        }
    )
}

export const handleResponse = async (input: MessageState[], onStream: (chunk: string) => void) => {
    console.log('int', input)
    try {
        const apiData = await fetch('/api/chat-stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reqMsg: input })
        })
        if (!apiData.body) throw new Error("No response body");
        // console.log('apidata----------',apiData)
        const contentType = apiData.headers.get("Content-Type");
        if(contentType?.includes("application/json")){
            const errorData = await apiData.json();
            throw new Error(errorData.message || "Something went wrong!");
        }

        const reader = apiData.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // console.log('value#########',chunk)
            onStream(chunk); // send each chunk to UI
        }
    } catch (error: any) {
        onStream(error.message);
    }
}