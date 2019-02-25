import { FirstnameModule } from './firstname.module';

describe('FirstnameModule', () => {
  let firstnameModule: FirstnameModule;

  beforeEach(() => {
    firstnameModule = new FirstnameModule();
  });

  it('should create an instance', () => {
    expect(firstnameModule).toBeTruthy();
  });
});
