import { nanoid } from "nanoid";
import { writable } from "svelte/store";

/**
 * LinkedList Node
 */
class LinkedListNode<T> {
	id: string;
	data: T;
	prev: string | null;
	next: string | null;

	constructor(id: string, data: T) {
		this.id = id;
		this.data = data;
		this.prev = null;
		this.next = null;
	}
}

type ObjIdNode<T> = Record<string, LinkedListNode<T>>;
type LinkedListType<T> = {
	head: string | null;
	tail: string | null;
	obj_id_node: ObjIdNode<T>;
};

export function LinkedListStore<T>() {
	const { subscribe, update } = writable<LinkedListType<T>>({
		head: null,
		tail: null,
		obj_id_node: {}
	});

	return {
		subscribe,
		push(data: T) {
			let id: string;
			update((linked_list) => {
				do {
					id = nanoid(2);
				} while (typeof linked_list.obj_id_node[id] !== "undefined");

				const node = new LinkedListNode(id, data);
				if (linked_list.head === null) {
					linked_list.head = id;
					linked_list.tail = id;
				} else {
					node.prev = linked_list.tail;
					linked_list.obj_id_node[linked_list.tail!].next = id;
					linked_list.tail = id;
				}

				linked_list.obj_id_node[id] = node;
				return linked_list;
			});
			return id!;
		},
		pop(id: string) {
			update((linked_list) => {
				const node = linked_list.obj_id_node[id];
				if (node.prev !== null) {
					linked_list.obj_id_node[node.prev].next = node.next;
				}
				if (node.next !== null) {
					linked_list.obj_id_node[node.next].prev = node.prev;
				}
				if (linked_list.head === id) {
					linked_list.head = node.next;
				}
				if (linked_list.tail === id) {
					linked_list.tail = node.prev;
				}
				delete linked_list.obj_id_node[id];
				return linked_list;
			});
		}
	};
}

export type LinkedListArrType<T> = {
	id: string;
	data: T;
}[];

export function* iterateLinkedList<T>(linked_list: LinkedListType<T>) {
	let id = linked_list.head;
	while (id !== null) {
		const { data, next } = linked_list.obj_id_node[id];
		const v = { id, data: data };
		yield v;
		id = next;
	}
}

export function linkedListToArr<T>(linked_list: LinkedListType<T>) {
	const arr: LinkedListArrType<T> = [];
	for (const v of iterateLinkedList(linked_list)) {
		arr.push(v);
	}
	return arr;
}
