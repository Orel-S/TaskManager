import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function TaskList({ tasks, columns }) {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    );
  }
  
  export default TaskList;