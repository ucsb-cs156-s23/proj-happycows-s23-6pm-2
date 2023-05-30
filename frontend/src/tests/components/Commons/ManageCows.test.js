import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ManageCows from "main/components/Commons/ManageCows"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("ManageCows tests", () => {
    test("renders without crashing", () => {
        render(
            <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={(userCommons) => { console.log("onBuy called:",userCommons); }} onSell={ (userCommons) => { console.log("onSell called:",userCommons); }} />
        );
    });

    test("buying and selling a cow", async () => {
        const mockBuy = jest.fn();
        const mockSell = jest.fn();

        render(
            <ManageCows userCommons = {userCommonsFixtures.oneUserCommons[0]} onBuy={mockBuy} onSell={mockSell} />
        );

        const buyButton = screen.getByTestId("buy-cow-button");
        const sellButton = screen.getByTestId("sell-cow-button");
        
        fireEvent.click(buyButton);
        await waitFor( ()=>expect(mockBuy).toHaveBeenCalled() );

        fireEvent.click(sellButton);
        await waitFor( ()=>expect(mockSell).toHaveBeenCalled() );
        
    });

    test("buying a herd of cows", async () => {
        const mockBuy = jest.fn();
        
        const userCommons = userCommonsFixtures.oneUserCommons[0];
        const commons = { cowPrice: 30 }; 
        
        render(
          <ManageCows
            userCommons={userCommons}
            commons={commons}
            onBuy={mockBuy}
          />
        );
      
        const buyHerdButton = screen.getByTestId("buy-herd-button");
        
        fireEvent.click(buyHerdButton);
        await screen.findByText("How many cows do you want to buy?");
        const cowPriceElements = screen.getByText('Cost: $60');
        expect(cowPriceElements).toBeInTheDocument();
        const numOfCowsInput = screen.getByTestId("buyHerdForm");
        fireEvent.change(numOfCowsInput, { target: { value: '5' } });
        expect(numOfCowsInput.value).toBe('5'); 
        const cowPriceElements2 = screen.getByText('Cost: $150');
        expect(cowPriceElements2).toBeInTheDocument();
        const buyModalButton = screen.getByText("Buy");
        
        fireEvent.click(buyModalButton);
      
        await waitFor(() => expect(mockBuy).toHaveBeenCalled());
        await waitFor(() => expect(screen.queryByTestId("buyHerdForm")).toBeNull());
      });
      
      

      test("closemodal test",async () => {
        const mockBuy = jest.fn();
      
        render(
          <ManageCows userCommons={userCommonsFixtures.oneUserCommons[0]} onBuy={mockBuy} />
        );
        await waitFor(() =>  expect(screen.queryByText("How many cows do you want to buy?")).not.toBeInTheDocument());

        const buyHerdButton = screen.getByTestId("buy-herd-button");
      
        fireEvent.click(buyHerdButton);
        await screen.findByText("How many cows do you want to buy?");
      
        const handleBuyHerdModalClose = screen.getByTestId("closemodalbutton");
      
        fireEvent.click(handleBuyHerdModalClose);
      
        await waitFor(() =>  expect(screen.queryByText("How many cows do you want to buy?")).not.toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId("buyHerdForm")).toBeNull());

      });
      
});