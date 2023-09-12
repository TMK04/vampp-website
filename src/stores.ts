import { writable, type Writable } from "svelte/store";

export type ObjIdConversation = Record<string, { topic: string; file: File | string }>;

export const obj_id_conversation_store: Writable<ObjIdConversation> = writable({});
