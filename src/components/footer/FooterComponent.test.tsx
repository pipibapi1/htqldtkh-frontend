import { render, screen } from "@testing-library/react";

import Footer from ".";

describe("test Footer Components", () => {
    test("footer component renders correctly", () => {
        render(<Footer />);
        const textElement = screen.getByText('ĐẠI HỌC BÁCH KHOA TP.HCM');
        expect(textElement).toBeInTheDocument();
    });
});