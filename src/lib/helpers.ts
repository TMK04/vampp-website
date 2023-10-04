export function setConvo(obj_id_convo: ObjIdConvo, dynamo_convo: DynamoConvoType) {
	const { id, ...convo } = dynamo_convo;
	obj_id_convo[id.S] = {
		ts: +convo.ts.N,
		topic: convo.topic.S,
		pitch: convo.pitch.S,
		summary: convo.summary.S,
		pe: +convo.pe.N,
		clarity: +convo.clarity.N,
		bv: +convo.bv.N,
		moving: +convo.moving.N,
		smiling: +convo.smiling.N,
		upright: +convo.upright.N,
		ec: +convo.ec.N,
		speech_clarity: +convo.speech_clarity.N,
		speech_enthusiasm: +convo.speech_enthusiasm.N,
		beholder_creativity: +convo.beholder_creativity.N,
		beholder_creativity_justification: convo.beholder_creativity_justification.S,
		beholder_feasibility: +convo.beholder_feasibility.N,
		beholder_feasibility_justification: convo.beholder_feasibility_justification.S,
		beholder_impact: +convo.beholder_impact.N,
		beholder_impact_justification: convo.beholder_impact_justification.S,
		beholder_clarity: +convo.beholder_clarity.N,
		beholder_clarity_justification: convo.beholder_clarity_justification.S,
		pa: convo.pa.BOOL
	};
}
