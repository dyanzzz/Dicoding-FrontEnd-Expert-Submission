const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
 
const targetHeros = path.resolve(__dirname, 'src/public/images/heros');
const destinationHeros = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destinationHeros)) {
  fs.mkdirSync(destinationHeros);
}

fs.readdirSync(targetHeros).forEach(image => {
  // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${targetHeros}/${image}`)
    .resize(800)
    .toFile(path.resolve(__dirname, `${destinationHeros}/${image.split('.')
    .slice(0, -1)
    .join('.')}-large.jpg`));

  // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  sharp(`${targetHeros}/${image}`)
    .resize(480)
    .toFile(path.resolve(__dirname, `${destinationHeros}/${image.split('.')
    .slice(0, -1)
    .join('.')}-small.jpg`));
});
