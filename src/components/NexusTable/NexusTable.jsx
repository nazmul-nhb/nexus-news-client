import { useState } from 'react';
import PropTypes from 'prop-types';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table';
import './NexusTable.css';

const NexusTable = ({ data, columns }) => {
    const [sortArticle, setSortArticle] = useState([]);

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting: sortArticle },
        onSortingChange: setSortArticle
    });

    return (
        <div className='article-container container overflow-x-auto'>
            <table className='article-table table'>
                <thead>
                    {table.getHeaderGroups()?.map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers?.map(header => <th className='text-white bg-nexus-secondary text-lg font-semibold' key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {
                                        { asc: <RiSortAsc className='inline ml-2' />, desc: <RiSortDesc className='inline ml-2' /> }[
                                        header.column.getIsSorted() ?? null
                                        ]
                                    }
                                </th>)
                            }
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.map((row, index) => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells()?.map(cell => (
                                    <td key={cell.id}>
                                        {cell.column.columnDef.accessorKey === 'posted_on' || cell.column.columnDef.accessorKey === 'joined_on' ? (index + 1)
                                            : (flexRender(cell.column.columnDef.cell, cell.getContext()))}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

NexusTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
}


export default NexusTable;