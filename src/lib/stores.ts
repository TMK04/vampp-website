import { derived, writable } from "svelte/store";
import { LinkedListStore } from "./LinkedListStore";
import samples from "./samples.json";

type AlertMemoized = {
	capitalized: string;
};
export const obj_alert_type_memoized: Record<AlertTypeType, AlertMemoized> = {
	error: {
		capitalized: "Error"
	},
	success: {
		capitalized: "Success"
	},
	warning: {
		capitalized: "Warning"
	},
	info: {
		capitalized: "Info"
	}
};
export const alert_linked_list_store = LinkedListStore<AlertType>();

export const obj_id_convo_store = writable<ObjIdConvo>(samples);

export const id_store = writable<Id>(null);

export const convo_store = derived(
	[obj_id_convo_store, id_store],
	([$obj_id_convo_store, $id_store]) => {
		if ($id_store === null) return null;
		if ($id_store in $obj_id_convo_store) return $obj_id_convo_store[$id_store];
		return null;
	}
);
