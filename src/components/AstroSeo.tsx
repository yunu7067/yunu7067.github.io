export type OpeningHoursSpecification = {
  opens: string;
  closes: string;
  dayOfWeek: string | string[];
  validFrom?: string;
  validThrough?: string;
};

export type Offer = {
  priceSpecification: PriceSpecification;
  itemOffered: Service;
};

export type PriceSpecification = {
  type: string;
  priceCurrency: string;
  price: string;
};

export type Service = {
  name: string;
  description: string;
};

export type Geo = {
  latitude: string;
  longitude: string;
};

export type GeoCircle = {
  geoMidpoint: Geo;
  geoRadius: string;
};

export type Action = {
  actionName: string;
  actionType: string;
  target: string;
};

export interface Person {
  name: string;
}
export interface Answer {
  text: string;
  dateCreated?: string;
  upvoteCount?: number;
  url?: string;
  author?: Person;
}

export interface Question {
  name: string;
  answerCount: number;
  acceptedAnswer?: Answer;
  suggestedAnswer?: Answer[];
  text?: string;
  author?: Person;
  upvoteCount?: number;
  dateCreated?: string;
}

export interface Instruction {
  name?: string;
  text: string;
  url?: string;
  image?: string;
}
export interface Performer {
  name: string;
}

export interface Location {
  name: string;
  address: Address;
  sameAs?: string;
}
export interface ContactPoint {
  contactType: string;
  telephone: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}
export interface CreativeWork {
  author: string;
  about: string;
  name: string;
  datePublished: string;
  audience?: string;
  keywords?: string;
  thumbnailUrl?: string;
  image?: string;
}

export interface Producer {
  name: string;
  url?: string;
}
export interface ContactPoint {
  contactType: string;
  telephone: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}

export interface Question {
  questionName: string;
  acceptedAnswerText: string;
}
export interface Provider {
  type?: 'Organization' | 'Person';
  name: string;
  url?: string;
}
export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface OpenGraphMedia {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
}

export interface Video {
  name: string;
  description: string;
  thumbnailUrls: string[];
  uploadDate: string;
  contentUrl?: string;
  duration?: string;
  embedUrl?: string;
  expires?: string;
  hasPart?: Clip | Clip[];
  watchCount?: number;
  publication?: BroadcastEvent | BroadcastEvent[];
  regionsAllowed?: string | string[];
}

export interface Clip {
  name: string;
  startOffset: number;
  url: string;
}

export interface BroadcastEvent {
  name?: string;
  isLiveBroadcast: boolean;
  startDate: string;
  endDate: string;
}

export type Offers = {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
};

export type AggregateOffer = {
  priceCurrency: string;
  lowPrice: string;
  highPrice?: string;
  offerCount?: string;
  offers?: Offers | Offers[];
};

export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphMedia>;
  videos?: ReadonlyArray<OpenGraphMedia>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}

export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;

  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

export interface Twitter {
  /** `twitter:creator` */
  handle?: string;
  /** `twitter:site` */
  site?: string;
  /** `twitter:card` */
  cardType?: string;
}

interface MobileAlternate {
  media: string;
  href: string;
}

interface LanguageAlternate {
  hrefLang: string;
  href: string;
}

interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  color?: string;
  keyOverride?: string;
  as?: string;
  crossOrigin?: string;
}

export interface BaseMetaTag {
  content: string;
  keyOverride?: string;
}

export interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
  httpEquiv?: undefined;
}

export interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
  httpEquiv?: undefined;
}

export interface HTTPEquivMetaTag extends BaseMetaTag {
  httpEquiv: 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
  name?: undefined;
  property?: undefined;
}

export type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

export type ImagePrevSize = 'none' | 'standard' | 'large';

export type AggregateRating = {
  ratingValue: string;
  reviewCount?: string;
  ratingCount?: string;
  bestRating?: string;
};

export type GamePlayMode = 'CoOp' | 'MultiPlayer' | 'SinglePlayer';

export type Review = {
  author: string;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};

export type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};

export type Author = {
  type: string;
  name: string;
};

export type Publisher = {
  type: string;
  name: string;
};

export type ReviewedBy = {
  type?: string;
  name: string;
};

export type ApplicationCategory =
  | 'Game'
  | 'SocialNetworking'
  | 'Travel'
  | 'Shopping'
  | 'Sports'
  | 'Lifestyle'
  | 'Business'
  | 'Design'
  | 'Developer'
  | 'Driver'
  | 'Educational'
  | 'Health'
  | 'Finance'
  | 'Security'
  | 'Browser'
  | 'Communication'
  | 'DesktopEnhancement'
  | 'Entertainment'
  | 'Multimedia'
  | 'Home'
  | 'Utilities'
  | 'Reference';

export type OrganizationCategory =
  | 'Airline'
  | 'Consortium'
  | 'Corporation'
  | 'EducationalOrganization'
  | 'FundingScheme'
  | 'GovernmentOrganization'
  | 'LibrarySystem'
  | 'LocalBusiness'
  | 'MedicalOrganization'
  | 'NGO'
  | 'NewsMediaOrganization'
  | 'PerformingGroup'
  | 'Project'
  | 'ResearchOrganization'
  | 'SportsOrganization'
  | 'WorkersUnion'
  | 'Organization';

export interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: ImagePrevSize;
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}

interface DefaultSeoProps {
  /** \<title\>{value}\</title\> */
  title?: string;
  /**
   * default value : `false`
   *
   * \<meta name='robots' content={noindex|index} \/\>
   */
  noindex?: boolean;
  /**
   * default value : `false`
   *
   * \<meta name='robots' content={nofollow|follow} \/\>
   */
  nofollow?: boolean;
  // robotsProps?: AdditionalRobotsProps;
  /**
   *  \<meta name="description" content={value} \/\>
   */
  description?: string;
  canonical?: string;
  // mobileAlternate?: MobileAlternate;
  // languageAlternates?: ReadonlyArray<LanguageAlternate>;
  openGraph?: OpenGraph;
  facebook?: {appId: string};
  twitter?: Twitter;
  // additionalMetaTags?: ReadonlyArray<MetaTag>;
  // additionalLinkTags?: ReadonlyArray<LinkTag>;
  // defaultOpenGraphImageWidth?: number;
  // defaultOpenGraphImageHeight?: number;
  // defaultOpenGraphVideoWidth?: number;
  // defaultOpenGraphVideoHeight?: number;
}

interface BlogSeoProps {
  next?: string;
  prev?: string;
  image?: string;
}

interface AstroSeoProps extends DefaultSeoProps, BlogSeoProps {}

/**
 * Next SEO를 Astro용으로 마이그레이션한 것
 * TODO: 아직 SEO 불완전하게 지원함. 추후 개선 예정.
 *
 * 참조 : [Next SEO](https://github.com/garmeeh/next-seo)
 */
function AstroSeo(seo: AstroSeoProps) {
  return (
    <>
      {/* Common */}
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name='description' content={seo.description} />}
      {/* Robots */}
      <meta name='robots' content={`${seo.noindex ? 'noindex' : 'index'},${seo.nofollow ? 'nofollow' : 'follow'}`} />

      {/* SEO */}
      {seo.canonical && <link rel='canonical' href={seo.canonical} />}
      {seo.next && <link rel='next' aria-label='Previous Page' href={new URL(seo.next, seo.canonical).href} />}
      {seo.prev && <link rel='prev' aria-label='Next Page' href={new URL(seo.prev, seo.canonical).href} />}

      {/* OpenGraph */}
      {(seo.openGraph?.title || seo.title) && <meta property='og:title' content={seo.openGraph?.title || seo.title} />}
      {(seo.openGraph?.description || seo.description) && (
        <meta property='og:description' content={seo.openGraph?.description || seo.description} />
      )}
      {(seo.openGraph?.url || seo.canonical) && (
        <meta property='og:url' content={seo.openGraph?.url || seo.canonical} />
      )}
      {seo.openGraph?.type && <meta property='og:type' content={seo.openGraph.type.toLowerCase()} />}
      {seo.openGraph?.type && seo.openGraph.type.toLowerCase() === 'profile' && seo.openGraph?.profile && (
        <>
          <meta property='profile:first_name' content={seo.openGraph.profile.firstName} />
          <meta property='profile:last_name' content={seo.openGraph.profile.lastName} />
          <meta property='profile:username' content={seo.openGraph.profile.username} />
          <meta property='profile:gender' content={seo.openGraph.profile.gender} />
        </>
      )}
      {seo.openGraph?.type && seo.openGraph.type.toLowerCase() === 'book' && seo.openGraph?.book && (
        <>
          {seo.openGraph.book?.authors &&
            seo.openGraph.book?.authors.length &&
            seo.openGraph.book.authors.map(author => <meta property='book:author' content={author} />)}
          {seo.openGraph.book?.isbn && <meta property='book:isbn' content={seo.openGraph.book.isbn} />}
          {seo.openGraph.book?.releaseDate && (
            <meta property='book:release_date' content={seo.openGraph.book.releaseDate} />
          )}
          {seo.openGraph.book?.tags &&
            seo.openGraph.book.tags.length &&
            seo.openGraph.book.tags.map(tag => <meta property='book:tag' content={tag} />)}
        </>
      )}
      {seo.openGraph?.type && seo.openGraph.type.toLowerCase() === 'article' && seo.openGraph?.article && (
        <>
          {seo.openGraph.article?.publishedTime && (
            <meta property='article:published_time' content={seo.openGraph.article.publishedTime} />
          )}
          {seo.openGraph.article?.modifiedTime && (
            <meta property='article:modified_time' content={seo.openGraph.article.modifiedTime} />
          )}
          {seo.openGraph.article?.expirationTime && (
            <meta property='article:expiration_time' content={seo.openGraph.article.expirationTime} />
          )}
          {seo.openGraph.article?.authors &&
            seo.openGraph.article.authors?.length &&
            seo.openGraph.article.authors.map(author => <meta property='article:author' content={author} />)}
          {seo.openGraph.article?.section && (
            <meta property='article:section' content={seo.openGraph.article.section} />
          )}
          {seo.openGraph.article?.tags &&
            seo.openGraph.article.tags?.length &&
            seo.openGraph.article.tags.map(tag => <meta property='article:tag' content={tag} />)}
        </>
      )}

      {seo.openGraph?.type &&
        /video\.movie|video\.episode|video\.tv_show|video\.other/.test(seo.openGraph?.type.toLowerCase()) &&
        seo.openGraph?.video && (
          <>
            {seo.openGraph.video.actors &&
              seo.openGraph.video.actors?.length &&
              seo.openGraph.video.actors.map(actor => (
                <>
                  {actor.profile && <meta property='video:actor' content={actor.profile} />}
                  {actor?.role && <meta property='video:actor:role' content={actor.role} />}
                </>
              ))}
            {seo.openGraph.video.directors &&
              seo.openGraph.video.directors?.length &&
              seo.openGraph.video.directors.map(director => <meta property='video:director' content={director} />)}
            {seo.openGraph.video.writers &&
              seo.openGraph.video.writers?.length &&
              seo.openGraph.video.writers.map(writer => <meta property='video:writer' content={writer} />)}
            {seo.openGraph.video?.duration && (
              <meta property='video:duration' content={seo.openGraph.video.duration.toString()} />
            )}
            {seo.openGraph.video?.releaseDate && (
              <meta property='video:release_date' content={seo.openGraph.video.releaseDate} />
            )}
            {seo.openGraph.video.tags &&
              seo.openGraph.video.tags?.length &&
              seo.openGraph.video.tags.map(tag => <meta property='video:tag' content={tag} />)}
            {seo.openGraph.video?.series && <meta property='video:series' content={seo.openGraph.video.series} />}
          </>
        )}

      {/* 
    // images
    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }

    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }

    if (config.openGraph.images && config.openGraph.images.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags('image', config.openGraph.images, {
          defaultWidth: defaults.defaultOpenGraphImageWidth,
          defaultHeight: defaults.defaultOpenGraphImageHeight,
        }),
      );
    }

    // videos
    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }

    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }

    if (config.openGraph.videos && config.openGraph.videos.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags('video', config.openGraph.videos, {
          defaultWidth: defaults.defaultOpenGraphVideoWidth,
          defaultHeight: defaults.defaultOpenGraphVideoHeight,
        }),
      );
    }
  */}
      {seo.openGraph?.locale && <meta property='og:locale' content={seo.openGraph.locale} />}
      {seo.openGraph?.site_name && <meta property='og:site_name' content={seo.openGraph.site_name} />}
      {seo.image && <meta property='og:image' content={new URL(seo.image, seo.canonical).toString()} />}

      {/* Twitter */}
      {seo.image && <meta name='twitter:card' content={seo.image ? 'summary_large_image' : 'summary'} />}
      {seo.twitter?.site && <meta name='twitter:site' content={seo.twitter.site} />}
      {seo.twitter?.cardType && <meta name='twitter:card' content={seo.twitter.cardType} />}
      {seo.twitter?.handle && <meta name='twitter:creator' content={seo.twitter.handle} />}

      {/* Facebook */}
      {seo.facebook?.appId && <meta property='fb:app_id' content={seo.facebook.appId} />}
    </>
  );
}

export default AstroSeo;
export type {AstroSeoProps};
