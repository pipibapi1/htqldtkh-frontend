import React from 'react';

const GoogleDocsViewer = ({ file }: {file: File}) => {
  const fileUrl = URL.createObjectURL(file);
  return (
    <div></div>
  );
};

export default GoogleDocsViewer;