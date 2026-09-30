import { NextRequest, NextResponse } from "next/server";
import { mockServer } from "@/mocks/server";
import {
  ProductQueryParamsSchema,
  PaginatedProductsResponseSchema,
} from "@/features/products/schemas/product.schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse and validate query parameters
    const queryParamsRaw = {
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      family: searchParams.get("family") ?? undefined,
      mood: searchParams.get("mood") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
      minPrice: searchParams.get("minPrice") ?? undefined,
      maxPrice: searchParams.get("maxPrice") ?? undefined,
    };

    const parsedParams = ProductQueryParamsSchema.safeParse(queryParamsRaw);
    if (!parsedParams.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: parsedParams.error.format(),
        },
        { status: 400 }
      );
    }

    const delay = Number(searchParams.get("delay") || 0);
    const simError = searchParams.get("simError");

    const data = await mockServer.getProducts(parsedParams.data, {
      delay,
      simError,
    });

    const validated = PaginatedProductsResponseSchema.safeParse(data);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Malformed products response",
          details: validated.error.format(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
