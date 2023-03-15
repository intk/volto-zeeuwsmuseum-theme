import { defineMessages } from 'react-intl';
// import config from '@plone/volto/registry';

const messages = defineMessages({
  showtoc: {
    id: 'showtableofcontents',
    defaultMessage: 'Show Table of Contents?',
  },
  blockDescription: {
    id: 'wanttoshowtoc',
    defaultMessage: 'Do you want Table of Contents to appear?',
  },
  showBlock: {
    id: 'Show TOC',
    defaultMessage: 'Show TOC',
  },
});

const ShowTableOfContentEditSchema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.showBlock),
    fieldsets: [
      {
        id: 'default',
        fields: ['TOC'],
        title: 'Default',
      },
    ],

    properties: {
      TOC: {
        title: intl.formatMessage(messages.showtoc),
        description: intl.formatMessage(messages.blockDescription),
        choices: [['YES', 'YES']],
        default: ['YES'],
      },
    },
    required: [],
  };
};

export default ShowTableOfContentEditSchema;
