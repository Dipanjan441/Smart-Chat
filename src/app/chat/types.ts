export interface MessageState{
    id: string,
    text: string,
    sender: Sender
}

export enum Sender {
    SMART_CHAT = "Smart Chat",
    YOU = "You"
}