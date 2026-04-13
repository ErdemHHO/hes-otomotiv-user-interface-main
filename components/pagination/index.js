'use client';

import { Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

function PaginationInner({ currentPage, totalPages, total, limit }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	if (!totalPages || totalPages <= 1) return null;

	const goToPage = (page) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page);
		router.push(`${pathname}?${params.toString()}`);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const getPageNumbers = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const pageNumbers = getPageNumbers();
	const startItem = (currentPage - 1) * limit + 1;
	const endItem = Math.min(currentPage * limit, total);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.resultInfo}>
				<span>
					<strong>{startItem}–{endItem}</strong> / <strong>{total}</strong> ürün gösteriliyor
				</span>
			</div>

			<nav aria-label="Sayfa navigasyonu">
				<ul className={`pagination ${styles.pagination}`}>
					<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
						<button
							className={`page-link ${styles.pageLink}`}
							onClick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="Önceki sayfa"
						>
							<span aria-hidden="true">&#8592;</span>
							<span className={styles.btnText}>Önceki</span>
						</button>
					</li>

					{pageNumbers.map((page, index) =>
						page === '...' ? (
							<li key={`dots-${index}`} className="page-item disabled d-none d-md-block">
								<span className={`page-link ${styles.pageLink} ${styles.dots}`}>
									&#8230;
								</span>
							</li>
						) : (
							<li
								key={page}
								className={`page-item d-none d-md-block ${currentPage === page ? 'active' : ''}`}
							>
								<button
									className={`page-link ${styles.pageLink} ${currentPage === page ? styles.activePage : ''}`}
									onClick={() => goToPage(page)}
								>
									{page}
								</button>
							</li>
						)
					)}

					<li className="page-item d-md-none">
						<span className={`page-link ${styles.pageLink} ${styles.dots}`}>
							{currentPage} / {totalPages}
						</span>
					</li>

					<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
						<button
							className={`page-link ${styles.pageLink}`}
							onClick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages}
							aria-label="Sonraki sayfa"
						>
							<span className={styles.btnText}>Sonraki</span>
							<span aria-hidden="true">&#8594;</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default function Pagination(props) {
	return (
		<Suspense fallback={null}>
			<PaginationInner {...props} />
		</Suspense>
	);
}
