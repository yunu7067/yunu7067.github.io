export function calcImageSize(image: ImageMetadata, maxWidth: number) {
  let width = 0;
  let height = 0;

  if (image.width > image.height) {
    width = maxWidth;
    height = ~~((image.height / image.width) * maxWidth);
  } else {
    width = ~~((image.width / image.height) * maxWidth);
    height = maxWidth;
  }

  return {width, height};
}
