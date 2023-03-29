import React from 'react';
import { Popup, Image, Message } from 'semantic-ui-react';
import ResponsiveContainer from '../ResponsiveContainer';

import loadable from '@loadable/component';
import { CommonCarouselschemaExtender } from './../CommonAssets/schema';

import 'slick-carousel/slick/slick.css';
import '../css/discreetcarousel.less';
// import 'slick-carousel/slick/slick-theme.css';

import { getScaleUrl, getPath } from '../utils';

const Slider = loadable(() => import('react-slick'));

const Card = ({ card = {}, height, image_scale, mode = 'view' }) => {
  const { link, title } = card;

  const LinkWrapper =
    link && mode === 'view'
      ? ({ children }) => (
          <a href={link} target="_blank" rel="noreferrer" title={title}>
            {children}
          </a>
        )
      : ({ children }) => children;
  const PopupWrapper = title
    ? ({ children }) => <Popup content={title} trigger={children} on="hover" />
    : ({ children }) => children;

  return (
    <div className="discreet-slide-img" style={{ height }}>
      <PopupWrapper>
        <LinkWrapper>
          <Image
            className="bg-image"
            src={getScaleUrl(
              getPath(card.attachedimage),
              image_scale || 'great',
            )}
          />
        </LinkWrapper>
      </PopupWrapper>
    </div>
  );
};

const DiscreetCarousel = (props) => {
  const { data = {}, editable = false } = props;
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => setIsClient(true), []);
  const {
    cards = [],
    fade,
    image_scale,
    pauseOnHover,
    height = '100px',
    itemsPerRow = 4,
    autoplay = false,
    infinite = false,
    hideArrows = true,
    autoplaySpeed = 3000,
    hideNavigationDots = false,
  } = data;

  const carouselSettings = {
    // speed: 800,
    fade: fade,
    infinite: infinite,
    slidesToShow: Math.min(cards.length, itemsPerRow),
    slidesToScroll: itemsPerRow,
    dots: itemsPerRow > 1 && !hideNavigationDots,
    autoplay: itemsPerRow > 1 && autoplay && !editable,
    autoplaySpeed,
    arrows: !hideArrows,
    pauseOnHover: pauseOnHover,
    useTransform: false,
    lazyLoad: 'ondemand',

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return !cards.length ? (
    editable ? (
      <Message>No cards</Message>
    ) : (
      ''
    )
  ) : (
    <div className="discreet-carousel-spotlight">
      <ResponsiveContainer>
        {({ parentWidth }) => {
          return parentWidth && isClient ? (
            <div style={{ width: `${parentWidth - 100}px`, margin: '0 auto' }}>
              <Slider {...carouselSettings}>
                {cards.map((card) => (
                  <Card
                    mode={editable ? 'edit' : 'view'}
                    card={card}
                    height={height}
                    image_scale={image_scale}
                  />
                ))}
              </Slider>
            </div>
          ) : (
            ''
          );
        }}
      </ResponsiveContainer>
    </div>
  );
};

export default DiscreetCarousel;

DiscreetCarousel.schemaExtender = (schema, data, intl) => {
  const Common = CommonCarouselschemaExtender({ data, schema, intl });

  Common.properties.itemsPerRow = {
    type: 'number',
    title: 'Slides to show',
    description: 'How many slides to show in one frame',
    defaultValue: 4,
  };

  Common.fieldsets[0].fields.push('itemsPerRow');

  return {
    ...schema,
    ...Common,
    properties: {
      ...schema.properties,
      ...Common.properties,
    },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};
