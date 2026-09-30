import { NextRequest, NextResponse } from "next/server";
import { mockServer } from "@/mocks/server";
import { HomeApiResponseSchema } from "@/features/home/schemas/home.schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const delay = Number(searchParams.get("delay") || 0);
    const simError = searchParams.get("simError");

    const data = await mockServer.getHome({ delay, simError });
    const validated = HomeApiResponseSchema.safeParse(data);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Malformed home data", details: validated.error.format() },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load home data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
