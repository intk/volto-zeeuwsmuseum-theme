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
  display_types[2][1] = 'Homepage Slideshow';
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
        fields: [
          'title',
          'text',
          'display',
          'align',
          'image_scale',
          'cards',
          'button1',
          'button1link',
          'button2',
          'button2link',
        ],
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
      button1: {
        type: 'sting',
        title: 'Button 1',
      },
      button1link: {
        type: 'sting',
        title: 'Button 1 Link',
      },
      button2: {
        type: 'sting',
        title: 'Button 2',
      },
      button2link: {
        type: 'sting',
        title: 'Button 2 Link',
      },
    },

    required: ['display', 'cards'],
  };
};

export default ImageCards;
