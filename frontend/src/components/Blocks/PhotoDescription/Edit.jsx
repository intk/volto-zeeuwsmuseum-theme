import React from 'react';
import Sidebar from './Siderbar';
import View from './View';

const Edit = (props) => {
  return (
    <>
      <View {...props} />
      <Sidebar {...props} />
    </>
  );
};

export default Edit;
