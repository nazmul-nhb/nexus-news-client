import { useState } from 'react';
import PropTypes from 'prop-types';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import './NexusTable.css';

const NexusTable = ({ data, columns }) => {
    const [sortArticle, setSortArticle] = useState([]);

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                    {table.getRowModel().rows?.map(row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells()?.map(cell => (
                                    <td key={cell.id}>
                                        {(flexRender(cell.column.columnDef.cell, cell.getContext()))}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.setPageIndex(0)}>First page</button>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Previous page
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Next page
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Last page
                </button>
            </div>
        </div>
    );
};

NexusTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
}


export default NexusTable;