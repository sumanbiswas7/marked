import { lightenHexColor } from "../lighten-hexcol";
import { describe, expect, it } from "vitest";

describe("lightenHexColor function", () => {
   it("should return null for an invalid hex color", () => {
      expect(lightenHexColor("#12345", 10)).toBeNull(); // Invalid hex color (not enough characters)
      expect(lightenHexColor("#GGG", 10)).toBeNull(); // Invalid hex color (contains non-hex characters)
      expect(lightenHexColor("123456", 10)).toBeNull(); // Missing '#' character
      expect(lightenHexColor("#1234567", 10)).toBeNull(); // Invalid hex color (too many characters)
   });

   it("should return the same color for percent 0", () => {
      expect(lightenHexColor("#FF5733", 0)).toBe("#ff5733"); // Should remain the same color
   });

   it("should return a lighter color for a positive percent", () => {
      expect(lightenHexColor("#0066CC", 50)).toBe("#80b3e6"); // 50% lighter
      expect(lightenHexColor("#00FF00", 25)).toBe("#40ff40"); // 25% lighter
   });
});
