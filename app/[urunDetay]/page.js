import Image from 'next/image';
import ProductDetailImages from '@/components/productDetailImages';
import ProductDetailInfo from '@/components/productDetailInfo';
import { buildMetadata, buildProductJsonLd } from '@/lib/seo';

async function getProduct(urunDetay) {
	const res = await fetch(
		`https://server.hes-otomotiv.com/api/user/product/${urunDetay}`,
		{ cache: 'no-store' }
	);
	return res.json();
}

export async function generateMetadata({ params: { urunDetay } }) {
	const data = await getProduct(urunDetay);
	const product = data?.product;

	if (!product) return { title: 'Ürün Bulunamadı' };

	return buildMetadata({
		title: product.title,
		description: `${product.title} - OEM No: ${product.oemNumber} - Marka: ${product.brand_id?.name ?? ''}. BMW ve MINI için orijinal yedek parça. Stok Kodu: ${product.stockCode}`,
		keywords: [
			product.title,
			product.oemNumber,
			product.brand_id?.name,
			'BMW yedek parça',
			'MINI yedek parça',
			'orijinal yedek parça',
			product.stockCode,
		].filter(Boolean),
		path: `/${urunDetay}`,
		image: product.image_urls?.[0],
	});
}

async function Page({ params: { urunDetay } }) {
	const data = await getProduct(urunDetay);
	const product = data?.product;

	return (
		<>
			{product && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(buildProductJsonLd(product, urunDetay)),
					}}
				/>
			)}
			<main className="icerik">
				<div className="container">
					<div className="row">
						<div className="col-xl-6">
							<ProductDetailImages data={product} />
						</div>
						<div className="col-xl-6">
							<ProductDetailInfo data={product} />
						</div>
					</div>
				</div>
				{product?.image_urls && (
					<div className="container">
						<div className="row">
							{product.image_urls.map((image, index) => (
								<div className="col-6 col-md-4 col-lg-3" key={index}>
									<Image
										src={image}
										alt={`${product.title} - Görsel ${index + 1}`}
										className="img-fluid imagesOpacity"
										width={400}
										height={400}
										style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</main>
		</>
	);
}

export default Page;
