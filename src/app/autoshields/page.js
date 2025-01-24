"use client";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';

function Autoshields() {
    const [autoshields, setAutoshields] = useState([]);
    const [loadingAutoshield, setLoadingAutoshield] = useState(true);
    const [autoshieldFilters, setAutoshieldFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        family: { value: null, matchMode: 'contains' },
        serial_number: { value: null, matchMode: 'contains' },
        fixtures_str: { value: null, matchMode: 'contains' },
        labels: { value: null, matchMode: 'contains' },
        hostname: { value: null, matchMode: 'contains' },
        location: { value: null, matchMode: 'contains' },
        port: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'contains' },
        connection_status: { value: null, matchMode: 'contains' },
        target: { value: null, matchMode: 'contains' }
    });

    const headerAutoshields = <span style={{ color: 'black', fontWeight: "bold", fontSize: "18px" }}>MCU DISPATCHER - Autoshields</span>;

    useEffect(() => {
        axios.get('/api/autoshield-data')
            .then(response => {
                const processedData = response.data.map(autoshield => {
                    if (/tuncxd400[1-4]\.tue\.st\.com/.test(autoshield.hostname)) {
                        autoshield.location = "ACTIA";
                    } else if (autoshield.hostname.startsWith("lmecxd")) {
                        autoshield.location = "LME";
                    } else {
                        autoshield.location = "";
                    }

                    autoshield.fixtures_str = autoshield.fixtures.join(', ');

                    return autoshield;
                });
                setAutoshields(processedData);
                setLoadingAutoshield(false);
            })
            .catch(error => {
                console.error('Error fetching autoshield data:', error);
            });

    }, []);

    const familyTemplate = (rowData) => rowData.family;
    const serialNumberTemplate = (rowData) => rowData.serial_number;
    const targetTemplate = (rowData) => rowData.target;

    const fixturesBodyTemplate = (rowData) => {
        return rowData.fixtures_str;
    };

    const labelsBodyTemplate = (rowData) => rowData.labels;
    const hostnameBodyTemplate = (rowData) => rowData.hostname;
    const locationBodyTemplate = (rowData) => rowData.location;

    const portTemplate = (rowData) => {
        return rowData.port.replace('/dev/', '');
    };

    const statusBodyTemplate = (rowData) => {
        const textClass = rowData.status === 'UNLOCKED' ? 'status-text unlocked' : 'status-text locked';
        return (
            <span className={textClass}>{rowData.status}</span>
        );
    };

    const connectionStatusTemplate = (rowData) => {
        const textClass = rowData.connection_status === 'Connected' ? 'status-text connected' : 'status-text disconnected';
        return (
            <span className={textClass}>{rowData.connection_status}</span>
        );
    };

    const onAutoshieldFilterChange = (e) => {
        const { field, value } = e.target;
        setAutoshieldFilters((prevFilters) => ({
            ...prevFilters,
            [field]: { value, matchMode: 'contains' }
        }));
    };

    return <div>
        {loadingAutoshield ? <LoadingScreen /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%' }}>
                <DataTable
                    value={autoshields}
                    paginator
                    rows={10}
                    dataKey="serial_number"
                    filters={autoshieldFilters}
                    filterDisplay="row"
                    loading={loadingAutoshield}
                    globalFilterFields={['name', 'family', 'serial_number', 'fixtures_str', 'labels', 'hostname', 'location', 'port', 'status', 'target']}
                    header={headerAutoshields}
                    emptyMessage="NO AUTOSHIELD FOUND"
                    onFilter={(e) => setAutoshieldFilters(e.filters)}
                >
                    <Column
                        field="name"
                        header="Autoshield Name"
                        filter
                        filterPlaceholder="Search by name"
                        style={{ minWidth: '12rem' }}
                        filterField="name"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="family"
                        header="Family"
                        filterField="family"
                        style={{ minWidth: '12rem' }}
                        body={familyTemplate}
                        filter
                        filterPlaceholder="Search by family"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="serial_number"
                        header="Serial Number"
                        style={{ minWidth: '12rem' }}
                        body={serialNumberTemplate}
                        filter
                        filterPlaceholder="Search by Serial number"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="connection_status"
                        header="Connection Status"
                        style={{ minWidth: '12rem' }}
                        body={connectionStatusTemplate}
                        filter
                        filterPlaceholder="Search by Connection Status"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="target"
                        header="Target"
                        style={{ minWidth: '12rem' }}
                        body={targetTemplate}
                        filter
                        filterPlaceholder="Search by Target"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="hostname"
                        header="Host Name"
                        style={{ minWidth: '12rem' }}
                        body={hostnameBodyTemplate}
                        filter
                        filterPlaceholder="Search by Host Name"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="status"
                        header="Board Status"
                        style={{ minWidth: '12rem' }}
                        body={statusBodyTemplate}
                        filter
                        filterPlaceholder="Search by Connection Status"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="labels"
                        header="Labels"
                        style={{ minWidth: '12rem' }}
                        body={labelsBodyTemplate}
                        filter
                        filterPlaceholder="Search by Labels"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="fixtures_str"
                        header="Fixtures"
                        style={{ minWidth: '12rem' }}
                        body={fixturesBodyTemplate}
                        filter
                        filterPlaceholder="Search by Fixtures"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="port"
                        header="Port"
                        style={{ minWidth: '12rem' }}
                        body={portTemplate}
                        filter
                        filterPlaceholder="Search by Port"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                    <Column
                        field="location"
                        header="Location"
                        style={{ minWidth: '12rem' }}
                        body={locationBodyTemplate}
                        filter
                        filterPlaceholder="Search by Location"
                        onFilterApplyClick={onAutoshieldFilterChange}
                    />
                </DataTable>
            </div>
        </div>}
    </div>
}

export default Autoshields;