(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[224],{8799:function(e,s,n){Promise.resolve().then(n.bind(n,9476))},9476:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return u}});var c=n(9268);n(6006);var a=n(6008),t=n(5846),r=n.n(t),l=function(e){let{data:s,seri:n,araba:a,kategori:t}=e,l=s.categories;return(0,c.jsxs)("div",{className:"mt-5 text-center sideMenu",children:[(0,c.jsx)("ul",{className:"sideMenu1",children:l.map(e=>{let s="/urunler/".concat(e.slug);return s=!n||a||t?n&&a&&!t?"/urunler/".concat(n,"/").concat(a,"/").concat(e.slug):n&&a&&t?"/urunler/".concat(n,"/").concat(a,"/").concat(e.slug):"/urunler/".concat(e.slug):"/urunler/".concat(n,"/").concat(e.slug),(0,c.jsx)(r(),{href:s,children:(0,c.jsx)("li",{className:"list-group-item menuButton",children:e.name})},e._id)})}),(0,c.jsxs)("div",{className:"dropdown sideMenu2 d-lg-none ",children:[(0,c.jsx)(r(),{className:"btn btn-outline-dark",href:"/urunler",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:"KATEGORİ SE\xc7İNİZ"}),(0,c.jsx)("ul",{className:"dropdown-menu",children:l.map(e=>{let s="/urunler/".concat(e.slug);return s=!n||a||t?n&&a&&!t?"/urunler/".concat(n,"/").concat(a,"/").concat(e.slug):n&&a&&t?"/urunler/".concat(n,"/").concat(a,"/").concat(e.slug):"/urunler/".concat(e.slug):"/urunler/".concat(n,"/").concat(e.slug),(0,c.jsx)(r(),{href:s,children:(0,c.jsx)("li",{className:"dropdown-item",children:e.name})},e._id)})})]})]})},i=n(9171);async function d(e){let s=await fetch("https://server-hesotomotiv.net/api/user/product/search/search?q=".concat(e),{cache:"no-store",headers:{"Content-Type":"application/json"}}),n=await s.json();return n}async function o(){let e=await fetch("https://server-hesotomotiv.net/api/user/series",{cache:"no-store"});if(!e.ok)throw Error("Failed to fetch data");return e.json()}var u=async function(){var e,s;let n=(0,a.useSearchParams)(),t=n?n.get("q"):null,r=encodeURI(t||""),u=await o(),h=await d(r);return(0,c.jsx)("div",{className:"icerik",children:(0,c.jsx)("div",{children:(0,c.jsx)("div",{className:"mt-5",children:(0,c.jsx)("div",{className:"container-fluid",children:(0,c.jsxs)("div",{className:"row",children:[(0,c.jsx)("h1",{className:"text-center baslik-h1",children:h.products?"".concat(null===(e=h.products)||void 0===e?void 0:e.length," adet \xfcr\xfcn bulundu."):"\xdcr\xfcn bulunamadı."}),(0,c.jsx)("div",{className:"col-xl-3 text-center d-flex justify-content-center",children:(0,c.jsx)(l,{data:u})}),(0,c.jsx)("div",{className:"col-xl-9",children:(0,c.jsx)("div",{className:"product_card_container",children:null==h?void 0:null===(s=h.products)||void 0===s?void 0:s.map(e=>(0,c.jsx)(i.default,{data:e},e._id))})})]})})})})})}},9171:function(e,s,n){"use strict";n.r(s);var c=n(9268),a=n(6006),t=n(9768),r=n.n(t);n(6634);var l=n(2801),i=n(5846),d=n.n(i);s.default=function(e){let{data:s}=e,n={name:s.name,title:s.title,stockCode:s.stockCode,oemNumber:s.oemNumber,brand_id:s.brand_id.name,status:s.status,oldPrice:s.oldPrice,sellingPrice:s.sellingPrice,category_id:s.category_id,series_id:s.series_id,car_id:s.car_id,image:s.image_urls[0],slug:s.slug};return(0,a.useEffect)(()=>{r().init()},[]),(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"product_card","data-aos":"fade-up","data-aos-duration":"1000",children:[(0,c.jsx)("div",{className:"product_card__img p-2",children:(0,c.jsx)("img",{src:n.image,alt:n.title})}),(0,c.jsx)("h6",{className:"text-center mt-3",children:(0,c.jsx)("strong",{children:n.name.length>30?n.name.substring(0,30)+"...":n.name})}),(0,c.jsx)("div",{className:"product_card__info p-3",children:(0,c.jsxs)("ul",{children:[(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:"text-danger",children:"STOK KODU:"})," ",n.stockCode]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:"text-danger",children:"OEM NUMARASI:"})," ",n.oemNumber]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:"text-danger",children:"MARKA:"})," ",n.brand_id]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:"text-danger",children:"DURUM:"})," ",n.status?"SIFIR":"İKİNCİ EL"]})]})}),(0,c.jsx)("div",{className:"product_card__price",children:(0,c.jsxs)("span",{className:"price",children:[(0,c.jsxs)("del",{className:"text-secondary",children:[" ",n.oldPrice," ₺"]}),(0,c.jsxs)("span",{className:"text-success price",children:[" ",n.sellingPrice," ₺"]})]})}),(0,c.jsxs)("div",{className:"product_card__button d-flex justify-content-around ",children:[(0,c.jsx)(d(),{href:"https://api.whatsapp.com/send/?phone=%2B905322409058&text=Merhaba%21++".concat(n.stockCode,"+stok+kodlu+%C3%BCr%C3%BCn%C3%BCn%C3%BCz+hakk%C4%B1nda+bilgi+almak+istiyorum.&type=phone_number&app_absent=0"),target:"_blank",children:(0,c.jsxs)("div",{className:"product_card__button_whatsapp w-100",children:[(0,c.jsx)(l.xpo,{})," İletişim"]})}),(0,c.jsx)(d(),{href:"/".concat(n.slug),children:(0,c.jsxs)("div",{className:"product_card__button_detail w-100",children:[(0,c.jsx)(l.U41,{})," Detay G\xf6r"]})})]})]})})}},6008:function(e,s,n){e.exports=n(794)}},function(e){e.O(0,[296,194,515,531,769,744],function(){return e(e.s=8799)}),_N_E=e.O()}]);