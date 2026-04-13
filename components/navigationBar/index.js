import React from 'react';
import { FaHome } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { SITE_URL, buildBreadcrumbJsonLd } from '@/lib/seo';

function NavigationBar({ seri, araba, kategori }) {
  const breadcrumbItems = [
    { name: 'Ana Sayfa', url: SITE_URL },
    { name: 'Ürünler', url: `${SITE_URL}/urunler` },
  ];

  if (seri) {
    breadcrumbItems.push({ name: seri.seri.name, url: `${SITE_URL}/urunler/${seri.seri.slug}` });
  }
  if (seri && araba) {
    breadcrumbItems.push({ name: araba.car.name, url: `${SITE_URL}/urunler/${seri.seri.slug}/${araba.car.slug}` });
  }
  if (seri && araba && kategori) {
    breadcrumbItems.push({ name: kategori.category.name, url: `${SITE_URL}/urunler/${seri.seri.slug}/${araba.car.slug}/${kategori.category.slug}` });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)) }}
      />
      <div className='container-fluid d-none d-md-flex bg-light text-center justify-content-center '>
        <Link href="/" className="text-decoration-none text-dark">
          <span>
            <FaHome size={32} className="m-1" />
          </span>
        </Link>
        <BsArrowRight size={32} className="m-1" />
        <Link href="/urunler" className="text-decoration-none text-dark pt-1 m-1 navigation-link">
          <span>
            <strong>Ürünler</strong>
          </span>
        </Link>
        {seri && (
          <Link href={`/urunler/${seri.seri.slug}`} className="text-decoration-none text-dark ">
            <BsArrowRight size={32} className="m-1 " />
            <span className='navigation-link'><strong>{seri.seri.name}</strong></span>
          </Link>
        )}
        {seri && araba && (
          <Link href={`/urunler/${seri.seri.slug}/${araba.car.slug}`} className="text-decoration-none text-dark ">
            <BsArrowRight size={32} className="m-1 " />
            <span className='navigation-link'><strong>{araba.car.name}</strong></span>
          </Link>
        )}
        {seri && araba && kategori && (
          <Link href={`/urunler/${seri.seri.slug}/${araba.car.slug}/${kategori.category.slug}`} className="text-decoration-none text-dark">
            <BsArrowRight size={32} className="m-1" />
            <span className='navigation-link'><strong>{kategori.category.name}</strong></span>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavigationBar;
