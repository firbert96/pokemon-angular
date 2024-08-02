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

  it('should handle mixed case input', () => {
    const result = pipe.transform('hELLO');
    expect(result).toBe('Hello');
  });

  it('should return empty string if input is empty', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle null input', () => {
    const result = pipe.transform(null as any);
    expect(result).toBeNull();
  });
});
