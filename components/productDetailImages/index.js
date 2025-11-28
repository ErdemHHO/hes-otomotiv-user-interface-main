'use client';

import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductDetailImages = ({ data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const onSlide = (currentIndex) => {
		setCurrentIndex(currentIndex);
	};

	const newImages = data.image_urls.map((url) => ({
		original: url,
		thumbnail: url,
		originalAlt: data.title,
		originalTitle:data.title,
		originalWidth: 800,
		originalHeight: 600,
		loading:'lazy'
	}));

	return (
		<div>
			<ImageGallery
				items={newImages}
				startIndex={currentIndex}
				onSlide={onSlide}
				showIndex={true}
				showFullscreenButton={false}
				slideInterval={2000}
				slideOnThumbnailOver={true}
				autoPlay={true}
			/>
		</div>
	);
};

export default ProductDetailImages;
