import { derived, writable } from "svelte/store";

export type ObjIdConversation = Record<string, Conversation>;

export const obj_id_conversation_store = writable<ObjIdConversation>({
	"EO53c-Sf2Ak-BVX73Df": {
		topic: "Automation of Server Health Check-Ups and API Integration",
		file: "EO53c-Sf2Ak"
	},
	"_JTd4rwRLgY-6RkYAmG": {
		topic: "Cybersecurity For Seniors",
		file: "_JTd4rwRLgY"
	},
	"B2Ft9Lk79D0-6XFwaKM": {
		topic: "End User Devices Dashboard",
		file: "B2Ft9Lk79D0"
	}
});

export type Id = string | null;
export const id_store = writable<Id>(null);

export const conversation_store = derived(
	[obj_id_conversation_store, id_store],
	([$obj_id_conversation_store, $id_store]) => {
		if ($id_store === null) return null;
		return $obj_id_conversation_store[$id_store];
	}
);
