"use client"
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect } from 'react';

export default function Table() {
    const customers = [
        { id: 1, name: 'MouayedBelkhir', country: { name: 'USA' }, representative: { name: 'Jane Smith' }, status: 'Active', verified: true },
        { id: 2, name: 'Alice Johnson', country: { name: 'Canada' }, representative: { name: 'Bob Brown' }, status: 'Inactive', verified: false },
        { id: 3, name: 'Bob White', country: { name: 'UK' }, representative: { name: 'Alice Johnson' }, status: 'Active', verified: true },
        { id: 4, name: 'Charlie Black', country: { name: 'Germany' }, representative: { name: 'John Doe' }, status: 'Inactive', verified: false },
    ];

    const [filters, setFilters] = React.useState({
        name: { value: null },
        country: { value: null },
        representative: { value: null },
        status: { value: null },
        verified: { value: null }
    });

    const loading = false;
    const header = 'ACTIA';

    const countryBodyTemplate = (rowData) => rowData.country.name;
    const representativeBodyTemplate = (rowData) => rowData.representative.name;
    const statusBodyTemplate = (rowData) => rowData.status;
    const verifiedBodyTemplate = (rowData) => (rowData.verified ? 'Yes' : 'No');

    return (
        <DataTable
            value={customers}
            paginator
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loading}
            globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
            header={header}
            emptyMessage="NO BOARD FOUND"
            onFilter={(e) => setFilters(e.filters)}
        >
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
            <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
            <Column header="Agent" filterField="representative.name" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter />
            <Column field="status" header="Status" style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter />


        </DataTable>
    );
}
