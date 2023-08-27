import React from 'react';

const ExportButton = ({ data, columns }) => {
  const exportCSV = () => {
    const csvContent = columns.map(column => column.headerName).join(',') + '\n' +
      data.map(row => columns.map(column => row[column.field]).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'table-data.csv');
    link.click();
  };

  return (
    <button
      onClick={exportCSV}
      style={{
        color: 'darkgreen',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Export Table
    </button>
  );
};

export default ExportButton;
