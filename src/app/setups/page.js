"use client";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Setups() {
    const [setups, setSetups] = useState([]);
    const [loadingSetup, setLoadingSetup] = useState(true);
    const [setupFilters, setSetupFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        setup_name: { value: null, matchMode: 'contains' },
        rs_str: { value: null, matchMode: 'contains' },
        ts_str: { value: null, matchMode: 'contains' },
        protocol: { value: null, matchMode: 'contains' },
        port: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'contains' }
    });

    const headerSetups = <span style={{ color: 'black', fontWeight: "bold", fontSize: "18px" }}>MCU DISPATCHER - Setups</span>;

    useEffect(() => {
        axios.get('/api/setup-data')
            .then(response => {
                const processedData = response.data.map((setup, index) => {
                    setup.id = `${setup.setup_name}_${index}`;
                    setup.rs_str = setup.rs.map(rs =>
                        `Board Name: ${rs.name}, Revision: ${rs.revision}, Serial Number: ${rs.serial_number},Hostname: ${rs.hostname}`
                    ).join('; ');
                    setup.ts_str = setup.ts.map(ts =>
                        `Board Name: ${ts.name}, Revision: ${ts.revision}, Serial Number: ${ts.serial_number},Hostname: ${ts.hostname}`
                    ).join('; ');
                    return setup;
                });
                setSetups(processedData);
                setLoadingSetup(false);
            })
            .catch(error => {
                console.error('Error fetching setup data:', error);
            });
    }, []);

    const rsTemplate = (rowData) => (
        <div>
            {rowData.rs.map((rs, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Board Name:</strong> {rs.name}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Revision:</strong> {rs.revision}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Serial Number:</strong> {rs.serial_number}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Host-name:</strong> {rs.hostname}
                </div>
            ))}
        </div>
    );

    const tsTemplate = (rowData) => (
        <div>
            {rowData.ts.map((ts, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Board Name:</strong> {ts.name}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Revision:</strong> {ts.revision}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Serial Number:</strong> {ts.serial_number}
                    <br />
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: '6px', marginRight: '5px' }} />
                    <strong>Host-name:</strong> {ts.hostname}
                </div>
            ))}
        </div>
    );

    const protocolTemplate = (rowData) => rowData.protocol;

    const portTemplate = (rowData) => (
        <div>
            <strong>RS:</strong>
            <div>{rowData.rs.map((rs, index) => (
                <div key={index}>{rs.port.replace('/dev/', '')}</div>
            ))}</div>
            <strong>TS:</strong>
            <div>{rowData.ts.map((ts, index) => (
                <div key={index}>{ts.port.replace('/dev/', '')}</div>
            ))}</div>
        </div>
    );

    const statusTemplate = (rowData) => (
        <div>
            <strong>RS:</strong>
            <div>
                {rowData.rs.map((rs, index) => {
                    const textClass = rs.status === 'Connected' ? 'status-text connected' : 'status-text disconnected';
                    return (
                        <div key={index} className={textClass}>{rs.status}</div>
                    );
                })}
            </div>
            <strong>TS:</strong>
            <div>
                {rowData.ts.map((ts, index) => {
                    const textClass = ts.status === 'Connected' ? 'status-text connected' : 'status-text disconnected';
                    return (
                        <div key={index} className={textClass}>{ts.status}</div>
                    );
                })}
            </div>
        </div>
    );

    const onSetupFilterChange = (e) => {
        const { field, value } = e.target;
        setSetupFilters((prevFilters) => ({
            ...prevFilters,
            [field]: { value, matchMode: 'contains' }
        }));
    };

    return <div>
        {loadingSetup ? <LoadingScreen /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ width: '100%' }}>
                <DataTable
                    value={setups}
                    paginator
                    rows={10}
                    dataKey="id"
                    filters={setupFilters}
                    filterDisplay="row"
                    loading={loadingSetup}
                    globalFilterFields={['setup_name', 'rs_str', 'ts_str', 'protocol', 'port', 'status']}
                    header={headerSetups}
                    emptyMessage="NO SETUP FOUND"
                    onFilter={(e) => setSetupFilters(e.filters)}
                >
                    <Column
                        field="setup_name"
                        header="Setup Name"
                        filter
                        filterPlaceholder="Search by setup name"
                        style={{ minWidth: '12rem' }}
                        filterField="setup_name"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                    <Column
                        field="rs_str"
                        header="RS"
                        filterField="rs_str"
                        style={{ minWidth: '12rem' }}
                        body={rsTemplate}
                        filter
                        filterPlaceholder="Search by RS"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                    <Column
                        field="ts_str"
                        header="TS"
                        filterField="ts_str"
                        style={{ minWidth: '12rem' }}
                        body={tsTemplate}
                        filter
                        filterPlaceholder="Search by TS"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                    <Column
                        field="protocol"
                        header="Protocol"
                        style={{ minWidth: '12rem' }}
                        body={protocolTemplate}
                        filter
                        filterPlaceholder="Search by protocol"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                    <Column
                        field="port"
                        header="Port"
                        style={{ minWidth: '12rem' }}
                        body={portTemplate}
                        filter
                        filterPlaceholder="Search by port"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                    <Column
                        field="status"
                        header="Connection Status"
                        style={{ minWidth: '12rem' }}
                        body={statusTemplate}
                        filter
                        filterPlaceholder="Search by connection status"
                        onFilterApplyClick={onSetupFilterChange}
                    />
                </DataTable>
            </div>
        </div>}
    </div>
}

export default Setups;