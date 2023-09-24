import { describe, it, expect } from "vitest";
import { truncateEmail } from "../slice-email";

describe("truncateEmail function", () => {
   it("should return the email as is if it is shorter than the specified length", () => {
      const email = "johndoe@gmail.com";
      const length = 20;
      expect(truncateEmail(email, length)).toBe(email);
   });

   it('should truncate the email username and add "..." before "@" if it exceeds the specified length', () => {
      const email = "johndoe1234567890@gmail.com";
      const res = truncateEmail(email, 20);
      expect(res?.length).toBe(20);
      expect(res).toBe("johndoe...@gmail.com");
   });
});
