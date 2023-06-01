import { render, screen, waitFor } from "@testing-library/react";
import Profits from "main/components/Commons/Profits"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 
import commonsFixtures from "fixtures/commonsFixtures";
import profitsFixtures from "fixtures/profitsFixtures";

describe("Profits tests", () => {
    test("shows milk price", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} commons={commonsFixtures.oneCommons[0]} profits={[]} />
        );
        expect(screen.getByText("Market Milk Price: $10 per healthy cow.")).toBeInTheDocument();
    })

    test("renders properly for empty profits array", () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} commons={commonsFixtures.oneCommons[0]} profits={[]} />
        );
    });

    test("renders properly when profits is not defined", async () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} commons={commonsFixtures.oneCommons[0]}  />
        );
        await waitFor(()=>{
            expect(screen.getByTestId("ProfitsTable-header-Amount") ).toBeInTheDocument();
        });
    });

    test("renders properly when profits is non-empty", async () => {
        render(
            <Profits userCommons={userCommonsFixtures.oneUserCommons[0]} commons={commonsFixtures.oneCommons[0]} profits={profitsFixtures.threeProfits} />
        );
           
        expect(await screen.findByTestId("ProfitsTable-cell-row-0-col-Amount")).toBeInTheDocument();
        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-Amount")).toHaveTextContent(/58.20/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-Amount")).toHaveTextContent(/54.60/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-Amount")).toHaveTextContent(/52.80/);

        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-date")).toHaveTextContent(/2023-05-15/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-date")).toHaveTextContent(/2023-05-16/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-date")).toHaveTextContent(/2023-05-17/);

        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-avgCowHealth")).toHaveTextContent(/97/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-avgCowHealth")).toHaveTextContent(/91/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-avgCowHealth")).toHaveTextContent(/88/);

        expect(screen.getByTestId("ProfitsTable-cell-row-0-col-numCows")).toHaveTextContent(/6/);
        expect(screen.getByTestId("ProfitsTable-cell-row-1-col-numCows")).toHaveTextContent(/6/);
        expect(screen.getByTestId("ProfitsTable-cell-row-2-col-numCows")).toHaveTextContent(/6/);
    });
});
