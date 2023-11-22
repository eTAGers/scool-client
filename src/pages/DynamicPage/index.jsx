import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fieldData from '../../utils/pages.json';
import Form from '../DynamicForm';

function DynamicPage(props) {
  const [selectedSection, setSelectedSection] = useState(props.sectionName);
  useEffect(() => {
    setSelectedSection(props.sectionName);
  }, [props]);
  return (
    <div>
      <Form
        sectionName={selectedSection}
        sectionData={fieldData[selectedSection]}
        onBack={() => setSelectedSection(null)}
      />
    </div>
  );
}
DynamicPage.propTypes = {
  sectionName: PropTypes.string.isRequired,
};
export default DynamicPage;
