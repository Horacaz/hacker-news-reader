/// <reference types="cypress" />
import latestStories from "../fixtures/latestStories.json";
import stories from "../fixtures/stories.json";
const latestStoriesCodes = Object.keys(latestStories);

describe("Hacker News Reader", () => {
  it("Should render a list of stories", () => {
    cy.visit("http://localhost:5173");
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/topstories.json/*",
      latestStories,
    );

    latestStoriesCodes.forEach((storyId, index) => {
      cy.intercept(
        "GET",
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
        stories[index],
      );
    });

    const firstStory = stories[0];
    cy.get("h1").should("have.text", "Uizard Hackernews Quest");
    cy.get(`a[href="${firstStory.url}"]`).should("have.text", firstStory.title);
  });
});
