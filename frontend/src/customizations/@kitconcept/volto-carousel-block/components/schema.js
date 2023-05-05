import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Carousel: {
    id: 'Carousel',
    defaultMessage: 'Carousel',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  imageOverride: {
    id: 'Image override',
    defaultMessage: 'Image override',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  items: {
    id: 'Items',
    defaultMessage: 'Items',
  },
  addItem: {
    id: 'Add item',
    defaultMessage: 'Add item',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  itemsToShow: {
    id: 'Items to show',
    defaultMessage: 'Items to show',
  },
  hideDescription: {
    id: 'Hide description',
    defaultMessage: 'Hide description',
  },
  settings: {
    id: 'Settings',
    defaultMessage: 'Settings',
  },
});

const itemSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href', 'title', 'description', 'preview_image'],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'image_field'],
        allowExternals: true,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
      },
      preview_image: {
        title: intl.formatMessage(messages.imageOverride),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
      },
    },
    required: [],
  };
};

export const carouselSchema = (props) => ({
  title: props.intl.formatMessage(messages.Carousel),
  block: 'carousel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['columns'],
    },
    {
      id: 'settings',
      title: props.intl.formatMessage(messages.settings),
      fields: ['headline', 'items_to_show', 'hide_description'],
    },
  ],
  properties: {
    columns: {
      widget: 'object_list',
      title: props.intl.formatMessage(messages.items),
      schema: itemSchema,
    },
    headline: {
      title: props.intl.formatMessage(messages.headline),
    },
    items_to_show: {
      type: 'number',
      title: props.intl.formatMessage(messages.itemsToShow),
      defaultValue: 4,
    },
    hide_description: {
      title: props.intl.formatMessage(messages.hideDescription),
      type: 'boolean',
    },
  },
  required: [],
});
