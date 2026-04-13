'use client';

import React, { useState } from 'react';

const ProductDetailImages = ({ data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!data?.image_urls?.length) return null;

	const images = data.image_urls;

	const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
	const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

	return (
		<div>
			{/* Ana resim */}
			<div style={{ position: 'relative', textAlign: 'center' }}>
				<img
					src={images[currentIndex]}
					alt={`${data.title} - ${currentIndex + 1}`}
					style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }}
					loading="lazy"
				/>
				{images.length > 1 && (
					<>
						<button
							onClick={prev}
							style={btnStyle('left')}
							aria-label="Önceki"
						>
							&#8249;
						</button>
						<button
							onClick={next}
							style={btnStyle('right')}
							aria-label="Sonraki"
						>
							&#8250;
						</button>
					</>
				)}
				<div style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,0.4)', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>
					{currentIndex + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail'lar */}
			{images.length > 1 && (
				<div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
					{images.map((url, i) => (
						<img
							key={i}
							src={url}
							alt={`${data.title} - ${i + 1}`}
							onClick={() => setCurrentIndex(i)}
							loading="lazy"
							style={{
								width: 70,
								height: 70,
								objectFit: 'contain',
								cursor: 'pointer',
								border: i === currentIndex ? '2px solid #056DB4' : '2px solid transparent',
								borderRadius: 4,
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

function btnStyle(side) {
	return {
		position: 'absolute',
		top: '50%',
		[side]: 8,
		transform: 'translateY(-50%)',
		background: 'rgba(0,0,0,0.4)',
		color: '#fff',
		border: 'none',
		borderRadius: 4,
		fontSize: 32,
		lineHeight: 1,
		padding: '4px 10px',
		cursor: 'pointer',
		zIndex: 1,
	};
}

export default ProductDetailImages;
