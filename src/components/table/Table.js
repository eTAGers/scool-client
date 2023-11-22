import React from 'react';
import PropTypes from 'prop-types';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

function MuiTable(props) {
  const { columns, data, actions, handleAdd, add = false } = props;
  const topAction = () => (
    <div>
      <Tooltip arrow title="Create">
        <IconButton onClick={handleAdd}>
          <AddBoxSharpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enableEditing: false,
    enableRowActions: true,
    renderRowActions: actions,
    enableSorting: true,
    enableSortingRemoval: false,
    positionActionsColumn: 'first',
    renderTopToolbarCustomActions: add ? topAction : undefined,
    muiTableHeadCellProps: {
      sx: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: '0',
        border: '1px solid #e0e0e0',
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: '#919EAB26',
        opacity: '0.9',
      },
    },
  });
  return (
    <div style={{ display: 'grid' }}>
      <MaterialReactTable table={table} />
    </div>
  );
}

MuiTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.any,
  handleAdd: PropTypes.func,
  add: PropTypes.bool,
};
export default MuiTable;
