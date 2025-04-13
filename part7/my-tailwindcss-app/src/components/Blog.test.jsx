import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "test",
    author: "root",
    url: "http://example.com",
    likes: "2",
    user: {
      username: "Root",
    },
  };
  const testUser = {
    username: "Root",
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} user={testUser} />).container;
  });

  test("renders blog", async () => {
    await screen.findAllByText("test root");
  });

  test("at start the details are not display", async () => {
    const div = container.querySelector(".details");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, details are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const div = container.querySelector(".details");
    expect(div).not.toHaveStyle("display: none");
  });
});

test("clicking twice the like button", async () => {
  const blog = {
    title: "test",
    author: "root",
    url: "http://example.com",
    likes: "2",
    user: {
      username: "Root",
    },
  };
  const testUser = {
    username: "Root",
  };
  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={testUser} addLike={mockHandler} />);

  const user = userEvent.setup();
  let button = screen.getByText("show");
  await user.click(button);
  button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
