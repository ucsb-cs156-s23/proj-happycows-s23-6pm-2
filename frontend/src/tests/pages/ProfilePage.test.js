import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import ProfilePage from "main/pages/ProfilePage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import userCommonsFixtures from "fixtures/userCommonsFixtures";

describe("ProfilePage tests", () => {
    const queryClient = new QueryClient();
    const axiosMock = new AxiosMockAdapter(axios);
    const oneUserCommons = userCommonsFixtures.oneUserCommons[0];

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);

        axiosMock.onGet("/api/usercommons/forcurrentuser", {
            params: { commonsId: oneUserCommons.id }
        }).reply(200, oneUserCommons);
    });

    test("renders correctly for regular logged in user", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Phillip Conrad")).toBeInTheDocument();
        expect(screen.getByText("pconrad.cis@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("MyCommon")).toBeInTheDocument();
        expect(screen.getByTestId(`commons-card-box-${oneUserCommons.id}`)).toBeInTheDocument();
    });

    test("renders correctly for admin user from UCSB", async () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ProfilePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Phillip Conrad")).toBeInTheDocument();
        expect(screen.getByText("phtcon@ucsb.edu")).toBeInTheDocument();
        expect(screen.getByTestId("role-badge-user")).toBeInTheDocument();
        expect(screen.getByTestId("role-badge-member")).toBeInTheDocument();
        expect(screen.getByTestId("role-badge-admin")).toBeInTheDocument();
        expect(screen.getByText("MyCommon")).toBeInTheDocument();
        expect(screen.getByTestId(`commons-card-box-${oneUserCommons.id}`)).toBeInTheDocument();
    });
});
