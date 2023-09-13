import { derived, writable } from "svelte/store";

export type ObjIdConversation = Record<string, Conversation>;

const blank_conversation: Omit<Conversation, "topic" | "file"> = {
	pitch: "",
	pe: 1,
	clarity: 1,
	bv: 1,
	beholder_creativity: 1,
	beholder_creativity_justification:
		"The idea is unique since there may not be similar platforms specifically targeted towards training Master of Policy students for cybersecurity competitions using CTFD. However, other CTF platforms might exist for different audiences.",
	beholder_feasibility: 1,
	beholder_feasibility_justification:
		"Resources like CTFD are available to implement this project, making its feasibility good. Though no mention was made about plans to mitigate potential risks in implementing and maintaining the platform.",
	beholder_impact: 1,
	beholder_impact_justification:
		"This project is related to advanced infrastructure security implementation (+) since it focuses on training cybersecurity professionals. It targets a specific audience, i.e., Master of Policy students participating in competitions (+). By allowing them to practice and hone their skills, the project solves their needs (+). However, the difficulty level for the target audience isn't mentioned (-). Thus, the impact score is high.",
	beholder_clarity: 1,
	beholder_clarity_justification:
		"The language used is clear and concise, key points are illustrated with examples, and coherent transitions between sections were evident."
};

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
