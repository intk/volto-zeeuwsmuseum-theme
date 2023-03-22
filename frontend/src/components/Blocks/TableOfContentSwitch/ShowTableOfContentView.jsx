import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowTableOfContentView = (props) => {
  const { TOC } = props.data;
  const [showTOC, setShowTOC] = React.useState('NO');
  const changedPath = useLocation();

  React.useEffect(() => {
    if (!TOC) return;
    if (TOC) {
      setShowTOC('YES');
    } else {
      setShowTOC('NO');
    }
  }, [TOC, changedPath.pathname]);

  useLayoutEffect(() => {
    document.body.setAttribute('show-table-of-content', showTOC);
  }, [showTOC]);

  return null;
};

export default ShowTableOfContentView;
