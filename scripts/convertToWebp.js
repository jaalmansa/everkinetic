const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const exercisesDir = "./src/exercises"; // Exercises folder path
const quality = 80; // WebP quality (0-100). 80 is a good balance.
// ----------------------

let completed = 0;
let errors = 0;
let totalImages = 0;

console.log(`🚀 Searching for PNG images in ${exercisesDir}...`);

// Read all exercise folders
fs.readdir(exercisesDir, (err, exerciseFolders) => {
  if (err) {
    return console.error("🚫 Could not read exercises folder:", err);
  }

  // Filter only folders (0001, 0002, etc.)
  const folders = exerciseFolders.filter((folder) => {
    const folderPath = path.join(exercisesDir, folder);
    return fs.statSync(folderPath).isDirectory();
  });

  // Process each exercise folder
  folders.forEach((folder) => {
    const exercisePath = path.join(exercisesDir, folder);

    fs.readdir(exercisePath, (err, files) => {
      if (err) {
        console.error(`❌ Error reading ${folder}:`, err);
        return;
      }

      // Filter only PNG files
      const pngFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ext === ".png";
      });

      pngFiles.forEach((file) => {
        totalImages++;
        const inputPath = path.join(exercisePath, file);
        const outputFileName = path.parse(file).name + ".webp";
        const outputPath = path.join(exercisePath, outputFileName);

        try {
          // Use ImageMagick's convert command to convert PNG to WebP
          execSync(
            `convert "${inputPath}" -quality ${quality} "${outputPath}"`,
            { stdio: "pipe" }
          );

          completed++;
          console.log(
            `✅ [${folder}] Converted: ${file} → ${outputFileName}`
          );

          if (completed === totalImages) {
            console.log(
              `\n🎉 Conversion completed! ${completed} images converted.`
            );
          }
        } catch (err) {
          errors++;
          console.error(
            `❌ [${folder}] Error converting ${file}:`,
            err.message
          );
        }
      });
    });
  });
});
