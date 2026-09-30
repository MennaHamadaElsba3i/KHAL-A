import { NextRequest, NextResponse } from "next/server";
import { mockServer } from "@/mocks/server";
import { CategoriesResponseSchema } from "@/features/categories/schemas/category.schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const delay = Number(searchParams.get("delay") || 0);
    const simError = searchParams.get("simError");

    const categories = await mockServer.getCategories({ delay, simError });
    const validated = CategoriesResponseSchema.safeParse(categories);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Malformed categories response",
          details: validated.error.format(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load categories";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
