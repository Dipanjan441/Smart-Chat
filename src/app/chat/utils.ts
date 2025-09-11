import { MessageState, Sender } from "./types"

export const getFormattedMessageData = (text: string, sender: Sender): MessageState => {
    return (
        {
            id: String(Date.now()),
            text,
            sender
        }
    )
}

export const handleResponse = async (input: string) => {
    console.log('int',input)
    try {
        const apiData = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reqMsg: input })
        })
        const { success, message } = await apiData.json();
        if (success) {
            return message
        } else {
            return message ?? "Soemthing went wrong!!!"
        }
    } catch (error: any) {
        return error.message
    }
}