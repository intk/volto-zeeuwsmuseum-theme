import React from 'react';
import loadable from '@loadable/component';
import { ResponsiveContainer, ListingBlockHeader } from '@package/components';
import { LinkMore } from '@plone/volto/components';
import { Icon } from 'semantic-ui-react';
import cx from 'classnames';

import UniversalCard from './ListingCard';

// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import backSVG from '@plone/volto/icons/back.svg';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import './less/slider-listing.less';

const Slider = loadable(() => import('react-slick'));

const getSliderSetting = (slider, settings, name) => {
  const curBreak = slider.current?.state?.breakpoint;

  if (!curBreak) return settings[name];

  const index = settings.responsive.findIndex(
    ({ breakpoint }) => breakpoint === curBreak,
  );

  return index > -1
    ? settings.responsive?.[index]?.settings?.[name] ?? settings[name]
    : settings[name];
};

export const SliderNavigation = ({ sliderRef, count, index, settings }) => {
  const slider = sliderRef.current;
  return (
    <div className="slider-nav">
      <button
        className={cx(
          // { hidden: index === 1 },
          'slider-nav-arrow slider-nav-arrow-prev',
        )}
        onClick={() => slider && slider.slickPrev()}
      >
        <Icon circular name="arrow left" size="large" />
      </button>
      <button
        className={cx(
          // { hidden: index >= count },
          'slider-nav-arrow slider-nav-arrow-next',
        )}
        onClick={() => slider && slider.slickNext()}
      >
        <Icon circular name="arrow right" size="large" />
      </button>
    </div>
  );
};

// in this type of carousel, acts as Page navigation, rather then slide by
// slide
export const getPages = (sliderRef, slideIndex, settings, items) => {
  const slidesToShow =
    getSliderSetting(sliderRef, settings, 'slidesToShow') || 1;

  const totalPages = Math.ceil(Math.max(items.length / slidesToShow, 1));
  const currentPage = Math.floor(slideIndex / slidesToShow) + 1; // humanize

  return { totalPages, currentPage };
};

export const Pagination = ({ index, count }) => {
  return (
    <div className="slider-pagination">
      {index} / {count}
    </div>
  );
};

const SliderListing = (data) => {
  const { items, linkHref } = data;
  // const [slideIndex, setSlideIndex] = React.useState(0);
  const sliderRef = React.useRef();

  const carouselSettings = React.useMemo(
    () => ({
      // afterChange: (current) => setSlideIndex(current),
      dots: true,
      arrows: false, // we use custom navigation
      lazyLoad: 'progressive',
      autoplay: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      // adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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
    }),
    [],
  );

  // const { totalPages, currentPage } = getPages(
  //   sliderRef,
  //   slideIndex,
  //   carouselSettings,
  //   items,
  // );

  // TODO: add resize event watcher to update the pagination numbers

  return (
    <div className="slider-carousel-container slider-listing">
      <ResponsiveContainer>
        {({ parentWidth }) =>
          !!parentWidth && (
            <div style={{ width: `${parentWidth}px`, margin: '0 auto' }}>
              <ListingBlockHeader data={data} />
              <Slider
                ref={sliderRef}
                {...carouselSettings}
                className="slick-carousel slider-listing"
              >
                {items.map((item, i) => (
                  <UniversalCard item={item} key={i} {...data} />
                ))}
              </Slider>
              <div className="slider-bottom">
                {linkHref ? <LinkMore data={data} /> : ''}
              </div>
            </div>
          )
        }
      </ResponsiveContainer>
      {/* <Pagination index={currentPage} count={totalPages} /> */}
    </div>
  );
};

export default SliderListing;
