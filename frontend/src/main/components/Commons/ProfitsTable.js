import React from "react";
import OurTable from "main/components/OurTable";

export default function ProfitsTable({ profits }) {
    
    // Stryker disable ArrayDeclaration : [columns] and [students] are performance optimization; mutation preserves correctness
    const memoizedColumns = React.useMemo(() => 
        [
            {
                Header: "Amount",
                accessor: (row) => `$${row.amount.toFixed(2)}`,
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "CowHealth",
                accessor: "avgCowHealth",
            },
            {
                Header: "NumCows",
                accessor: "numCows",
            },
        ], 
    []);
    const memoizedDates = React.useMemo(() => profits, [profits]);
    // Stryker restore ArrayDeclaration

    return (
        <div style={{ overflowX: "auto" }}  data-testid="profits-table">
          <OurTable data={memoizedDates} columns={memoizedColumns} testid={"ProfitsTable"} />
        </div>
      );
};