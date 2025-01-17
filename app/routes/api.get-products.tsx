import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { prisma } from "~/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Parse the request URL
    const url = new URL(request.url);

    // Access query parameters
    const idsParams: string|null = url.searchParams.get('ids'); 

    let ids: string[] = [];
    if (idsParams) {
        ids = idsParams.split(',')
    }

    try {
      const products = await prisma.product.findMany({ where : { id : { in: ids }}}); // Fetch all products from the database
      return json(products); // Return the products as JSON
    } catch (error) {
      return json({ error: 'Failed to fetch products' }, { status: 500 });
    }
  };