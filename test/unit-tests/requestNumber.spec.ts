import { requestNumber } from "../../src";

describe("Function requestNumber", () => {
  it("should find numbers when spelled correctly", () => {
    process.env["TEST_NUMBER"] = "123";
    expect(requestNumber("TEST_NUMBER")).toEqual(123);
  });

  it("should find numbers when spelled with different case", () => {
    process.env["TEST_NUMBER"] = "123";
    expect(requestNumber("test_number")).toEqual(123);
  });

  it("should find numbers when spelled with different spacers", () => {
    process.env["TEST_NUMBER"] = "123";
    expect(requestNumber("TEST-NUMBER")).toEqual(123);
    expect(requestNumber("TEST NUMBER")).toEqual(123);
    expect(requestNumber("TEST.NUMBER")).toEqual(123);
  });

  it("should find numbers when spelled with different spacers and case", () => {
    process.env["TEST_NUMBER"] = "123";
    expect(requestNumber("test-number")).toEqual(123);
    expect(requestNumber("test number")).toEqual(123);
    expect(requestNumber("test.number")).toEqual(123);
  });

  it("should throw when variable is not found", () => {
    delete process.env["TEST_NUMBER"];
    expect(() => requestNumber("TEST_NUMBER")).toThrow();
  });

  it("should throw when variable is not a number", () => {
    process.env["TEST_NUMBER"] = "not a number";
    expect(() => requestNumber("TEST_NUMBER")).toThrow();
  });

  it("should return the default value when variable is not found", () => {
    delete process.env["TEST_NUMBER"];
    expect(requestNumber("TEST_NUMBER", 123)).toEqual(123);

    process.env["TEST_NUMBER"] = "";
    expect(requestNumber("TEST_NUMBER", 123)).toEqual(123);
  });

  it("should throw when default is provided but existing value is invalid", () => {
    process.env["TEST_NUMBER"] = "not a number";
    expect(() => requestNumber("TEST_NUMBER", 123)).toThrow();
  });
});
