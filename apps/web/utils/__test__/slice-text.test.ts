import { sliceText } from "../slice-text";
import { describe, it, expect } from "vitest";

describe("sliceText function", () => {
   it("should return null for null input", () => {
      expect(sliceText(null, 40, true)).toBeNull();
   });

   it("should return null for undefined input", () => {
      expect(sliceText(undefined, 40, true)).toBeNull();
   });

   it("should return the same string if it's shorter than maxLen", () => {
      expect(sliceText("Short text", 40, true)).toBe("Short text");
   });

   it("should add '...' to the end of a long string when threeDots is true", () => {
      expect(
         sliceText("This is a very long text that needs truncation", 40, true)
      ).toBe("This is a very long text that needs...");
   });

   it("should not add '...' to the end of a long string when threeDots is false", () => {
      expect(
         sliceText("This is a very long text that needs truncation", 40, false)
      ).toBe("This is a very long text that needs tr");
   });

   it("should not add '...' if maxLen is less than 3", () => {
      expect(sliceText("Short text", 2, true)).toBe("...");
   });

   it("should handle a string with no spaces by adding '...' to the end", () => {
      expect(sliceText("Nospacesinthisstring", 15, true)).toBe(
         "Nospacesinthis..."
      );
   });

   it("should handle a string with spaces by adding '...' after the last space", () => {
      expect(sliceText("This is a long sentence with spaces", 20, true)).toBe(
         "This is a long sentence..."
      );
   });

   it("should pad with spaces if no space is found before maxLen - 3", () => {
      expect(sliceText("ThisIsAVeryLongWord", 20, true)).toBe(
         "ThisIsAVeryLongWord..."
      );
   });
});
