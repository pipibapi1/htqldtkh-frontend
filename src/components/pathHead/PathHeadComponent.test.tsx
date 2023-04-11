import { render, screen } from "@testing-library/react"
import PathHead from "."

describe("test PathHead Components", () => {
    test("path head renders correctly", () => {   
        render(<PathHead path="QUẢN LÝ ĐỀ TÀI / Đề tài / Giấy tờ liên quan"/>);
        const textElement = screen.getByText("QUẢN LÝ ĐỀ TÀI / Đề tài / Giấy tờ liên quan");
        expect(textElement).toBeInTheDocument();
    })
})