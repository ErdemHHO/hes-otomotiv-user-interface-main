'use client';

import ProductCard from "@/components/productCard";
import SideMenu from "@/components/sideMenu";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getSearchRequest(query) {
  const res = await fetch(`https://server.hes-otomotiv.com/api/user/product/search/search?q=${query}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  return data;
}

async function getSeriData() {
  const res = await fetch('https://server.hes-otomotiv.com/api/user/series', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function Page() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : "";
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [seriData, setSeriData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [seriResponse, productResponse] = await Promise.all([
          getSeriData(),
          getSearchRequest(encodedSearchQuery)
        ]);

        setSeriData(seriResponse);
        console.log(seriResponse,"seriResponse:::")
        setProductData(productResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [encodedSearchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='icerik'>
      <div>
        <div className='mt-5'>
          <div className='container-fluid'>
            <div className='row'>
              <h1 className="text-center baslik-h1">
                {productData?.products ? (
                  `${productData.products.length} adet ürün bulundu.`
                ) : (
                  "Ürün bulunamadı."
                )}
              </h1>
              <div className="col-xl-3 text-center d-flex justify-content-center">
                <SideMenu data={seriData} />
              </div>
              <div className='col-xl-9'>
                <div className="product_card_container">
                  {productData?.products?.map(product => (
                    <ProductCard key={product._id} data={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
