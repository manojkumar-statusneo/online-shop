const path = process.env.NEXT_PUBLIC_API_PATH;

export async function fetchProductDetail(productId: string) {
  try {
    const res = await fetch(`${path}/api/product/${productId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCatWiseProducts(catId: string) {
  try {
    const res = await fetch(`${path}/api/cat-products/products/bycatid/${catId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
}
