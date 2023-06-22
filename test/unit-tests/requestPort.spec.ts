import { requestPort } from "../../src";

describe("Function requestPort", () => {
  it("should find ports when spelled correctly", () => {
    process.env["TEST_PORT"] = "25565";
    expect(requestPort("TEST_PORT")).toEqual(25565);
  });

  it("should find ports when spelled with different case", () => {
    process.env["TEST_PORT"] = "25565";
    expect(requestPort("test_port")).toEqual(25565);
  });

  it("should find ports when spelled with different spacers", () => {
    process.env["TEST_PORT"] = "25565";
    expect(requestPort("TEST-PORT")).toEqual(25565);
    expect(requestPort("TEST PORT")).toEqual(25565);
    expect(requestPort("TEST.PORT")).toEqual(25565);
  });

  it("should find ports when spelled with different spacers and case", () => {
    process.env["TEST_PORT"] = "25565";
    expect(requestPort("test-port")).toEqual(25565);
    expect(requestPort("test port")).toEqual(25565);
    expect(requestPort("test.port")).toEqual(25565);
  });

  it("should throw when variable is not found", () => {
    delete process.env["TEST_PORT"];
    expect(() => requestPort("TEST_PORT")).toThrow();
  });

  it("should throw when variable is not a number", () => {
    process.env["TEST_PORT"] = "not a number";
    expect(() => requestPort("TEST_PORT")).toThrow();
  });

  it("should throw when variable is not a valid port", () => {
    process.env["TEST_PORT"] = "65536";
    expect(() => requestPort("TEST_PORT")).toThrow();
    process.env["TEST_PORT"] = "0";
    expect(() => requestPort("TEST_PORT")).toThrow();
  });
});
