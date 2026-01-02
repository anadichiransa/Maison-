import {render, screen, fireEvent ,cleanup} from "@testing-library/react";
import { describe, it, expect, beforeEach} from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe ("Maison function tests" , () => {

    beforeEach(() => {
        render(<App/>);
    });

    //Search Filtering by text
    it("Filters properties correctly when user typed the location", () => {
        const searchInput = screen.getAllByPlaceholderText(/e. g. Colombo/i);
        fireEvent.change(searchInput, { target: {value: "Colombo"} });

        //Once user typed the colombo, Only Colombo prperties will remain
        const propertyCards = screen.queryAllByRole("heading", {level:3});
        propertyCards.forEach(card => {
            expect(card.textContent).not.toMatch(/Kandy/i);
        });
    });

});

    