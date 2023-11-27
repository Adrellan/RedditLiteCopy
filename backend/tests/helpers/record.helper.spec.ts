import { setNewRecordInfo } from '../../src/helpers/record.helper'
import { IBaseEntity } from '../../src/models/baseEntity.model';

describe('setNewRecordInfo function', () => {
  it('should set new record information correctly', () => {
    const record: IBaseEntity = {
        active: true,
        created: new Date(),
        creator: 'exampleUser',
        updated: new Date(),
    };

    setNewRecordInfo(record);

    expect(record.active).toBe(true);
    expect(record.created).toBeInstanceOf(Date);
    expect(record.updated).toBeInstanceOf(Date);
    expect(record.created).toEqual(record.updated); 
  });
});
