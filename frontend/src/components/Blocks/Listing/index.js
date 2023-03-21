import { defineMessages } from 'react-intl';

import AZListing from './AZListing';
import AgendaListingTemplate from './AgendaListing';
import BigCardsTemplate from './BigCardsTemplate';
import ColoredCardsTemplate from './ColoredCardsTemplate';
import ListingsBlockTemplate from './ListingTemplate';
import MasonryTemplate from './MasonryTemplate';
import SliderListingBlockTemplate from './SliderListing';
import SimpleLinks from './SimpleLinks';
import getAsyncData from './getAsyncData';

const messages = defineMessages({
  buttonTitle: {
    id: 'Button title',
    defaultMessage: 'Button title',
  },
  callAction: {
    id: 'Button call to action',
    defaultMessage: 'Button call to action',
  },
  showDate: {
    id: 'Show Date',
    defaultMessage: 'Show Date',
  },
  showCount: {
    id: 'Show Count',
    defaultMessage: 'Show Count',
  },
  showNotFound: {
    id: 'Show Not Found',
    defaultMessage: 'Show Not Found',
  },
  showTag: {
    id: 'Show Tag',
    defaultMessage: 'Show Tag',
  },
  showContentType: {
    id: 'Show Content Type',
    defaultMessage: 'Show Content Type',
  },
});

export default (config) => {
  config.blocks.blocksConfig.listing.schemaEnhancer = ({ schema, intl }) => {
    // move querystring to its own fieldset;

    schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
      (f) => f !== 'querystring',
    );
    schema.fieldsets.splice(1, 0, {
      id: 'querystring',
      title: 'Query',
      fields: ['querystring'],
    });

    schema.properties = {
      ...schema.properties,
      linkTitle: {
        title: intl.formatMessage(messages.buttonTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.callAction),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      showDate: {
        title: intl.formatMessage(messages.showDate),
        type: 'boolean',
        default: true,
      },
      showTag: {
        title: intl.formatMessage(messages.showTag),
        type: 'boolean',
        default: false,
      },
      showContentType: {
        title: intl.formatMessage(messages.showContentType),
        type: 'boolean',
        default: false,
      },
      showCount: {
        title: intl.formatMessage(messages.showCount),
        type: 'boolean',
        default: false,
      },
      showNotFound: {
        title: intl.formatMessage(messages.showNotFound),
        type: 'boolean',
        default: false,
      },
    };

    schema.fieldsets[0].fields.splice(
      2,
      0,
      'linkHref',
      'linkTitle',
      'showDate',
      'showTag',
      'showContentType',
      'showCount',
      'showNotFound',
    );

    return schema;
  };

  config.blocks.blocksConfig.listing.variations = [
    // ...config.blocks.blocksConfig.listing.variations,

    {
      id: 'listings',
      isDefault: true,
      title: 'Cards',
      template: ListingsBlockTemplate,
    },
    {
      id: 'listing_big_cards',
      isDefault: true,
      title: 'Big cards',
      template: BigCardsTemplate,
    },
    {
      id: 'agenda',
      isDefault: false,
      title: 'Agenda',
      template: AgendaListingTemplate,
    },
    {
      id: 'coloredCards',
      isDefault: false,
      title: 'Colored cards',
      template: ColoredCardsTemplate,
    },
    {
      id: 'search_listing',
      isDefault: false,
      title: 'Masonry',
      template: MasonryTemplate,
    },
    {
      id: 'slider_listing',
      isDefault: false,
      title: 'Slider',
      template: SliderListingBlockTemplate,
    },
    {
      id: 'az_listing',
      isDefault: false,
      title: 'A-Z Listing',
      template: AZListing,
    },
    {
      id: 'simple_listing',
      isDefault: false,
      title: 'Simple links',
      template: SimpleLinks,
    },
  ];

  // config.blocks.blocksConfig.listing.variations[0].isDefault = false;
  config.blocks.blocksConfig.listing.getAsyncData = getAsyncData;

  return config;
};
