const images = import.meta.glob('../assets/*.{jpg,png,jpeg}', { eager: true, import: 'default' });

export const getImageUrl = (filename) => {
  if (!filename) return images['../assets/sample.jpg'];
  const path = `../assets/${filename}`;
  return images[path] || images['../assets/sample.jpg'];
};

export const getAllImageFiles = () => {
  return Object.keys(images).map(path => {
    return {
      filename: path.replace('../assets/', ''),
      url: images[path]
    };
  });
};
