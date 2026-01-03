import {render, screen, fireEvent ,cleanup} from "@testing-library/react";
import { describe, it, expect, beforeEach, vi} from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("Maison Function Testing" , () => {

    //block "mocks" the fetch call to avoid the URL error
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json:() => Promise.resolve({
                properties: [
                    { id: "prop1", type: "House", price: 85000000, location:"Colombo", bedrooms: 4, added: {month:"Jan",day:1,year:2026} },
                    { id: "prop2", type:"Flat",price:35000000,location: "Kandy", bedrooms:2, added: {month:"Jan", day:1, year:2026}}
                ]
            }),
        })
    );


beforeEach(() => {
    render(<App />);
});

//Test 01: Search Filters by the entered text
it("filters properties correctly when a location is typed" ,  async() => {
    const searchInput = screen.getByPlaceholderText(/e. g. Colombo/i);
    fireEvent.change(searchInput, { target: {value:"Colombo"} });

    //After typing Colombo, Only Colombo properties should remain
    const propertyCards = await screen.findAllByRole("heading", {level:3});
    propertyCards.forEach(card => {
        expect(card.textContent).not.toMatch(/Kandy/i);
    });
});

//Test 02 : Price filters accordingly
it("filters properties based on minimum price input" , async () => {
    const minPriceInput = screen.getByPlaceholderText(/Min Price/i);

    //Setting hign min price which will hide the cheap properties
    fireEvent.change(minPriceInput, {target: {value: "100000000"} });

    //Check whether properties below 100M are hidden
    const priceElements = screen.queryAllByText(/\$/);
    priceElements.forEach(price => {
        const numericPrice = parseInt(price.textContent.replace(/[^0-9]/g, " "));
        expect(numericPrice).toBeGreaterThanOrEqual(100000000);
    });
});

//Test 03: Adding to Favorite section
it("Adds property to favorites section once clicked on button", async () => {
    const addButtons = await screen.findAllByText(/Add to the Fav/i);
    fireEvent.click(addButtons[0]);

    const favHeading = screen.getByRole("heading", {name : /^Favorites$/i, level: 2 });
    const favSection = favHeading.closest("div");

    expect(favSection).not.toHaveTextContent(/Drag properties here/i);
});

//Test 04: Prevents adding duplications
it("Prevents adding the same property to facorites section twice", async () => {
    window.alert = vi.fn();

    const addButtons = await screen.findAllByText(/Add to the Fav/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);

    expect(window.alert).toHaveBeenCalledWith("Property is already in your favorites!");
});

//Test 05:Clear all favorites
it("Clears all favorites once 'Clear All' button is clicked", async () => {
    
    //Add an item
    const addButtons = await screen.findAllByText(/Add to the Fav/i);
    fireEvent.click(addButtons[0]);

    //Mock confirmation dialog
    window.confirm = vi.fn(() =>  true);

    //Click Clear All
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);

    expect(screen.getByText(/Drag properties here to save them!/i)).toBeInTheDocument();
});
});
