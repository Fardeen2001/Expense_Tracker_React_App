import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";
import { Provider } from "react-redux";
import store from "../Store/store";

describe("AddExpense Form", () => {
  test("renders the AddExpenseForm component", () => {
    render(
      <Provider store={store}>
        <AddExpenseForm />
      </Provider>
    );

    const heading = screen.getByText("ADD YOUR EXPENSES HERE");
    expect(heading).toBeInTheDocument();

    const submitLabel = screen.getByText("Submit");
    expect(submitLabel).toBeInTheDocument();
  });
});
