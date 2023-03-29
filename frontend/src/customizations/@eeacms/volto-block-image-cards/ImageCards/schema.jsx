import config from '@plone/volto/registry';

const ImageCard = () => ({
  title: 'Image Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'text', 'attachedimage', 'link', 'copyright'],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
    },
    link: {
      widget: 'url',
      title: 'Link',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
    },
    copyright: {
      widget: 'slate_richtext',
      title: 'Copyright',
    },
  },

  required: ['attachedimage'],
});

const ImageCards = (props) => {
  const display_types_obj =
    config.blocks.blocksConfig.imagecards.blockRenderers;
  const display_types = Object.keys(display_types_obj).map((template) => [
    template,
    display_types_obj[template].title || template,
  ]);
  display_types[0][1] = 'Fullscreen Slideshow';
  display_types[1][1] = 'Slideshow';
  const selected_renderer = props && props.data.display;
  const schema =
    (selected_renderer && display_types_obj[selected_renderer].schema) ||
    ImageCard;

  return {
    title: 'Image Cards',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'text', 'display', 'align', 'image_scale', 'cards'],
      },
    ],

    properties: {
      title: {
        type: 'string',
        title: 'Title',
      },
      text: {
        widget: 'slate_richtext',
        title: 'Text',
      },
      display: {
        title: 'Display',
        choices: [...display_types],
        default: 'carousel',
      },
      cards: {
        widget: 'object_list',
        title: 'Images',
        description: 'Add a list of Images as Carousel Items',
        schema: schema(),
      },
      image_scale: {
        type: 'string',
        title: 'Image scale',
        default: 'great',
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        type: 'string',
        default: 'full',
      },
    },

    required: ['display', 'cards'],
  };
};

export default ImageCards;
