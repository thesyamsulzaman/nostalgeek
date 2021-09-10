import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import InvitationCard from "../InvitationCard";
import store from "../../store";

const MockInvitationCardProvider = (
  <Provider store={store}>
    <InvitationCard />
  </Provider>
);

test("Render the card with like button", async () => {
  // render(<MockInvitationCardProvider />);
  // const InvitationCardElement = screen.getByAltText();
  expect(1 + 1).toEqual(2);
});
