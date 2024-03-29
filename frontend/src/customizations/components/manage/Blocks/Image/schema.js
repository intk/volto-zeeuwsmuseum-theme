import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  size: {
    id: 'Image size',
    defaultMessage: 'Image size',
  },
  Textalign: {
    id: 'Textalignment',
    defaultMessage: 'Text Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  AltTextHint: {
    id: 'Alt text hint',
    defaultMessage: 'Leave empty if the image is purely decorative.',
  },
  AltTextHintLinkText: {
    id: 'Alt text hint link text',
    defaultMessage: 'Describe the purpose of the image.',
  },
});

export function ImageSchema({ formData, intl }) {
  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          ...(formData.url
            ? ['url', 'alt', 'copyright', 'align', 'size', 'textalign']
            : []),
        ],
      },
      ...(formData.url
        ? [
            {
              id: 'link_settings',
              title: 'Link settings',
              fields: ['href', 'openLinkInNewTab'],
            },
          ]
        : []),
    ],
    properties: {
      url: {
        title: intl.formatMessage(messages.Source),
        widget: 'url',
      },
      alt: {
        title: intl.formatMessage(messages.AltText),
        description: (
          <>
            <a
              href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
              title={intl.formatMessage(messages.openLinkInNewTab)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.formatMessage(messages.AltTextHintLinkText)}
            </a>{' '}
            {intl.formatMessage(messages.AltTextHint)}
          </>
        ),
      },
      copyright: {
        title: intl.formatMessage(messages.Copyright),
        type: 'text',
      },
      align: {
        title: intl.formatMessage(messages.Align),
        widget: 'align',
      },
      size: {
        title: intl.formatMessage(messages.size),
        widget: 'image_size',
      },
      textalign: {
        title: intl.formatMessage(messages.Textalign),
        widget: 'align',
      },
      href: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };
}
