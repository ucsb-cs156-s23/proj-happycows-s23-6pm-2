import React, { useMemo } from "react";
import OurTable from "main/components/OurTable"
import { formatTime } from "main/utils/dateUtils";

const columns = [
    {
        Header: 'id',
        accessor: 'id', // accessor is the "key" in the data
    },
    {
        Header: 'First Name',
        accessor: 'givenName',
    },
    {
        Header: 'Last Name',
        accessor: 'familyName',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Last Online',
        accessor: 'lastOnline',
    },
    {
        Header: 'Admin',
        id: 'admin',
        accessor: (row, _rowIndex) => String(row.admin) // hack needed for boolean values to show up
    },
];

export default function UsersTable({ users }) {
    const data = useMemo(
        () =>
            (users || []).map((user) => ({
                ...user,
                lastOnline: formatTime(user.lastOnline),
            })),
        // Stryker disable next-line all
        [users]
    );

    return <OurTable
        data={data}
        columns={columns}
        testid={"UsersTable"} />;
};