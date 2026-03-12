# Everkinetic

Open data repository for fitness exercises. This project contains structured data and visual assets for various exercises, including demonstration images, SVG diagrams, and detailed exercise metadata.

Originally based on http://everkinetic.com created by Greg Priday, this is an ongoing open-source project aimed at providing a comprehensive, machine-readable database of fitness exercises.

## Project Structure

```
src/
├── exercises/     # Exercise data and assets (0001-0200+)
│   ├── 0001/
│   │   ├── 0001.json          # Exercise metadata
│   │   ├── 0001-tension.png   # Tension phase demo
│   │   ├── 0001-relaxation.png # Relaxation phase demo
│   │   └── ...
│   └── ...
├── images-*/      # Image collections (PNG, SVG, WebP formats)
scripts/          # Build and utility scripts
└── ...
```

## Available Scripts

### `npm run build`
Generates the distribution files in the `dist/` directory:
- Copies PNG images to `dist/png/`
- Optimizes and copies SVG files to `dist/svg/`
- Generates Markdown documentation
- Compiles the complete exercise collection

### `npm run test`
Validates the integrity of all exercise data:
- Checks for required fields (name, type, primary/secondary muscles, equipment, steps)
- Verifies exercise types (isometric, isolation, compound)
- Reports any missing or malformed data
- Useful before building to catch data quality issues

### `npm run convert:webp`
Batch converts PNG demonstration images to WebP format:
- Processes all PNG files in exercise directories
- Saves WebP versions in the same directory
- Reduces file sizes while maintaining quality
- Uses 80% quality setting by default

## How to Use

1. **Add/edit exercises**: Modify files in `src/exercises/`
2. **Validate data**: Run `npm run test` to check for errors
3. **Build distribution**: Run `npm run build` to generate output files
4. **Optimize images**: Run `npm run convert:webp` to create WebP versions

## Contribution

Every (little) contribution is very welcomed! Whether it's new exercises, improved descriptions, better images, or bug fixes, all help is appreciated.
