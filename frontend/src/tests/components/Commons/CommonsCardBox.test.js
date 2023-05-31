import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import CommonsCardBox from "main/components/Commons/CommonsCardBox";
import userCommonsFixtures from "fixtures/userCommonsFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("CommonsCardBox tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);
    const queryClient = new QueryClient();
    const oneUserCommons = userCommonsFixtures.oneUserCommons[0];

    beforeEach(() => {
        axiosMock.onGet("/api/usercommons/forcurrentuser", {
            params: { commonsId: oneUserCommons.id }
        }).reply(200, oneUserCommons);
    });

    test("renders with correct data", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsCardBox commons={oneUserCommons.commons} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText(oneUserCommons.commons.name)).toBeInTheDocument();
        expect(screen.getByTestId(`commons-card-box-${oneUserCommons.id}`)).toBeInTheDocument();
        expect(screen.getByText(`Total wealth: $${oneUserCommons.totalWealth}`)).toBeInTheDocument();
        expect(screen.getByText(`Owned cows: ${oneUserCommons.numOfCows}`)).toBeInTheDocument();
    });

    test("links button to correct commons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CommonsCardBox commons={oneUserCommons.commons} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const enterButton1 = screen.getByTestId("enter-common-1");
        expect(enterButton1).toBeInTheDocument();
        expect(enterButton1).toHaveAttribute('href', '/play/1')
    });
});
