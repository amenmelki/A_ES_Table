"use client";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';

function Boards() {
    const [boards, setBoards] = useState([]);
    const [loadingBoard, setLoadingBoard] = useState(true);
    const [boardFilters, setBoardFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        family: { value: null, matchMode: 'contains' },
        revision: { value: null, matchMode: 'contains' },
        serial_number: { value: null, matchMode: 'contains' },
        external_equipement_str: { value: null, matchMode: 'contains' },
        labels: { value: null, matchMode: 'contains' },
        hostname: { value: null, matchMode: 'contains' },
        location: { value: null, matchMode: 'contains' },
        port: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'contains' },
        connection_status: { value: null, matchMode: 'contains' },
    });

    const headerBoards = <span style={{ color: 'black', fontWeight: "bold", fontSize: "18px" }}>MCU DISPATCHER - Boards</span>;

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('/api/board-data');
                const processedData = response.data.map(board => {
                    if (/tuncxd400[1-4]\.tue\.st\.com/.test(board.hostname)) {
                        board.location = "ACTIA";
                    } else if (board.hostname.startsWith("lmecxd")) {
                        board.location = "LME";
                    } else {
                        board.location = "";
                    }

                    if (typeof board.external_equipement === 'object' && board.external_equipement.length > 0) {
                        board.external_equipement_str = board.external_equipement.map(eq =>
                            `Name: ${eq.name}, Type: ${eq.type}, Fixtures: ${eq.fixtures.join(', ')}, Serial Number: ${eq.serial_number}`
                        ).join('; ');
                    } else {
                        board.external_equipement_str = board.external_equipement;
                    }

                    return board;
                });
                setBoards(processedData);
                setLoadingBoard(false);
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };

        fetchBoards();
    }, []);

    const boardNameTemplate = (rowData) => rowData.name;
    const boardFamilyTemplate = (rowData) => rowData.family;
    const revisionIDTemplate = (rowData) => rowData.revision;
    const serialNumberTemplate = (rowData) => rowData.serial_number;

    const externalEquipementBodyTemplate = (rowData) => {
        if (typeof rowData.external_equipement === 'object' && rowData.external_equipement.length > 0) {
            return (
                <ul>
                    <li><strong>Name:</strong> {rowData.external_equipement[0].name}</li>
                    <li><strong>Type:</strong> {rowData.external_equipement[0].type}</li>
                    <li><strong>Fixtures:</strong> {rowData.external_equipement[0].fixtures.join(', ')}</li>
                    <li><strong>Serial Number:</strong> {rowData.external_equipement[0].serial_number}</li>
                </ul>
            );
        }
        return rowData.external_equipement;
    };

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

    const onBoardFilterChange = (e) => {
        const { field, value } = e.target;
        setBoardFilters((prevFilters) => ({
            ...prevFilters,
            [field]: { value, matchMode: 'contains' }
        }));
    };

    return <div>
        {loadingBoard ? <LoadingScreen /> : <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%' }}>
                <DataTable
                    value={boards}
                    paginator
                    rows={10}
                    dataKey="serial_number"
                    filters={boardFilters}
                    filterDisplay="row"
                    loading={loadingBoard}
                    globalFilterFields={['name', 'family', 'serial_number', 'external_equipement_str', 'labels', 'hostname', 'location', 'port', 'status', 'connection_status']}
                    header={headerBoards}
                    emptyMessage="NO BOARD FOUND"
                    onFilter={(e) => setBoardFilters(e.filters)}
                >
                    <Column
                        field="name"
                        header="Board name"
                        body={boardNameTemplate}
                        filter
                        filterPlaceholder="Search by board"
                        style={{ minWidth: '12rem' }}
                        filterField="name"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="family"
                        header="Board family"
                        filterField="family"
                        style={{ minWidth: '12rem' }}
                        body={boardFamilyTemplate}
                        filter
                        filterPlaceholder="Search by family"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="serial_number"
                        header="Serial Number"
                        style={{ minWidth: '12rem' }}
                        body={serialNumberTemplate}
                        filter
                        filterPlaceholder="Search by Serial number"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="hostname"
                        header="Host Name"
                        style={{ minWidth: '12rem' }}
                        body={hostnameBodyTemplate}
                        filter
                        filterPlaceholder="Search by Host Name"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="location"
                        header="Location"
                        style={{ minWidth: '12rem' }}
                        body={locationBodyTemplate}
                        filter
                        filterPlaceholder="Search by Location"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="connection_status"
                        header="Connection Status"
                        style={{ minWidth: '12rem' }}
                        body={connectionStatusTemplate}
                        filter
                        filterPlaceholder="Search by Connection Status"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="port"
                        header="Port"
                        style={{ minWidth: '12rem' }}
                        body={portTemplate}
                        filter
                        filterPlaceholder="Search by Port"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="status"
                        header="Board Status"
                        style={{ minWidth: '12rem' }}
                        body={statusBodyTemplate}
                        filter
                        filterPlaceholder="Search by Board Status"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                    <Column
                        field="external_equipement_str"
                        header="External Equipment"
                        style={{ minWidth: '12rem' }}
                        body={externalEquipementBodyTemplate}
                        filter
                        filterPlaceholder="Search by External Equipment"
                        onFilterApplyClick={onBoardFilterChange}
                    />
                </DataTable>
            </div>
        </div>}
    </div>
}

export default Boards;