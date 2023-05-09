import React from "react";

interface TableProps {
    children?: React.ReactNode;
    thead?: any;
    colorRow?: any;
    colspan?: any;
    rowspan?: any;
    classname?: any;
    total?: any;
}

export const STable = ({ children }: TableProps) => {
    return (
        <table className='w-full'>
            {children}
        </table>
    );
};

export const STr = ({ children, colorRow, total }: TableProps) => {
    return (
        <tr className={`${colorRow > 0 ? "bg-gray-50" : "bg-blue-50"} ${total && "!bg-orange-200 !font-semibold"} hover:bg-orange-50`}>
            {children}
        </tr>

    );
};

export const STh = ({ children, colspan, rowspan, classname }: TableProps) => {
    return (
        <th
            colSpan={colspan}
            rowSpan={rowspan}
            className={`${classname} bg-gray-200 text-gray-600 px-2 py-2 text-sm`}
        >
            {children}
        </th>
    );
};

export const STd = ({ children, classname, colspan, rowspan }: TableProps) => {
    return (
        <td
            colSpan={colspan}
            rowSpan={rowspan}
            className={`${classname} p-2 border-b border-gray-200 text-gray-600 text-shadow-md`}
        >
            {children}
        </td>
    );
};