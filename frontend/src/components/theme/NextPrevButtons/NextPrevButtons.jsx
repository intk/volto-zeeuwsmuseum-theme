import React from 'react';
import { Icon } from '@plone/volto/components';
import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
// import { NavLink } from 'react-router-dom';
import './NextPrevButtons.less';
import { useState, useEffect } from 'react';
// import circlerightSVG from '@plone/volto/icons/circle-right.svg';
// import circleleftSVG from '@plone/volto/icons/circle-left.svg';
// import BsArrowLeftCircle from 'react-icons/bs';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';

const NextPrevButtons = (props) => {
  const history = useHistory();
  const [showButtons, setShowButtons] = useState('false');
  console.log(props)

  const handleScroll = () => {
    const breakpoint = window.innerWidth * 0.4;
    const bottomThreshold =
      document.body.scrollHeight - window.innerHeight - 400;

    if (
      window.pageYOffset > breakpoint &&
      window.pageYOffset < bottomThreshold
    ) {
      setShowButtons('fadeIn');
    } else {
      setShowButtons('fadeOut');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = (url) => {
    const pageURL = flattenToAppURL(url);
    history.push(pageURL);
  };

  return (
    <div className="arrowcontainer">
      <div className={`navigation-arrow ${showButtons}`}>
        <div className="arrow-container-left">
          {props.content.previous_item.title &&
            props.content.previous_item['@type'] === 'Document' && (
              <>
                <button
                  className="left-arrow"
                  aria-label="Next Slide"
                  onClick={() =>
                    handleButtonClick(props.content.previous_item['@id'])
                  }
                >
                  <Icon name={leftSVG} size="55px" />
                </button>
                <div className="extention-left">
                  <h3>{props.content.previous_item.title}</h3>
                </div>
              </>
            )}
        </div>

        <div className="arrow-container-right">
          {props.content.next_item.title &&
            props.content.next_item['@type'] === 'Document' && (
              <>
                <button
                  className="right-arrow"
                  aria-label="Prev Slide"
                  onClick={() =>
                    handleButtonClick(props.content.next_item['@id'])
                  }
                >
                  <Icon name={rightSVG} size="55px" />
                </button>
                <div className="extention-right">
                  <h3>{props.content.next_item.title}</h3>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default NextPrevButtons;
