


export interface IBaseEntity {
	// Used for logical removed
	active: boolean,

	// Document creation date of the entity
	created: Date,
	// Document creator userName
	creator: string

	//Document modification date of the entity
	updated: Date
}

export const baseEntityModel = {
	// Used for logical removed
	active: Boolean,

	// Document creation date of the entity
	created: Date,
	// Document creator userName
	creator: String,

	//Document modification date of the entity
	updated: Date
}