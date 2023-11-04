import {IBaseEntity} from "../models/baseEntity.model";


/**
 * Set's up the new record metadata
 * @param record: Newly inserting object
 */
export const setNewRecordInfo = (record: IBaseEntity)=>{
	const now = new Date();
	record.active = true;
	record.created = now;
	record.updated = now;
}