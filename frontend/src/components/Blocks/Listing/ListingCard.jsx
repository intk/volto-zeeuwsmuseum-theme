import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { FormattedTime } from 'react-intl';
import { FormattedDate } from '@plone/volto/components';
import { PreviewImage } from '@package/components';

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const Card = ({
  item,
  showDate,
  showTag,
  showContentType,
  size = 'large',
  useFallbackImage,
}) => {
  const { image_field, Subject } = item;
  useFallbackImage = useFallbackImage || image_field === 'fallback_image';
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return (
    <section className="listing-card  default-card">
      <Link className="card-link" to={flattenToAppURL(item['@id'])}>
        <div className="card-details">
          <div className="card-meta">
            {showDate && !!item.effective && (
              <FormattedDate date={item.effective} format={dateOptions} />
            )}
            {showContentType && <span>{item['@type']}</span>}
            {showTag && <span>{tag}</span>}
          </div>
          <h3 className="card-title">{item.title}</h3>
          {(image_field || useFallbackImage) && (
            <div className="image-wrapper">
              <PreviewImage
                item={item}
                size={size}
                isFallback={useFallbackImage ?? !image_field}
              />
            </div>
          )}
          {!!item.description && (
            <p className="card-description">{item.description}</p>
          )}
        </div>
      </Link>
    </section>
  );
};

const NewsItemCard = ({ item, showDate, showTag, showContentType }) => {
  const size = 'large';
  const { image_field, Subject } = item;
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return (
    <section className="listing-card newsitem-card default-card">
      <Link
        className="card-link"
        to={flattenToAppURL(item['@id'])}
        title={item.title}
      >
        <div className="card-details">
          <div className="card-meta">
            {showDate && !!item.effective && (
              <FormattedDate date={item.effective} format={dateOptions} />
            )}
            {showContentType && <span>{item['@type']}</span>}
            {showTag && <span>{tag}</span>}
          </div>
          <h3 className="card-title">{item.title}</h3>
          {!!image_field && (
            <div className="image-wrapper">
              <PreviewImage item={item} size={size} isFallback={!image_field} />
            </div>
          )}
          <p className="card-description">{item.description}</p>
        </div>
      </Link>
    </section>
  );
};

const EventCard = ({ item, showDate = true, showTag, showContentType }) => {
  const size = 'large';
  const { image_field, Subject } = item;
  const tag = Subject && Subject.length > 0 ? Subject[0] : '';

  return item.start ? (
    <section className="listing-card event-card default-card">
      <Link
        className="card-link"
        to={flattenToAppURL(item['@id'])}
        title={item.title}
      >
        <div className="card-details">
          <div className="card-meta">
            {showDate && (
              <>
                {!!item.effective && (
                  <FormattedDate date={item.start} format={dateOptions} />
                )}
                {!!item.start && (
                  <span>
                    <FormattedTime value={new Date(item.start)} />
                  </span>
                )}
              </>
            )}
            {showContentType && <span>{item['@type']}</span>}
            {showTag && <span>{tag}</span>}
          </div>

          <h3 className="card-title">{item.title}</h3>
          {!!image_field && (
            <div className="image-wrapper">
              <PreviewImage item={item} size={size} isFallback={!image_field} />
            </div>
          )}
          <p className="card-description">{item.description}</p>
        </div>
      </Link>
    </section>
  ) : (
    <Card item={item} />
  );
};

const ArtworkCard = ({ item }) => {
  const { image_field } = item;
  const size = 'preview';

  return (
    <section className="listing-card artwork-card">
      <Link
        className="card-link"
        to={flattenToAppURL(item['@id'])}
        title={item.title}
      >
        <div className="card-details">
          <div className="image-wrapper">
            <PreviewImage item={item} size={size} isFallback={!image_field} />
          </div>
          <div className="card-title-wrapper">
            <h5 className="artwork-title">{item.objectTitle}</h5>
            <div className="artwork-creation">{item.objectCreationDate}</div>
          </div>
          <div className="author-name">{item.authorName}</div>
        </div>
      </Link>
    </section>
  );
};

const PublicationCard = ({ item, ...rest }) => (
  <Card {...rest} item={{ ...item, description: item.authorName }} />
);

const ExhibitionCard = ({ item, ...rest }) => (
  <Card
    {...rest}
    showTag={true}
    item={{ ...item, Subject: [item.eventTimeFrom] }}
  />
);

const cardTypes = {
  default: Card,
  'News Item': NewsItemCard,
  Event: EventCard,
  artwork: ArtworkCard,
  publication: PublicationCard,
  exhibition: ExhibitionCard,
};

const UniversalCard = ({ item, ...rest }) => {
  const CardImpl = cardTypes[item['@type']] || cardTypes['default'];
  return <CardImpl item={item} {...rest} />;
};

export default UniversalCard;
