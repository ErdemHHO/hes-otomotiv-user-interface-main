import React from 'react';
import ProductDetailImages from '@/components/productDetailImages';
import ProductDetailInfo from '@/components/productDetailInfo';
import Head from 'next/head';
import Metadata from 'next';

async function getProduct(urunDetay) {
	const productSlug = urunDetay;
	const res = await fetch(
		`https://server-hesotomotiv.net/api/user/product/${productSlug}`,
		{
			cache: 'no-store',
		}
	);
	return res.json();
}

export async function generateMetadata({ params: { urunDetay } }) {
	const data = await getProduct(urunDetay);

	return {
		description: data?.product?.title,
		title: data?.product?.title,
		openGraph: {
			images: [...data?.product?.image_urls[0]],
		},
	};
}

async function Page({ params: { urunDetay } }) {
	const data = await getProduct(urunDetay);

	return (
		<>
			<Head>
				<title>{data?.product?.title}</title>
				<link rel="icon" type="image/png" href={data?.product?.image_urls[0]} />
			</Head>
			<main className="icerik">
				<div className="container">
					<div className="row">
						<div className="col-xl-6">
							<ProductDetailImages data={data?.product} />
						</div>
						<div className="col-xl-6">
							<ProductDetailInfo data={data.product} />
						</div>
					</div>
				</div>
				{data?.product?.image_urls && (
					//ürün fotoğrafları
					<div className="container">
						<div className="row">
							{data?.product?.image_urls.map((image, index) => (
								<div className="col-6 col-md-4 col-lg-3" key={index}>
									<img
										src={image}
										alt={data?.product?.title}
										className="img-fluid imagesOpacity"
										width={100}
										height={100}
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
