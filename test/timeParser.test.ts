import { parse } from '../lib/timeParser';

describe('Time Expression Parser', () => {
  const MOCK_DATE = new Date('2025-01-15T10:30:00.000Z');
  
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Type validation', () => {
    it('should throw TypeError for non-string input', () => {
      expect(() => parse(123 as any)).toThrow('Invalid time expression');
      expect(() => parse(null as any)).toThrow('Invalid time expression');
      expect(() => parse(undefined as any)).toThrow('Invalid time expression');
    });
  });

  describe('Basic functionality', () => {
    it('should parse "now()" to current time', () => {
      const result = parse('now()');
      expect(result).toBe(MOCK_DATE.toISOString());
    });

    it('should reject expressions with whitespace', () => {
      expect(() => parse('  now()  ')).toThrow('Invalid time expression');
      expect(() => parse('\tnow()\n')).toThrow('Invalid time expression');
      expect(() => parse('now() +1d')).toThrow('Invalid time expression');
    });
  });

  describe('Time unit arithmetic - milliseconds based', () => {
    it('should add seconds correctly', () => {
      const result = parse('now()+30s');
      const expected = new Date(MOCK_DATE.getTime() + 30 * 1000);
      expect(result).toBe(expected.toISOString());
    });

    it('should add minutes correctly', () => {
      const result = parse('now()+15m');
      const expected = new Date(MOCK_DATE.getTime() + 15 * 60 * 1000);
      expect(result).toBe(expected.toISOString());
    });

    it('should add hours correctly', () => {
      const result = parse('now()+12h');
      const expected = new Date(MOCK_DATE.getTime() + 12 * 60 * 60 * 1000);
      expect(result).toBe(expected.toISOString());
    });

    it('should add days correctly', () => {
      const result = parse('now()+1d');
      const expected = new Date(MOCK_DATE.getTime() + 24 * 60 * 60 * 1000);
      expect(result).toBe(expected.toISOString());
    });
  });

  describe('Calendar units - months and years', () => {
    it('should add months correctly with roll-over behavior', () => {
      const result = parse('now()+1mon');
      const expected = new Date(MOCK_DATE);
      expected.setUTCMonth(expected.getUTCMonth() + 1);
      expect(result).toBe(expected.toISOString());
    });

    it('should subtract months correctly', () => {
      const result = parse('now()-1mon');
      const expected = new Date(MOCK_DATE);
      expected.setUTCMonth(expected.getUTCMonth() - 1);
      expect(result).toBe(expected.toISOString());
    });

    it('should add years correctly', () => {
      const result = parse('now()+1y');
      const expected = new Date(MOCK_DATE);
      expected.setUTCFullYear(expected.getUTCFullYear() + 1);
      expect(result).toBe(expected.toISOString());
    });
  });

  describe('Complex expressions', () => {
    it('should handle multiple operations in sequence', () => {
      const result = parse('now()+10d+12h');
      const expected = new Date(MOCK_DATE.getTime() + (10 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000));
      expect(result).toBe(expected.toISOString());
    });

    it('should handle mixed units and operators', () => {
      const result = parse('now()+1y-1mon+1d');
      const expected = new Date(MOCK_DATE);
      expected.setUTCFullYear(expected.getUTCFullYear() + 1);
      expected.setUTCMonth(expected.getUTCMonth() - 1);
      expected.setTime(expected.getTime() + 24 * 60 * 60 * 1000); // +1 day
      expect(result).toBe(expected.toISOString());
    });

    describe('Error cases', () => {
      it('should throw error for expressions not starting with now()', () => {
        expect(() => parse('1d+now()')).toThrow("Invalid time expression");
        expect(() => parse('today()+1d')).toThrow("Invalid time expression");
      });

      it('should throw error for case-sensitive violations', () => {
        expect(() => parse('NOW()+1d')).toThrow("Invalid time expression");
        expect(() => parse('now()+1D')).toThrow("Invalid time expression");
      });

      it('should throw error for missing operators', () => {
        expect(() => parse('now()1d')).toThrow("Invalid time expression");
      });

      it('should throw error for missing numbers', () => {
        expect(() => parse('now()+d')).toThrow("Invalid time expression");
        expect(() => parse('now()-h')).toThrow("Invalid time expression");
      });

      it('should throw error for missing units', () => {
        expect(() => parse('now()+1')).toThrow("Invalid time expression");
        expect(() => parse('now()-5')).toThrow("Invalid time expression");
      });

      it('should throw error for invalid units', () => {
        expect(() => parse('now()+1x')).toThrow("Invalid time expression");
        expect(() => parse('now()+1day')).toThrow("Invalid time expression");
      });

      it('should throw error for invalid expressions', () => {
        expect(() => parse('now()+1x')).toThrow("Invalid time expression");
      });
    });

    describe('Edge cases', () => {
      it('should handle large offsets', () => {
        const result = parse('now()+365d');
        const expected = new Date(MOCK_DATE.getTime() + 365 * 24 * 60 * 60 * 1000);
        expect(result).toBe(expected.toISOString());
      });

      it('should handle zero offsets', () => {
        const result = parse('now()+0d');
        expect(result).toBe(MOCK_DATE.toISOString());
      });

      it('should handle leap year edge cases', () => {
        // This test just verifies the operation completes without error
        const result = parse('now()+1y');
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      });
    });
  });
});