import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  Clock3,
  Leaf,
  MapPin,
  Navigation,
  Snowflake,
  Sparkles,
  Trees,
} from "lucide-react";
import galleryData from "./gallery.json";
import "./home-journey.css";

type Language = "en" | "bn";
type GalleryPhoto = (typeof galleryData)[number];

const photoMap = new Map(galleryData.map((photo) => [photo.id, photo]));

function JourneyPhoto({
  id,
  sizes,
  className = "",
}: {
  id: string;
  sizes: string;
  className?: string;
}) {
  const photo = photoMap.get(id) as GalleryPhoto | undefined;
  if (!photo) return null;

  return (
    <Image
      className={className}
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      loading="lazy"
    />
  );
}

export function HomeEnvironmentPreview({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === "en" ? en : bn);

  return (
    <section className="hj-environment" aria-labelledby="hj-environment-title">
      <div className="hj-shell hj-environment-grid">
        <div className="hj-environment-copy">
          <p className="hj-kicker">
            <Leaf size={15} /> {t("CHOOSE YOUR CORNER", "আপনার পছন্দের পরিবেশ")}
          </p>
          <h2 id="hj-environment-title">
            {t("Open sky or cool indoors,", "খোলা আকাশ কিংবা শীতল ইনডোর,")}
            <em>{t("settle in your way.", "বসুন নিজের মতো।")}</em>
          </h2>
          <p>
            {t(
              "Green outdoor seating, a calm air-conditioned dining room and comfortable corners for family time—all in one place.",
              "সবুজ আউটডোর, শান্ত শীতাতপনিয়ন্ত্রিত ডাইনিং আর পরিবার নিয়ে বসার স্বস্তিদায়ক কোণ—সবই এক ঠিকানায়।",
            )}
          </p>
          <ul
            className="hj-feature-list"
            aria-label={t("Available spaces", "যে পরিবেশগুলো পাবেন")}
          >
            <li>
              <Trees size={18} />
              {t("Garden seating", "বাগানে খোলা বসার জায়গা")}
            </li>
            <li>
              <Snowflake size={18} />
              {t("Air-conditioned indoor", "শীতাতপনিয়ন্ত্রিত ইনডোর")}
            </li>
            <li>
              <Sparkles size={18} />
              {t("Day and evening ambience", "দিন ও রাতের আলাদা আবহ")}
            </li>
          </ul>
          <Link className="hj-cta" href="/spaces">
            {t("Explore our spaces", "পরিবেশ আরও দেখুন")}{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <Link
          className="hj-environment-collage"
          href="/spaces"
          aria-label={t(
            "See all Cafe Aronno spaces",
            "ক্যাফে অরণ্যের সব পরিবেশ দেখুন",
          )}
        >
          <figure className="hj-photo hj-photo-main">
            <JourneyPhoto
              id="aronno-029"
              sizes="(max-width: 760px) 92vw, 44vw"
            />
            <figcaption>{t("The garden walk", "সবুজ বাগানের পথ")}</figcaption>
          </figure>
          <figure className="hj-photo hj-photo-indoor">
            <JourneyPhoto
              id="aronno-019"
              sizes="(max-width: 760px) 42vw, 18vw"
            />
            <figcaption>{t("Indoor dining", "ইনডোর ডাইনিং")}</figcaption>
          </figure>
          <figure className="hj-photo hj-photo-patio">
            <JourneyPhoto
              id="aronno-001"
              sizes="(max-width: 760px) 42vw, 18vw"
            />
            <figcaption>{t("Open-air patio", "খোলা প্যাটিও")}</figcaption>
          </figure>
          <span className="hj-collage-link">
            {t("See the full space", "সম্পূর্ণ পরিবেশ দেখুন")}{" "}
            <ArrowUpRight size={17} />
          </span>
        </Link>
      </div>
    </section>
  );
}

export function HomeJourneyAfterVideo({ lang }: { lang: Language }) {
  const t = (en: string, bn: string) => (lang === "en" ? en : bn);

  return (
    <div className="hj-after-video">
      <section
        className="hj-gallery hj-shell"
        aria-labelledby="hj-gallery-title"
      >
        <header className="hj-section-heading">
          <div>
            <p className="hj-kicker">
              <Camera size={15} />
              {t("FROM THE ARONNO ALBUM", "অরণ্যের অ্যালবাম থেকে")}
            </p>
            <h2 id="hj-gallery-title">
              {t("Moments worth keeping.", "যে মুহূর্তগুলো থেকে যায়।")}
            </h2>
          </div>
          <Link className="hj-text-link" href="/gallery">
            {t("View the gallery", "সব ছবি দেখুন")} <ArrowUpRight size={18} />
          </Link>
        </header>

        <Link
          className="hj-gallery-grid"
          href="/gallery"
          aria-label={t(
            "Open the complete Cafe Aronno gallery",
            "ক্যাফে অরণ্যের সম্পূর্ণ গ্যালারি খুলুন",
          )}
        >
          <figure className="hj-gallery-wide">
            <JourneyPhoto
              id="aronno-106"
              sizes="(max-width: 760px) 92vw, 47vw"
            />
            <figcaption>
              {t(
                "Water lilies in the garden pond",
                "বাগানের জলাশয়ে শাপলার শান্ত সৌন্দর্য",
              )}
            </figcaption>
          </figure>
          <figure>
            <JourneyPhoto
              id="aronno-018"
              sizes="(max-width: 760px) 44vw, 22vw"
            />
            <figcaption>
              {t("The golden-wing photo corner", "সোনালি ডানার স্মৃতির কর্নার")}
            </figcaption>
          </figure>
          <figure>
            <JourneyPhoto
              id="aronno-120"
              sizes="(max-width: 760px) 44vw, 22vw"
            />
            <figcaption>
              {t("Warm details indoors", "ইনডোরের উষ্ণ সাজ")}
            </figcaption>
          </figure>
          <span className="hj-gallery-count">
            {t("See more photos & videos", "আরও ছবি ও ভিডিও দেখুন")}
            <ArrowUpRight size={17} />
          </span>
        </Link>
      </section>

      <div className="hj-feature-panels hj-shell">
        <Link className="hj-feature-card hj-celebrate" href="/celebrate">
          <JourneyPhoto id="aronno-028" sizes="(max-width: 760px) 92vw, 54vw" />
          <span className="hj-card-shade" />
          <span className="hj-card-content">
            <span className="hj-card-icon">
              <CalendarDays size={20} />
            </span>
            <small>{t("CELEBRATE AT ARONNO", "অরণ্যে আপনার আয়োজন")}</small>
            <strong>
              {t(
                "A beautiful setting for your special day.",
                "আপনার বিশেষ দিনের জন্য সুন্দর এক আয়োজন।",
              )}
            </strong>
            <span>
              {t(
                "Birthdays · Family gatherings · Get-togethers",
                "জন্মদিন · পারিবারিক মিলনমেলা · গেট-টুগেদার",
              )}
            </span>
            <b>
              {t("Plan an occasion", "আয়োজন দেখুন")} <ArrowUpRight size={18} />
            </b>
          </span>
        </Link>

        <Link className="hj-feature-card hj-visit" href="/visit">
          <JourneyPhoto id="aronno-002" sizes="(max-width: 760px) 92vw, 36vw" />
          <span className="hj-card-shade" />
          <span className="hj-card-content">
            <span className="hj-card-icon">
              <MapPin size={20} />
            </span>
            <small>{t("FIND CAFE ARONNO", "অরণ্যের ঠিকানা")}</small>
            <strong>
              {t(
                "Come by. We are in Kolarhat, Rajbari.",
                "চলে আসুন। আমরা কোলারহাট, রাজবাড়ীতে।",
              )}
            </strong>
            <span className="hj-visit-meta">
              <Navigation size={16} />
              {t("Directions & location", "লোকেশন ও পথনির্দেশনা")}
            </span>
            <span className="hj-visit-meta">
              <Clock3 size={16} />
              {t("Call before you leave", "রওনা হওয়ার আগে ফোন করুন")}
            </span>
            <b>
              {t("Plan your visit", "ভিজিটের তথ্য দেখুন")}{" "}
              <ArrowUpRight size={18} />
            </b>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function HomeJourney({ lang }: { lang: Language }) {
  return (
    <>
      <HomeEnvironmentPreview lang={lang} />
      <HomeJourneyAfterVideo lang={lang} />
    </>
  );
}
