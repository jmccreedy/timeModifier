"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
/**
 * Time unit constants in milliseconds for precise time calculations
 */
var TimeConstants;
(function (TimeConstants) {
    TimeConstants[TimeConstants["SECOND"] = 1000] = "SECOND";
    TimeConstants[TimeConstants["MINUTE"] = 60000] = "MINUTE";
    TimeConstants[TimeConstants["HOUR"] = 3600000] = "HOUR";
    TimeConstants[TimeConstants["DAY"] = 86400000] = "DAY";
})(TimeConstants || (TimeConstants = {}));
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
function parse(expression) {
    let date = new Date();
    // Validate overall structure with regex
    const validationRegex = /^now\(\)(?:([+-])(\d+)(mon|s|m|h|d|y))*$/;
    if (!validationRegex.test(expression)) {
        throw new Error("Invalid time expression");
    }
    // Extract all operator+offset+unit groups
    const operationRegex = /([+-])(\d+)(mon|s|m|h|d|y)/g;
    let match;
    while ((match = operationRegex.exec(expression)) !== null) {
        const [, operator, offsetStr, unit] = match;
        const sign = operator === '+' ? 1 : -1;
        const offset = parseInt(offsetStr, 10);
        // Apply the operation based on unit
        switch (unit) {
            case 's':
                date = new Date(date.getTime() + sign * offset * TimeConstants.SECOND);
                break;
            case 'm':
                date = new Date(date.getTime() + sign * offset * TimeConstants.MINUTE);
                break;
            case 'h':
                date = new Date(date.getTime() + sign * offset * TimeConstants.HOUR);
                break;
            case 'd':
                date = new Date(date.getTime() + sign * offset * TimeConstants.DAY);
                break;
            case 'mon':
                date.setUTCMonth(date.getUTCMonth() + sign * offset);
                break;
            case 'y':
                date.setUTCFullYear(date.getUTCFullYear() + sign * offset);
                break;
        }
    }
    return date.toISOString();
}
//# sourceMappingURL=timeParser.js.map