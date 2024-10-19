import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { printingLogs } from '@/constants/spso';
import { useState } from 'react';

const PrintingLogTable = () => {
const [filters, setFilters] = useState({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
})

  const statusBodyTemplate = (rowData: { status: string }) => {
    return <span className="status-success">{rowData.status}</span>;
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            onInput={(e) => setFilters({
              global: { value: e.currentTarget.value, matchMode: FilterMatchMode.CONTAINS },
            })}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="w-full bg-white rounded-lg">
      <DataTable value={printingLogs} removableSort paginator rows={5} filters={filters} header={header}>
        <Column
          field="id"
          header="ID"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
        <Column
          field="date"
          header="Date"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
        <Column
          field="fileName"
          header="File Name"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell max-w-28"
        ></Column>
        <Column
          field="fileSize"
          header="File Size"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
        <Column
          field="printer"
          header="Printer"
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          headerClassName="table-head"
          bodyClassName="table-cell"
        ></Column>
      </DataTable>
    </div>
  );
};

export default PrintingLogTable;

