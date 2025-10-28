import dbConnect from "@/lib/database";
import Product from "@/models/product";

export async function getStaticPaths() {
  await dbConnect();
  const products = await Product.find({}, "slug");
  const paths = products.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();
  if (!product) return { notFound: true };
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
    revalidate: 60, // ISR refresh every 60s
  };
}

export default function ProductPage({ product }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Inventory: {product.inventory}</p>
    </div>
  );
}
