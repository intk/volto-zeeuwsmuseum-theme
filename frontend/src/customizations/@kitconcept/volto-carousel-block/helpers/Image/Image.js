import { isInternalURL } from '@plone/volto/helpers';

export function getTeaserImageURL(href, image, imageType) {
  if (image) {
    if (isInternalURL(image['@id'])) {
      return `${image['@id']}/@@images/image/teaser`;
    } else {
      return image['@id'];
    }
  } else {
    if (imageType === 'image') {
      return `${href['@id']}/@@images/image/teaser`;
    } else {
      return `${href['@id']}/@@images/preview_image/teaser`;
    }
  }
}
