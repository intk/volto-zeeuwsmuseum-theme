import React from 'react';

const ShowTableOfContentView = (props) => {
  const { TOC } = props.data;
  const [showTOC, setShowTOC] = React.useState('NO');

  React.useEffect(() => {
    if (!TOC) return;
    if (TOC) {
      setShowTOC('YES');
    } else {
      setShowTOC('NO');
    }
  }, [TOC]);

  React.useEffect(() => {
    document.body.setAttribute('show-table-of-content', showTOC);
  }, [showTOC]);

  return null;
};

export default ShowTableOfContentView;
