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

    const buttonClasses = 'px-3 border disabled:text-gray-500 disabled:border-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent text-nexus-primary border-nexus-primary hover:bg-nexus-primary hover:text-white';

    return (
        <div className='article-container container overflow-x-auto mx-auto'>
            <table className='article-table table'>
                <thead>
                    {table.getHeaderGroups()?.map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers?.map(header => <th className='text-white bg-nexus-primary text-lg font-semibold' key={header.id} onClick={header.column.getToggleSortingHandler()}>
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
            <div className='flex justify-center items-center gap-6 mt-5 mb-12'>
                <button className={buttonClasses}
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.setPageIndex(0)}>First</button>
                <button className={buttonClasses}
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Previous
                </button>
                <button className={buttonClasses}
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Next
                </button>
                <button className={buttonClasses}
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Last
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