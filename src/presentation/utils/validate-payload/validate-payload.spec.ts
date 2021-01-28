import { ValidatePayloadUtil } from "./validate-payload";

interface SutTypes {
  sut: ValidatePayloadUtil;
}

const makeSut = (requiredFields: Array<string>): SutTypes => {
  const sut = new ValidatePayloadUtil(requiredFields);

  return {
    sut,
  };
};

describe("ValidatePayload Util", () => {
  describe("containsAllRequiredFields >> should be validate if not contains required fields in payload", () => {
    test("should returns true if payload is a not object", () => {
      const { sut } = makeSut(["resultCode", "message"]);

      expect(sut.setPayload("").containsAllRequiredFields()).toBe(false);
    });

    test("should returns true", () => {
      const { sut } = makeSut(["resultCode", "message"]);

      const testablePayload = {
        resultCode: 200,
        message: "any_message",
      };

      expect(sut.setPayload(testablePayload).containsAllRequiredFields()).toBe(
        true
      );
    });

    test("should returns false", () => {
      const { sut } = makeSut(["resultCode", "message"]);

      const testablePayload = {
        message: "any_message",
      };

      expect(sut.setPayload(testablePayload).containsAllRequiredFields()).toBe(
        false
      );
    });
  });

  describe("exibeInvalidFields >> should be returned an string with property names are missing", () => {
    test("should returns all required fields if payload is a not object", () => {
      const { sut } = makeSut(["resultCode", "message"]);

      expect(sut.setPayload("").exibeMissingFields()).toEqual([
        "resultCode",
        "message",
      ]);
    });

    test("should be returns resultCode property", () => {
      const { sut } = makeSut(["resultCode", "message"]);

      const testablePayload = {
        message: "any_message",
      };

      expect(sut.setPayload(testablePayload).exibeMissingFields()).toEqual([
        "resultCode",
      ]);
    });
  });
});