export function setConversation(
	obj_id_conversation: ObjIdConversation,
	dynamo_conversation: DynamoConversation
) {
	const { id, ...conversation } = dynamo_conversation;
	obj_id_conversation[id.S] = {
		timestamp: +conversation.timestamp.N,
		topic: conversation.topic.S,
		pitch: conversation.pitch.S,
		pe: +conversation.pe.N,
		clarity: +conversation.clarity.N,
		bv: +conversation.bv.N,
		moving: +conversation.moving.N,
		smiling: +conversation.smiling.N,
		upright: +conversation.upright.N,
		ec: +conversation.ec.N,
		speech_clarity: +conversation.speech_clarity.N,
		speech_enthusiasm: +conversation.speech_enthusiasm.N,
		beholder_creativity: +conversation.beholder_creativity.N,
		beholder_creativity_justification: conversation.beholder_creativity_justification.S,
		beholder_feasibility: +conversation.beholder_feasibility.N,
		beholder_feasibility_justification: conversation.beholder_feasibility_justification.S,
		beholder_impact: +conversation.beholder_impact.N,
		beholder_impact_justification: conversation.beholder_impact_justification.S,
		beholder_clarity: +conversation.beholder_clarity.N,
		beholder_clarity_justification: conversation.beholder_clarity_justification.S,
		pa: conversation.pa.BOOL
	};
}
