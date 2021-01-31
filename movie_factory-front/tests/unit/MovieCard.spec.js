import { render, fireEvent } from "@testing-library/vue";
import MovieCard from "../../src/components/MovieCard.vue";

test("short title should not be truncated", async () => {
  const { getByText, container } = render(MovieCard, {
    props: {
      title: "titre",
      description: "describe",
      vote: "3",
      path: "/123",
      film: "film",
      isActive: true,
    },
  });
  let title = container.querySelector(".card-title");
  expect(title.textContent.trim()).toStrictEqual("titre");
});

test("long title with at least 20 characters should be truncated", async () => {
  const { getByText, container } = render(MovieCard, {
    props: {
      title: "titre super et tres tres tres tres long",
      description: "describe",
      vote: "3",
      path: "/123",
      film: "film",
      isActive: true,
    },
  });
  let title = container.querySelector(".card-title");
  expect(title.textContent.trim()).toStrictEqual("titre super et tres ...");
});

//"title", "description", "vote", "path", "film", "isActive"
// card-title
