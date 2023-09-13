import { derived, writable } from "svelte/store";

export type ObjIdConversation = Record<string, Conversation>;

export const obj_id_conversation_store = writable<ObjIdConversation>({});

export type Id = string | null;
export const id_store = writable<Id>(null);

export const conversation_store = derived(
	[obj_id_conversation_store, id_store],
	([$obj_id_conversation_store, $id_store]) => {
		if ($id_store === null) return null;
		return $obj_id_conversation_store[$id_store];
	}
);
