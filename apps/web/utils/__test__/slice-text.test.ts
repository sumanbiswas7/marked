import { sliceText } from "../slice-text";
import { describe, it, expect } from "vitest";

describe("sliceText function", () => {
   it("should return null for null or undefined input", () => {
      expect(sliceText(null, 40, true)).toBeNull();
      expect(sliceText(undefined, 40, true)).toBeNull();
   });

   it("should add ... for a input length 20 and keep the return length 20", () => {
      const LENGHT_28_INPUT = "hello this is a test alright";
      const res = sliceText(LENGHT_28_INPUT, 20, true);
      expect(res?.length).toBe(20);
      expect(res).toBe("hello this is a t...");
   });

   it("should return the sliced string and slice upto maxLength", () => {
      const LENGHT_28_INPUT = "hello this is a test alright";
      const res = sliceText(LENGHT_28_INPUT, 20, false);
      expect(res?.length).toBe(20);
      expect(res).toBe("hello this is a test");
   });
});
