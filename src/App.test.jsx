import {render, screen, fireEvent ,cleanup} from "@testing-library/react";
import { describe, it, expect, beforeEach} from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe ("Maison function tests" , () => {

    beforeEach(() => {
        render(<App/>);
    });

    //Test - 01: Search Filtering by text
    it("Filters properties correctly when typed the location", () => {
        const searchInput = screen.getByPlaceholderText(/e. g. Colombo/i);
        fireEvent.change(searchInput, { target: {value: "Colombo"} });

        //Once user typed the colombo, Only Colombo prperties will remain
        const propertyCards = screen.queryAllByRole("heading", {level:3});
        propertyCards.forEach(card => {
            expect(card.textContent).not.toMatch(/Kandy/i);
        });
    });

    //Test - 02: Price Filtering 
    it("Filters properties based on entered minimum price input", () => {
        const minPriceInput = screen.getByPlaceholderText(/Min Price/i);

        //Setting high min price which will hide cheap properties
        fireEvent.change(minPriceInput, { target: {value: "100000000" } });

        //Check whether properties below 100M are hidden
        const priceElements = screen.queryAllByText(/\$/);
        priceElements.forEach(price => {
            const numericPrice = parseInt(price.textContent.replace(/[^0-9]/g, ''));
            expect(numericPrice).toBeGreaterThanOrEqual(100000000);
        });
    });

});

    