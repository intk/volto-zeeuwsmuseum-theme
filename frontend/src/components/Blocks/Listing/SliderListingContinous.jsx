import React from 'react';
import loadable from '@loadable/component';
import { ResponsiveContainer, ListingBlockHeader } from '@package/components';
import { Icon } from '@plone/volto/components';
import cx from 'classnames';

import UniversalCard from './ListingCard';

import aheadSVG from '@plone/volto/icons/ahead.svg';
import backSVG from '@plone/volto/icons/back.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './less/slider-listing.less';

const Slider = loadable(() => import('react-slick'));

export const SliderNavigation = ({
  sliderRef,
  slideCount,
  slideIndex,
  settings,
}) => {
  const slider = sliderRef.current;

  return (
    <div className="slider-nav">
      <button
        className={cx(
          { hidden: slideIndex <= settings.slidesToShow },
          'slider-nav-arrow slider-nav-arrow-prev',
        )}
        onClick={() => slider && slider.slickPrev()}
      >
        <Icon name={backSVG} size="32px" />
      </button>
      <button
        className={cx(
          { hidden: slideIndex >= slideCount },
          'slider-nav-arrow slider-nav-arrow-next',
        )}
        onClick={() => slider && slider.slickNext()}
      >
        <Icon name={aheadSVG} size="32px" />
      </button>
    </div>
  );
};

export const getSlideIndex = (sliderRef, slideIndex, settings) => {
  if (!sliderRef.current) return slideIndex + settings.slidesToShow;

  const curBreak = sliderRef.current.state?.breakpoint;

  if (curBreak) {
    const index = settings.responsive.findIndex(
      ({ breakpoint }) => breakpoint === curBreak,
    );
    let slidesToShow =
      index > -1
        ? settings.responsive[index]?.settings?.slidesToShow ||
          settings.slidesToShow
        : settings.slidesToShow;
    return slidesToShow + slideIndex;
  }

  return slideIndex + settings.slidesToShow;
};

export const Pagination = ({ slideIndex, slideCount }) => {
  return (
    <div className="slider-pagination">
      {slideIndex} / {slideCount}
    </div>
  );
};

const SliderListing = (data) => {
  const { items } = data;
  const [slideIndex, setSlideIndex] = React.useState(0);
  const sliderRef = React.useRef();

  const carouselSettings = React.useMemo(
    () => ({
      afterChange: (current) => setSlideIndex(current),
      dots: false,
      arrows: false, // we use custom navigation
      lazyLoad: 'progressive',
      autoplay: false,
      infinite: false,
      slidesToShow: 4,
      draggable: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 340,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    }),
    [],
  );

  const currentSlide = getSlideIndex(sliderRef, slideIndex, carouselSettings);

  return (
    <div className="slider-carousel-container slider-listing">
      <ListingBlockHeader data={data} />
      <ResponsiveContainer>
        {({ parentWidth }) =>
          parentWidth ? (
            <div style={{ width: `${parentWidth}px`, margin: '0 auto' }}>
              <Slider
                ref={sliderRef}
                {...carouselSettings}
                className="slick-carousel slider-listing"
              >
                {items.map((item, i) => (
                  <UniversalCard item={item} key={i} />
                ))}
              </Slider>
              <div className="slider-carousel-footer">
                <Pagination
                  slideIndex={slideIndex + 1}
                  slideCount={items.length}
                />
                <SliderNavigation
                  sliderRef={sliderRef}
                  slideIndex={currentSlide}
                  slideCount={items.length}
                  settings={carouselSettings}
                />
              </div>
            </div>
          ) : (
            ''
          )
        }
      </ResponsiveContainer>
    </div>
  );
};

export default SliderListing;
