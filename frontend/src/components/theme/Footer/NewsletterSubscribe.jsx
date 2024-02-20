import { injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  subscribe: {
    id: 'Subscribe',
    defaultMessage: 'Subscribe',
  },
});

const NewsletterSubscribe = ({ intl }) => (
  <div className="newsletter-subscribe">
    <a
      href="https://zeeuwsmuseum.us13.list-manage.com/subscribe/post-json?c=&"
      target="_blank"
      rel="noopener noreferrer"
      className="newsletter-subscribe-link"
    >
      {intl.formatMessage(messages.subscribe)}
    </a>
  </div>
);

export default injectIntl(NewsletterSubscribe);
