import { db } from "../db/sqlite";

export async function sqlQuery(query: string): Promise<any> {
  // ⚠️ Raw queries can be dangerous. Use with care.
  try {
    const result = await db.$queryRawUnsafe(query);
    return result;
  } catch (err: any) {
    throw new Error(`SQL error: ${err.message}`);
  }
}
