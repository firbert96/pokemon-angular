import { CapitalizePipe } from "./capitalize.pipe";


describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize word from lowercase', () => {
    const result = pipe.transform('world');
    expect(result).toBe('World');
  });

  it('should capitalize word from uppercase', () => {
    const result = pipe.transform('WORLD');
    expect(result).toBe('World');
  });
});
