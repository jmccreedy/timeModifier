/**
 * Parses a time expression and returns an ISO 8601 UTC string.
 *
 * @param expression - A time expression starting with "now()" followed by optional offset operations
 * @returns ISO 8601 UTC string (e.g., "2025-01-09T09:00:00.000Z")
 * @throws TypeError if input is not a string
 * @throws Error for invalid expressions
 *
 * @example
 * parse("now()") // "2025-01-08T09:00:00.000Z"
 * parse("now()+1d") // "2025-01-09T09:00:00.000Z"
 * parse("now()+10d+12h") // "2025-01-18T21:00:00.000Z"
 * parse("now()-2d+12h") // "2025-01-06T21:00:00.000Z"
 */
export declare function parse(expression: string): string;
//# sourceMappingURL=timeParser.d.ts.map