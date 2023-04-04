import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Video: {
    id: 'Video',
    defaultMessage: 'Video',
  },
  VideoURL: {
    id: 'Video URL',
    defaultMessage: 'Video URL',
  },
  Preview_image: {
    id: 'Preview Image URL',
    defaultMessage: 'Preview Image URL',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
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
export const VideoBlockSchema = (props) => ({
  title: props.intl.formatMessage(messages.Video),
  block: 'Video',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'preview_image', 'align', 'alt', 'copyright'],
    },
  ],

  properties: {
    url: {
      title: props.intl.formatMessage(messages.VideoURL),
      widget: 'url',
    },
    preview_image: {
      title: props.intl.formatMessage(messages.Preview_image),
      widget: 'url',
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
    alt: {
      title: props.intl.formatMessage(messages.AltText),
      description: (
        <>
          <a
            href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
            title={props.intl.formatMessage(messages.openLinkInNewTab)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.intl.formatMessage(messages.AltTextHintLinkText)}
          </a>{' '}
          {props.intl.formatMessage(messages.AltTextHint)}
        </>
      ),
    },
    copyright: {
      title: props.intl.formatMessage(messages.Copyright),
      type: 'text',
    },
  },
  required: [],
});

export default VideoBlockSchema;
