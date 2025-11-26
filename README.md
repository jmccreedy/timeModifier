# Time Expression Parser

A TypeScript library and CLI tool for parsing time expressions like `now()+1d`, `now()-2h+30m`, and more. Perfect for calculating relative timestamps in applications, scripts, or command-line operations.

## Features

- 🕒 Parse natural time expressions starting with `now()`
- ⚡ Support for multiple time units: seconds, minutes, hours, days, months, years
- 🔢 Chain multiple operations: `now()+1d+12h-30m`
- 🌍 Returns ISO 8601 UTC timestamps

## Installation

### As a Global CLI Tool

```bash
npm install -g time-expression-parser
```

## Usage

### Command Line Interface

After global installation, use the `time-parser` command:

```bash
time-parser
# Interactive prompt will appear
# Enter time expression: now()+1d
# Result: 2025-11-27T10:30:00.000Z
```

## Supported Time Units

| Unit | Description | Example |
|------|-------------|---------|
| `s` | Seconds | `now()+30s` |
| `m` | Minutes | `now()+15m` |
| `h` | Hours | `now()+2h` |
| `d` | Days | `now()+7d` |
| `mon` | Months | `now()+3mon` |
| `y` | Years | `now()+1y` |

## Expression Format

All expressions must:
- Start with `now()`
- Use `+` or `-` operators
- Include a number followed by a unit
- Can chain multiple operations

### Valid Examples

```typescript
parse('now()')                    // Current time
parse('now()+1d')                // Tomorrow
parse('now()-1h')                // One hour ago
parse('now()+1y+6mon')           // One and a half years from now
parse('now()+10d+12h+30m+45s')   // Complex future time
parse('now()-2d+12h')            // Two days ago, plus 12 hours
```

### Invalid Examples

```typescript
parse('today()+1d')     // Must start with 'now()'
parse('now() + 1d')     // No spaces allowed
parse('now()+1x')       // Invalid unit 'x'
parse('now()+d')        // Missing number
parse('+1d')            // Must start with 'now()'
```

## Development

### Setup

```bash
git clone https://github.com/jmccreedy/timeModifier.git
cd timeModifier
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Run CLI Locally

```bash
npm run build
npm start
```

## Project Structure

```
├── lib/
│   └── timeParser.ts      # Main parser logic
├── test/
│   └── timeParser.test.ts # Comprehensive tests
├── cli.ts                 # CLI interface
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── jest.config.js        # Test configuration
```

## API Reference

### `parse(expression: string): string`

Parses a time expression and returns an ISO 8601 UTC string.

**Parameters:**
- `expression` (string): Time expression starting with "now()" followed by optional offset operations

**Returns:**
- `string`: ISO 8601 UTC timestamp (e.g., "2025-11-27T10:30:00.000Z")

**Throws:**
- `Error`: For invalid expressions or malformed syntax

## Error Handling

The parser provides clear error messages for invalid inputs:

```typescript
try {
  const result = parse('invalid expression');
} catch (error) {
  console.error(error.message); // "Invalid time expression"
}
```