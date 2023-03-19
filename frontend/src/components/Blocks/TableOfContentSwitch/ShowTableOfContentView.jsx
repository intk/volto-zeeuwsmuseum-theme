import React from 'react';
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
  }, [TOC]);

  React.useEffect(() => {
    const updateAttributes = async () => {
      document.body.setAttribute('show-table-of-content', showTOC);
    };

    updateAttributes();
  }, [showTOC, changedPath.pathname]);

  return null;
};

export default ShowTableOfContentView;
