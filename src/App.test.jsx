import {render, screen, fireEvent ,cleanup} from "@testing-library/react";
import { describe, it, expect, beforeEach} from "vitest";
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
    render(<App/>);;
});

//Test 01: Search Filters by the entered text
it("filters properties correctly when a location is typed" ,() => {
    const searchInput = screen.getByPlaceholderText(/e. g. BR5 or London/i);
    fireEvent.change(searchInput, { target: {value:"Colombo"} });

    //After typing Colombo, Only Colombo properties should remain
    const propertyCards = screen.queryAllByRole("heading", {level:3});
    propertyCards.forEach(card => {
        expect(card.textContent).not.toMatch(/Kandy/i);
    });
});

//Test 02 : Price filters accordingly
it("filters properties based on minimum price input" ,() => {
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














    