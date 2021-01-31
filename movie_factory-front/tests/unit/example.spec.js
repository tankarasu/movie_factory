import { shallowMount } from "@vue/test-utils";

function say() {
  return "helloe";
}

describe("fonctionnement", () => {
  it('should return "helloe"', () => {
    expect(say()).toEqual("helloe");
  });
});
