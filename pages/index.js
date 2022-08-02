import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home({ data }) {
  const { navigation, title, intro, cards, lorem, footer, footerLinks } = data;

  const cardImages = [
    "akira-hojo-ZxGdri2EWzk-unsplash.jpg",
    "drew-beamer-Hk6E4UxjmGo-unsplash.jpg",
    "photoholgic--aNEDY_t-VM-unsplash.jpg",
    "pawel-czerwinski-OOFSqPWjCt0-unsplash.jpg",
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Solo Brands" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <header className={styles.header}>
          <Image
            src="/images/logo-solo-brands.png"
            alt={title}
            title={title}
            width="290"
            height="49"
            className={styles.logo}
          />

          <ul>
            {navigation.links.map((item, index) => {
              return (
                <li key={index}>
                  <Link href="#">{item}</Link>
                </li>
              );
            })}
          </ul>
        </header>
        <section className={styles["call-out"]}>
          <div className={styles["content-center"]}>
            <h1 className="text-6xl font-bold text-slate-200 capitalize">
              {title}
            </h1>
            <p className="text-xl">{intro}</p>
          </div>
        </section>
        <section className={styles.cards}>
          {cards.map((card, index) => {
            return (
              <div className={styles.card} key={index}>
                <div className={styles["image-container"]}>
                  <Image
                    src={`/images/${cardImages[index]}`}
                    alt={title}
                    title={title}
                    layout="responsive"
                    width="125"
                    height="100"
                    className={styles["card-image"]}
                  />
                </div>
                <div className={styles["card-body"]}>
                  <h2 className={styles["card-title"]}>{card.title}</h2>
                  <ul>
                    <li>Price: ${card.msrp.toFixed(2)}</li>
                    <li>Sale Price: ${card.salePrice.toFixed(2)}</li>
                  </ul>
                  <p className={styles["card-text"]}>{card.description}</p>
                </div>
              </div>
            );
          })}
        </section>
        <section className={styles.description}>
          <div className={styles["description-body"]}>
            <p>{lorem}</p>
          </div>
        </section>
        <footer className="footer">
          <p>{footer}</p>
          <ul>
            {footerLinks.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </footer>
      </>
    </div>
  );
}

export async function getServerSideProps() {
  // resourceArr: [
  //   "navigation",
  //   "title",
  //   "intro",
  //   "cards",
  //   "lorem",
  //   "footer",
  //   "footerLinks",
  // ],

  const arrToUse = [
    "cards",
    "lorem",
    "footer",
    "title",
    "footerLinks",
    "intro",
    "lorem",
    "cards",
    "footer",
    "footerLinks",
    "footer",
    "footerLinks",
    "navigation",
    "intro",
    "lorem",
    "footer",
    "title",
    "navigation",
    "cards",
    "footerLinks",
    "navigation",
    "intro",
    "navigation",
    "lorem",
    "intro",
    "title",
    "title",
    "cards",
  ];

  const params = [...new Set(arrToUse)];
  const filteredArr = {
    resourceArr: params
  }

  const res = await fetch(`http://localhost:3003/solo-brands`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(filteredArr),
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
