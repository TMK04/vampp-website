import { derived, writable } from "svelte/store";
import samples from "./samples.json";

export type ObjIdConversation = Record<string, Conversation>;

export const obj_id_conversation_store = writable<ObjIdConversation>(samples);

export type Id = string | null;
export const id_store = writable<Id>(null);

export const conversation_store = derived(
	[obj_id_conversation_store, id_store],
	([$obj_id_conversation_store, $id_store]) => {
		if ($id_store === null) return null;
		const conversation = $obj_id_conversation_store[$id_store];
		return conversation;
	}
);
