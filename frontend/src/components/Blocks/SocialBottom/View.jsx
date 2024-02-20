import React from 'react';
// import Slider from 'react-slick';
// import { FaChevronRight, FaFacebookF } from 'react-icons/fa';
// import { IoLogoTwitter } from 'react-icons/io';
// import { ImInstagram } from 'react-icons/im';

const View = (props) => {
  return (
    <div className="SocialbuttonsBottom">
      <li
        className="rrssb-facebook small"
        // data-size="0"
        // style={{width: 33.3333%}}
        // data-initwidth="33.333333333333336"
      >
        <a
          className="popup"
          href="https://www.facebook.com/sharer/sharer.php?u=https://www.zeeuwsmuseum.nl/nl/jaarverslag/2021/terugblik"
        >
          <span className="rrssb-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
            >
              <path d="M26.4 0H2.6C1.714 0 0 1.715 0 2.6v23.8c0 .884 1.715 2.6 2.6 2.6h12.393V17.988h-3.996v-3.98h3.997v-3.062c0-3.746 2.835-5.97 6.177-5.97 1.6 0 2.444.173 2.845.226v3.792H21.18c-1.817 0-2.156.9-2.156 2.168v2.847h5.045l-.66 3.978h-4.386V29H26.4c.884 0 2.6-1.716 2.6-2.6V2.6c0-.885-1.716-2.6-2.6-2.6z"></path>
            </svg>
          </span>
          <span className="rrssb-text"></span>
        </a>
      </li>
      <li
        className="rrssb-twitter small"
        // data-size="0"
        // style={{width: 33.3333%}}
        // data-initwidth="33.333333333333336"
      >
        <a
          className="popup"
          href="https://twitter.com/intent/tweet?text=Terugblik: https://www.zeeuwsmuseum.nl/nl/jaarverslag/2021/terugblik"
        >
          <span className="rrssb-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewbox="0 0 1200 1277"
            >
              <path
                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                strokeWidth="2"
              />
            </svg>
          </span>
          <span className="rrssb-text"></span>
        </a>
      </li>
      <li
        className="rrssb-email small"
        // data-size="0"
        // style={{width: 33.3333%}}
        // data-initwidth="33.333333333333336"
      >
        <a href="mailto:?subject=Terugblik&amp;body=https://www.zeeuwsmuseum.nl/nl/jaarverslag/2021/terugblik">
          <span className="rrssb-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
            >
              <path d="M20.11 26.147c-2.335 1.05-4.36 1.4-7.124 1.4C6.524 27.548.84 22.916.84 15.284.84 7.343 6.602.45 15.4.45c6.854 0 11.8 4.7 11.8 11.252 0 5.684-3.193 9.265-7.398 9.3-1.83 0-3.153-.934-3.347-2.997h-.077c-1.208 1.986-2.96 2.997-5.023 2.997-2.532 0-4.36-1.868-4.36-5.062 0-4.75 3.503-9.07 9.11-9.07 1.713 0 3.7.4 4.6.972l-1.17 7.203c-.387 2.298-.115 3.3 1 3.4 1.674 0 3.774-2.102 3.774-6.58 0-5.06-3.27-8.994-9.304-8.994C9.05 2.87 3.83 7.545 3.83 14.97c0 6.5 4.2 10.2 10 10.202 1.987 0 4.09-.43 5.647-1.245l.634 2.22zM16.647 10.1c-.31-.078-.7-.155-1.207-.155-2.572 0-4.596 2.53-4.596 5.53 0 1.5.7 2.4 1.9 2.4 1.44 0 2.96-1.83 3.31-4.088l.592-3.72z"></path>
            </svg>
          </span>
          <span className="rrssb-text"></span>
        </a>
      </li>
    </div>
  );
};

export default View;
