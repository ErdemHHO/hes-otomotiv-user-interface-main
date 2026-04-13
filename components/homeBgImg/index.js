import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import Link from 'next/link';

function HomeBgImg() {
  return (
    <div className={styles.main}>
      <div className="container-fluid d-none d-xl-flex">
        <div className="row">
          <div className="col-xl-6">
            <Image
              src="/images/logos/HES-OTOMOTIV-LOGO1.png"
              alt="HES OTOMOTİV Logo"
              className={styles.hesLogo1}
              width={400}
              height={200}
              priority
            />
          </div>
          <div className={`${styles.baslik} col-xl-6`}>
            <h5 className="text-decoration-underline">
              <strong>BMW MINI COOPER YEDEK PARÇALARI</strong>
            </h5>
            <h5 className="text-primary">
              <Link href="tel:+905322409058" target="_blank">
                <FaPhoneAlt className={styles.icon} />
                +90 0532 240 90 58
              </Link>
            </h5>
          </div>
        </div>
      </div>
      <div className={`${styles.home} d-none d-xl-flex`}>
        <Image
          src="/images/logos/bmwpng.png"
          alt="BMW"
          className={styles.bmwCar}
          width={600}
          height={400}
          priority
        />
      </div>
    </div>
  );
}

export default HomeBgImg;
