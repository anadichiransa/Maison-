import {render, screen, fireEvent ,cleanup} from "@testing-library/react";
import { describe, it, expect, beforeEach} from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("Maison Function Testing" , () => {

    //block "mocks" the fetch call to avoid the URL error
    global.fetch = vi.fn() =>
        Promise.resolve({
            json:() => Promise.resolve({
                properties: [
                    { id: "prop1", type: "House", price: 85000000, location:"Colombo", bedrooms: 4, added: {month:"Jan",day:1,year:2026} },
                    { id: "prop2", type:"Flat",price:35000000,location: "Kandy", bedrooms:2, added: {month:"Jan", day:1, year:2026}}
                ]
            }),
        })
    );

    


    