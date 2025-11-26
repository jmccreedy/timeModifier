import { parse } from './lib/timeParser';
import readlineSync from 'readline-sync';

function main() {
    console.log('Time Expression Parser');
    console.log('Valid format: now()[+/-offset[unit]]...');
    console.log('Units: s (seconds), m (minutes), h (hours), d (days), mon (months), y (years)');
    console.log('Examples: "now()", "now()+1d", "now()+10d+12h", "now()-2d+12h"\n');
    
    try {
        const input = readlineSync.question('Enter time expression: ');
        const result = parse(input);
        console.log('\nResult:', result);
    } catch (error) {
        console.error('\nError:', (error as Error).message);
        process.exit(1);
    }
}

// Run CLI if this file is executed directly
if (require.main === module) {
    main();
}