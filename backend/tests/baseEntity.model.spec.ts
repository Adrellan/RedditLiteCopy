import { baseEntityModel, IBaseEntity } from '../src/models/baseEntity.model'; // Az elérési útvonalat az alkalmazásodhoz igazítsd


describe('Base Entity Tests', () => {
  let baseEntity: IBaseEntity;

  beforeEach(() => {
    baseEntity = {
      active: true,
      created: new Date(),
      creator: 'TestUser',
      updated: new Date()
    };
  });

  it('should have a valid baseEntityModel', () => {
    expect(baseEntityModel).toBeDefined();
    expect(baseEntityModel.active).toBe(Boolean);
    expect(baseEntityModel.created).toBe(Date);
    expect(baseEntityModel.creator).toBe(String);
    expect(baseEntityModel.updated).toBe(Date);
  });

  it('should create a valid base entity', () => {
    expect(baseEntity).toBeTruthy();
    expect(baseEntity.active).toBe(true);
    expect(baseEntity.created).toBeInstanceOf(Date);
    expect(baseEntity.creator).toBe('TestUser');
    expect(baseEntity.updated).toBeInstanceOf(Date);
  });

  it('should set active to false when logically removed', () => {
    baseEntity.active = false;
    expect(baseEntity.active).toBe(false);
  });

});
