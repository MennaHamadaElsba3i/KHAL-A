import { NextRequest, NextResponse } from "next/server";
import { mockServer } from "@/mocks/server";
import { ProductSchema } from "@/features/products/schemas/product.schema";
import { z } from "zod";

const ProductDetailResponseSchema = z.object({
  product: ProductSchema,
  relatedProducts: z.array(ProductSchema),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const delay = Number(searchParams.get("delay") || 0);
    const simError = searchParams.get("simError");

    const product = await mockServer.getProductBySlug(slug, {
      delay,
      simError,
    });

    if (!product) {
      return NextResponse.json(
        { error: `Fragrance with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    const relatedProducts = await mockServer.getRelatedProducts(slug, 3);

    const validated = ProductDetailResponseSchema.safeParse({
      product,
      relatedProducts,
    });

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Malformed product detail response",
          details: validated.error.format(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validated.data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load fragrance";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
