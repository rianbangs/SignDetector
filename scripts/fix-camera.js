const fs = require('fs');
const path = require('path');

const gradlePath = path.resolve(__dirname, '../node_modules/react-native-camera/android/build.gradle');

let gradleContent = fs.readFileSync(gradlePath, 'utf8');

// Comment out mlkit flavor and mlkitImplementation lines
gradleContent = gradleContent
  .replace(/mlkit\s*\{[^}]*\}/g, match => `// ${match.split('\n').join('\n// ')}`)
  .replace(/mlkitImplementation/g, '// mlkitImplementation');

fs.writeFileSync(gradlePath, gradleContent, 'utf8');

console.log('[✔] react-native-camera mlkit flavor patched successfully!');
