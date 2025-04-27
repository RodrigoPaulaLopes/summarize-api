import { toUpper } from "../../src/utils/Utils";


describe('Utils', () => {
  it('should be UPPER', () => {

    const str = 'hello world';
    const upperStr = toUpper(str)
    expect(upperStr).toBe('HELLO WORLD');
  });


});