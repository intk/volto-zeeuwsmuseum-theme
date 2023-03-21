import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { Container } from 'semantic-ui-react';
import { useWindowDimensions } from '@package/helpers';
import { ResponsiveContainer, ListingBlockHeader } from '@package/components';
import Card from './ListingCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './less/colored-cards.less';

const Masonry = loadable(() => import('react-masonry-css'));
const Slider = loadable(() => import('react-slick'));

const BREAKPOINT = 1000;

const breakpointColumnsObj = {
  default: 3,
};

const ColoredCardsTemplate = (props) => {
  const { items } = props;
  const { windowWidth } = useWindowDimensions();

  const sliderRef = React.useRef();

  const carouselSettings = React.useMemo(
    () => ({
      dots: true,
      arrows: false,
      lazyLoad: 'progressive',
      autoplay: false,
      infinite: true,
      variableWidth: true,
    }),
    [],
  );

  return (
    <>
      <ListingBlockHeader data={props} />

      {windowWidth > BREAKPOINT ? (
        <div className="colored-cards card-listing">
          <Container>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {items.map((item, i) => (
                <div className="listing-column" key={i}>
                  <Card item={item} {...props} />
                </div>
              ))}
            </Masonry>
          </Container>
        </div>
      ) : (
        <div className="colored-cards-slider">
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
                      <Card item={item} key={i} {...props} />
                    ))}
                  </Slider>
                </div>
              ) : (
                ''
              )
            }
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

ColoredCardsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ColoredCardsTemplate;
