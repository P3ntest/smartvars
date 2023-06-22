import { requestString } from "../../src";

describe("Function requestString", () => {
  it("should find strings when spelled correctly", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(requestString("TEST_STRING")).toEqual("Hello World");
  });

  it("should find strings when spelled with different case", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(requestString("test_string")).toEqual("Hello World");
  });

  it("should find strings when spelled with different spacers", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(requestString("TEST-STRING")).toEqual("Hello World");
    expect(requestString("TEST STRING")).toEqual("Hello World");
    expect(requestString("TEST.STRING")).toEqual("Hello World");
  });

  it("should find strings when spelled with different spacers and case", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(requestString("test-string")).toEqual("Hello World");
    expect(requestString("test string")).toEqual("Hello World");
    expect(requestString("test.string")).toEqual("Hello World");
  });

  it("should throw when variable is not found", () => {
    delete process.env["TEST_STRING"];
    expect(() => requestString("TEST_STRING")).toThrow();
  });

  it("should return the default value when variable is not found", () => {
    delete process.env["TEST_STRING"];
    expect(requestString("TEST_STRING", "Hello World")).toEqual("Hello World");
  });
});
