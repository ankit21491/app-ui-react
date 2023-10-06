import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'pages/common-utils/common.css';
import downIcon from 'assets/images/icons/down-arrow.gif';
import upIcon from 'assets/images/icons/up-arrow.png';

// Define the order of months
const monthOrder = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
];

function DemandPageComponent({ data }) {
  // State for sorted data
  const [sortedData, setSortedData] = useState(data);

  // State for sorting order ('asc' or 'desc')
  const [sortOrder, setSortOrder] = useState('asc');

  // State to track whether each role group is collapsed or expanded
  const [collapsedGroups, setCollapsedGroups] = useState({});

  useEffect(() => {
    // Sort the data whenever sortOrder or data changes
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedData(sorted);
  }, [data, sortOrder]);

  // Filter unique months from the data and order them according to monthOrder
  const months = [...new Set(data.flatMap((item) => item.monthData.map((month) => month.name)))].sort((a, b) => {
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  // Group data by role group
  const groupedData = sortedData.reduce((grouped, item) => {
    if (!grouped[item.roleGroup]) {
      grouped[item.roleGroup] = [];
    }
    // Add each item to its respective role group
    grouped[item.roleGroup].push(item);
    return grouped;
  }, {});

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Function to toggle the collapsed/expanded state of a role group
  const toggleRoleGroup = (roleGroup) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [roleGroup]: !prevState[roleGroup]
    }));
  };

  // Calculate grand totals
  const grandTotal = {
    name: 'Grand Total',
    monthData: months.map((month) => ({
      name: month,
      // Calculate the sum of requested, staffed, and open roles for each month
      requested: data.reduce((total, item) => total + (item.monthData.find((data) => data.name === month)?.requested || 0), 0),
      staffed: data.reduce((total, item) => total + (item.monthData.find((data) => data.name === month)?.staffed || 0), 0),
      open: data.reduce((total, item) => total + (item.monthData.find((data) => data.name === month)?.open || 0), 0)
    })),
    // Calculate the total of requested, staffed, and open roles for the entire dataset
    totalRequestRoles: data.reduce((total, item) => total + item.totalRequestRoles, 0),
    totalStaffedRoles: data.reduce((total, item) => total + item.totalStaffedRoles, 0),
    totalOpenRoles: data.reduce((total, item) => total + item.totalOpenRoles, 0)
  };

  // Define PropTypes for the component
  DemandPageComponent.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        roleGroup: PropTypes.string.isRequired,
        monthData: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            requested: PropTypes.number,
            staffed: PropTypes.number,
            open: PropTypes.number
          })
        ).isRequired,
        totalRequestRoles: PropTypes.number.isRequired,
        totalStaffedRoles: PropTypes.number.isRequired,
        totalOpenRoles: PropTypes.number.isRequired
      })
    ).isRequired
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th rowSpan="3" onClick={toggleSortOrder} style={{ cursor: 'pointer', width: '400px', fontWeight: 'bold' }}>
            Role Alias
            {sortOrder === 'asc' ? ' ▲' : ' ▼'}
          </th>
          {/* Create table headers for each month in the specified order */}
          {months.map((month) => (
            <th key={month} colSpan="3" style={{ width: '90px' }}>
              {month}
            </th>
          ))}
          <th rowSpan="3" style={{ width: '200px' }}>
            Total Requested Roles
          </th>
          <th rowSpan="3" style={{ width: '200px' }}>
            Total Staffed Roles
          </th>
          <th rowSpan="3" style={{ width: '200px' }}>
            Total Open Roles
          </th>
        </tr>
        <tr>
          {/* Create sub-headers for requested, staffed, and open roles for each month */}
          {months.map((month) => (
            <React.Fragment key={month}>
              <th style={{ width: '90px' }}>Requested</th>
              <th style={{ width: '90px' }}>Staffed</th>
              <th style={{ width: '90px' }}>Open</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Loop through role groups */}
        {Object.keys(groupedData).map((roleGroup) => (
          <React.Fragment key={roleGroup}>
            <tr onClick={() => toggleRoleGroup(roleGroup)}>
              <td colSpan={months.length * 3 + 4}>
                <div className="roleGroupContainer">
                  <span className="roleGroupName">{roleGroup}</span>
                  <div>
                    {collapsedGroups[roleGroup] ? (
                      <img src={downIcon} alt="Collapsed" style={{ width: '16px', height: '16px' }} />
                    ) : (
                      <img src={upIcon} alt="Expanded" style={{ width: '16px', height: '16px' }} />
                    )}
                  </div>
                </div>
              </td>
            </tr>
            {/* Check if the role group is collapsed before rendering individual roles */}
            {!collapsedGroups[roleGroup] &&
              groupedData[roleGroup].map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.name}</td>
                  {/* Display requested, staffed, and open roles for each month */}
                  {months.map((month) => {
                    const monthData = item.monthData.find((data) => data.name === month);
                    return (
                      <React.Fragment key={month}>
                        {monthData && (
                          <>
                            <td>{monthData.requested !== 0 ? monthData.requested : ''}</td>
                            <td>{monthData.staffed !== 0 ? monthData.staffed : ''}</td>
                            <td>{monthData.open !== 0 ? monthData.open : ''}</td>
                          </>
                        )}
                        {!monthData && (
                          <>
                            {/* Display empty cells if data is missing */}
                            <td></td>
                            <td></td>
                            <td></td>
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {/* Display total requested, staffed, and open roles for the item */}
                  <td>{item.totalRequestRoles}</td>
                  <td>{item.totalStaffedRoles}</td>
                  <td>{item.totalOpenRoles}</td>
                </tr>
              ))}
            {/* RoleGroup Row */}
            {!collapsedGroups[roleGroup] && (
              <tr className="subTotalRow">
                <td>Sub Total ({roleGroup})</td>
                {/* Calculate subtotals for each month within a role group */}
                {months.map((month) => {
                  const subtotalRequested = groupedData[roleGroup].reduce(
                    (total, item) => total + (item.monthData.find((data) => data.name === month)?.requested || 0),
                    0
                  );
                  const subtotalStaffed = groupedData[roleGroup].reduce(
                    (total, item) => total + (item.monthData.find((data) => data.name === month)?.staffed || 0),
                    0
                  );
                  const subtotalOpen = groupedData[roleGroup].reduce(
                    (total, item) => total + (item.monthData.find((data) => data.name === month)?.open || 0),
                    0
                  );
                  return (
                    <React.Fragment key={month}>
                      {/* Display subtotals for requested, staffed, and open roles for each month */}
                      <td>{subtotalRequested !== null ? subtotalRequested : ''}</td>
                      <td>{subtotalStaffed !== null ? subtotalStaffed : ''}</td>
                      <td>{subtotalOpen !== null ? subtotalOpen : ''}</td>
                    </React.Fragment>
                  );
                })}
                {/* Calculate total requested, staffed, and open roles for the role group */}
                <td>{groupedData[roleGroup].reduce((total, item) => total + item.totalRequestRoles, 0)}</td>
                <td>{groupedData[roleGroup].reduce((total, item) => total + item.totalStaffedRoles, 0)}</td>
                <td>{groupedData[roleGroup].reduce((total, item) => total + item.totalOpenRoles, 0)}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
        {/* Grand Total Row */}
        <tr className="grandTotalRow">
          <td>{grandTotal.name}</td>
          {/* Display grand totals for requested, staffed, and open roles for each month */}
          {grandTotal.monthData.map((month) => (
            <React.Fragment key={month.name}>
              <td>{month.requested !== null ? month.requested : ''}</td>
              <td>{month.staffed !== null ? month.staffed : ''}</td>
              <td>{month.open !== null ? month.open : ''}</td>
            </React.Fragment>
          ))}
          {/* Display grand totals for total requested, staffed, and open roles */}
          <td>{grandTotal.totalRequestRoles}</td>
          <td>{grandTotal.totalStaffedRoles}</td>
          <td>{grandTotal.totalOpenRoles}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default DemandPageComponent;
