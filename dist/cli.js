"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timeParser_1 = require("./lib/timeParser");
const readline_sync_1 = __importDefault(require("readline-sync"));
function main() {
    console.log('Time Expression Parser');
    console.log('Valid format: now()[+/-offset[unit]]...');
    console.log('Units: s (seconds), m (minutes), h (hours), d (days), mon (months), y (years)');
    console.log('Examples: "now()", "now()+1d", "now()+10d+12h", "now()-2d+12h"\n');
    try {
        const input = readline_sync_1.default.question('Enter time expression: ');
        const result = (0, timeParser_1.parse)(input);
        console.log('\nResult:', result);
    }
    catch (error) {
        console.error('\nError:', error.message);
        process.exit(1);
    }
}
// Run CLI if this file is executed directly
if (require.main === module) {
    main();
}
//# sourceMappingURL=cli.js.map