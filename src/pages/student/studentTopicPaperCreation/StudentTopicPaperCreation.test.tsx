import { render, screen, fireEvent } from "@testing-library/react";
import { FormField } from "./TopicPaperCreation";

describe("student topic paper creation", () => {
  test("renders an input field for text data type in form field", () => {
    const field = {
      name: "Full Name",
      dataType: "văn bản",
      initialName: "full_name",
      note: "Enter your full name",
    };
    const updateJsonData = jest.fn();
    render(<FormField indx={0} field={field} updateJsonData={updateJsonData} />);
    const inputField = screen.getByTestId("text-field-input");
    fireEvent.change(inputField, { target: { value: "John Doe" } });
    expect(inputField).toBeInTheDocument();
    expect(updateJsonData).toHaveBeenCalledWith("full_name", "John Doe");
  });
});