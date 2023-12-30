export function setConvo(obj_id_convo: ObjIdConvo, db_convo: DbConvoType) {
	const { id, ...convo } = db_convo;
	obj_id_convo[id] = convo;
}
