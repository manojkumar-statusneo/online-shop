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
    const res = await fetch(`${path}/api/cat-products/${catId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
}
export async function getAddress(userId: string) {
  try {
    const res = await fetch(`${path}/api/address/${userId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    return error;
  }
}