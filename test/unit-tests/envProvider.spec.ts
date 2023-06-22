import { EnvProvider } from "../../src/providers/env";

describe("Environment Vars Provider", () => {
  const provider = EnvProvider;

  const getter = provider.getVar;

  it("should find strings when spelled correctly", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(getter("TEST_STRING")).toEqual("Hello World");
  });

  it("should find strings when spelled with different case", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(getter("test_string")).toEqual("Hello World");
  });

  it("should find strings when spelled with different spacers", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(getter("TEST-STRING")).toEqual("Hello World");
    expect(getter("TEST STRING")).toEqual("Hello World");
    expect(getter("TEST.STRING")).toEqual("Hello World");
  });

  it("should find strings when spelled with different spacers and case", () => {
    process.env["TEST_STRING"] = "Hello World";
    expect(getter("test-string")).toEqual("Hello World");
    expect(getter("test string")).toEqual("Hello World");
    expect(getter("test.string")).toEqual("Hello World");
  });

  it("should return undefined when variable is not found", () => {
    delete process.env["TEST_STRING"];
    expect(getter("TEST_STRING")).toBeUndefined();
  });

  it("should return a var if not spelled conventionally", () => {
    process.env["test.string"] = "Hello World";
    expect(getter("test.string")).toEqual("Hello World");
  });
});
