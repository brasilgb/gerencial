import React, { Fragment } from 'react';

export const STable = ({ children }) => {
    return (
        <Fragment>
            <table className='w-full'>
                {children}
            </table>
        </Fragment>
    );
};

export const STr = ({ thead, children, colorRow }) => {
    return (
        <Fragment>

            {thead ?
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
                :
                <tbody>
                    <tr className={`${colorRow > 0 ? "bg-gray-50" :"bg-blue-50"} hover:bg-orange-50`}>
                        {children}
                    </tr>
                </tbody>
            }

        </Fragment>
    );
};

export const STh = ({ children, colspan, largura }) => {
    return (
        <Fragment>
            <th
                colSpan={colspan}
                className={`${largura} text-left bg-gray-200 text-gray-600 text-shadow-md px-2 py-2 text-sm uppercase`}
                // style={{ textShadow: "#888 1px 1px 4px", color: "#333" }}
            >
                {children}
            </th>
        </Fragment>
    );
};

export const STd = ({ children, colspan }) => {
    return (
        <Fragment>
            <td
                colSpan={colspan}
                className="p-2 border-b border-gray-200 text-gray-600 text-shadow-md"
            >
                {children}
            </td>
        </Fragment>
    );
};
