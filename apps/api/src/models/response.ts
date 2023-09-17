export class HttpResponse {
   isError: boolean;
   status: number;
   message: string | null;
   data: unknown;

   constructor({ status, message, data, isError }: ConstructorType) {
      this.isError = isError || false;
      this.status = status || 500;
      this.message = message || null;
      this.data = data || null;
   }
}

/**
 * ------------------
 *       Types
 * ------------------
 */

type ConstructorType = {
   isError?: boolean;
   status?: number;
   message?: string | null;
   data?: any;
};
