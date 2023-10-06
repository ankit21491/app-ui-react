import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'pages/common-utils/common.css';
import downIcon from 'assets/images/icons/down-arrow.gif';
import upIcon from 'assets/images/icons/up-arrow.png';

const PipelinePageComponent = ({ pipelineTableData }) => {
  // State variables to manage sorting order and category expansion
  const [sortOrder, setSortOrder] = useState('asc'); // Initialize with ascending order
  const [expandedCategories, setExpandedCategories] = useState({});

  // Handle sorting based on Role column
  const handleRoleSort = () => {
    // Toggle sorting order between ascending and descending
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  // Sort data based on Role column
  const sortedData = [...pipelineTableData].sort((a, b) => {
    const roleA = a.role.toUpperCase();
    const roleB = b.role.toUpperCase();
    if (sortOrder === 'asc') {
      return roleA.localeCompare(roleB);
    } else {
      return roleB.localeCompare(roleA);
    }
  });

  // Extract unique categories from sorted and filtered data
  const uniqueCategories = [...new Set(sortedData.map((item) => item.category))];

  // When the component is mounted, set all categories as expanded
  useEffect(() => {
    if (pipelineTableData && pipelineTableData.length > 0) {
      const categories = [...new Set(pipelineTableData.map((item) => item.category))];

      // Initialize expandedCategories when uniqueCategories change
      const initialExpandedCategories = {};
      categories.forEach((category) => {
        initialExpandedCategories[category] = true;
      });
      setExpandedCategories(initialExpandedCategories);
    }
  }, [pipelineTableData]);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th rowSpan="2" onClick={handleRoleSort} style={{ width: '200px' }}>
            Role Alias{sortOrder === 'asc' ? '▲' : '▼'} {/* Display sorting order indicator */}
          </th>
          <th style={{ width: '70px' }} rowSpan="2">
            Current Open Demands
          </th>
          <th colSpan="6">Candidate Pipeline</th>
          <th style={{ width: '70px' }} rowSpan="2">
            Internal Screening In Progress
          </th>
          <th style={{ width: '70px' }} rowSpan="2">
            Internal Selects
          </th>
          <th style={{ width: '70px' }} rowSpan="2">
            Under EDJ Review
          </th>
        </tr>
        <tr>
          <th style={{ width: '70px' }}>Core</th>
          <th style={{ width: '70px' }}>CTH</th>
          <th style={{ width: '70px' }}>DI</th>
          <th style={{ width: '70px' }}>HashedIn</th>
          <th style={{ width: '70px' }}>Advisory</th>
          <th style={{ width: '70px' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Render rows based on filtered data */}
        {uniqueCategories.map((category, categoryIndex) => {
          const categoryData = sortedData.filter((item) => item.category === category);
          const isExpanded = expandedCategories[category];

          return (
            <React.Fragment key={categoryIndex}>
              {/* Clickable category row with expand/collapse functionality */}
              <tr onClick={() => toggleCategoryExpansion(category)}>
                <td colSpan="11">
                  <div className="roleGroupContainer">
                    <span className="roleGroupName">{category}</span>{' '}
                    <div>
                      {/* Display expand/collapse icon based on category state */}
                      {isExpanded ? (
                        <img src={upIcon} alt="Expanded" style={{ width: '16px', height: '16px' }} />
                      ) : (
                        <img src={downIcon} alt="Collapsed" style={{ width: '16px', height: '16px' }} />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
              {/* Render individual rows for each item within the category if expanded */}
              {isExpanded &&
                categoryData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{item.role}</td>
                    <td>{item.currentOpenDemands}</td>
                    <td>{item.candidatePipeline?.core || ''}</td>
                    <td>{item.candidatePipeline?.cth || ''}</td>
                    <td>{item.candidatePipeline?.di || ''}</td>
                    <td>{item.candidatePipeline?.hashedIn || ''}</td>
                    <td>{item.candidatePipeline?.advisory || ''}</td>
                    <td>{item.candidatePipeline?.total || ''}</td>
                    <td>{item.candidatePipeline?.internalScreeningInProgress || ''}</td>
                    <td>{item.candidatePipeline?.internalSelects || ''}</td>
                    <td>{item.candidatePipeline?.underEDJReview || ''}</td>
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
        {/* Grand Total row */}
        <tr className="grandTotalRow">
          <td>Grand Total</td>
          {/* Calculate and display totals for each column */}
          <td>{sortedData.reduce((total, item) => total + item.currentOpenDemands, 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.core || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.cth || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.di || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.hashedIn || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.advisory || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.total || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.internalScreeningInProgress || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.internalSelects || 0), 0)}</td>
          <td>{sortedData.reduce((total, item) => total + (item.candidatePipeline?.underEDJReview || 0), 0)}</td>
        </tr>
      </tbody>
    </table>
  );
};

// PropTypes for the component
PipelinePageComponent.propTypes = {
  pipelineTableData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PipelinePageComponent;
