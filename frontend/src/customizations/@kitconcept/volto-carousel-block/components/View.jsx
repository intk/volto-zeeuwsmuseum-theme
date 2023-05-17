import React, { useEffect, useState } from 'react';
import { Container, Message } from 'semantic-ui-react';
import Slider from 'react-slick';
import teaserHeroTopTemplate from '../icons/teaser-template.svg';
import { defineMessages, useIntl } from 'react-intl';

import cx from 'classnames';

import Body from './Body';
import { BsArrowRight } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const PrevArrow = ({ className, style, onClick }) => (
  <BsArrowLeft
    icon
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
    aria-label="left arrow"
  ></BsArrowLeft>
);

const NextArrow = ({ className, style, onClick }) => (
  <BsArrowRight
    icon
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
    aria-label="right arrow"
  ></BsArrowRight>
);

const CarouselView = (props) => {
  const { block, data, isEditMode, openObjectBrowser, onChangeBlock } = props;
  const intl = useIntl();
  let initialNoOfSlides;
  if (window.innerWidth < 767) {
    initialNoOfSlides = 1;
  } else if (window.innerWidth > 768 && window.innerWidth < 992) {
    initialNoOfSlides = 2;
  } else {
    initialNoOfSlides = 3;
  }

  const [noOfSlide, setNoOfSlide] = useState(initialNoOfSlides);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setNoOfSlide(1);
      } else if (window.innerWidth > 768 && window.innerWidth < 992) {
        setNoOfSlide(2);
      } else {
        setNoOfSlide(data.items_to_show);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data.items_to_show, noOfSlide]);

  return (
    <Container>
      <div
        className={cx('block carousel', {
          'wrapperstyle full': data.useLargeContainer,
        })}
      >
        {(data.columns?.length === 0 || !data.columns) && isEditMode && (
          <Message>
            <div className="teaser-item default">
              <img src={teaserHeroTopTemplate} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {data.columns?.length > 0 && (
          <div
            className={cx({ 'full-width': data.useLargeContainer })}
            style={{ backgroundColor: props.data.bg_color }}
          >
            {data.headline && <h2 className="headline">{data.headline}</h2>}
            <Slider
              infinite={false}
              speed={500}
              slidesToShow={+noOfSlide}
              slidesToScroll={+noOfSlide}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {data.columns &&
                data.columns.map((item, index) => (
                  <Body
                    key={item['@id']}
                    data={item}
                    isEditMode={isEditMode}
                    dataBlock={data}
                    index={index}
                    block={block}
                    openObjectBrowser={openObjectBrowser}
                    onChangeBlock={onChangeBlock}
                  />
                ))}
            </Slider>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CarouselView;
