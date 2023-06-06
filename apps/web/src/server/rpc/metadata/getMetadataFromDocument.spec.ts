import { getMetadataFromDocument } from '@app/web/server/rpc/metadata/getMetadataFromDocument'

describe('getMetadataFromDocument', () => {
  it('should return null values on empty document', () => {
    const document = `<!DOCTYPE html><p>Hello world</p>`

    expect(
      getMetadataFromDocument(document, {
        hasDefaultFavicon: true,
        url: new URL('https://www.ecologie.gouv.fr/'),
      }),
    ).toEqual({
      title: null,
      description: null,
      imageUrl: null,
      faviconUrl: 'https://www.ecologie.gouv.fr/favicon.ico',
    })
  })

  it('should return metadata values for website without images', () => {
    const document = `<!DOCTYPE html>
<html  lang='fr' dir='ltr' prefix='content: http://purl.org/rss/1.0/modules/content/  dc: http://purl.org/dc/terms/  foaf: http://xmlns.com/foaf/0.1/  og: http://ogp.me/ns#  rdfs: http://www.w3.org/2000/01/rdf-schema#  schema: http://schema.org/  sioc: http://rdfs.org/sioc/ns#  sioct: http://rdfs.org/sioc/types#  skos: http://www.w3.org/2004/02/skos/core#  xsd: http://www.w3.org/2001/XMLSchema# '>
<head>
<meta charset='utf-8' />
<link rel='canonical' href='https://www.ecologie.gouv.fr/' />
<meta http-equiv='content-language' content='fr' />
<link rel='shortlink' href='https://www.ecologie.gouv.fr/' />
<meta name='description' content='Bienvenue sur le site des ministères Écologie Énergie Territoires : actualités, presse, organisation et politiques publiques !' />
<meta name='abstract' content='Bienvenue sur le site des ministères Écologie Énergie Territoires : actualités, presse, organisation et politiques publiques !' />
<meta property='og:site_name' content='Ministères Écologie Énergie Territoires' />
<meta property='og:title' content='Ministères Écologie Énergie Territoires' />
<meta name='msvalidate.01' content='F12E70D7F32244FC07D76FF9D8090179' />
<meta name='google-site-verification' content='zgQcCBnafU0iVW8z9_b6lL6cS2-a0ODqLPDxyFqU3Ig' />
<meta name='twitter:card' content='summary' />
<meta name='twitter:site' content='@Min_Ecologie' />
<meta name='twitter:creator' content='@Min_Ecologie' />
<meta name='twitter:url' content='https://www.ecologie.gouv.fr' />
<meta name='Generator' content='Drupal 9 (https://www.drupal.org)' />
<meta name='MobileOptimized' content='width' />
<meta name='HandheldFriendly' content='true' />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<meta http-equiv='ImageToolbar' content='false' />
<link rel='alternate' type='application/rss+xml' title='Ministères Écologie Énergie Territoires - Actualités' href='https://www.ecologique-solidaire.gouv.fr/rss_actualites.xml' />
<link rel='alternate' type='application/rss+xml' title='Ministères Écologie Énergie Territoires - presse' href='https://www.ecologique-solidaire.gouv.fr/rss_presse.xml' />
<link rel='icon' href='/themes/custom/meem/medias/favicon.png' type='image/png' />
<title>Accueil | Ministères Écologie Énergie Territoires</title>
<link rel='stylesheet' media='all' href='/sites/default/files/css/css__j4g5lK9lildFPhzT3zy1dEUXWp7YA6f6mZncdkVUO4.css' />
</head>
<body class='lang-fr path-frontpage desktop' data-device='desktop'>
</html>
`

    expect(
      getMetadataFromDocument(document, {
        hasDefaultFavicon: false,
        url: new URL(
          'https://www.ecologie.gouv.fr/random-page?stuff=1&yes=no#stuff',
        ),
      }),
    ).toEqual({
      // Use og title instead of html title (that shows the specificities of page)
      title: 'Ministères Écologie Énergie Territoires',
      description:
        'Bienvenue sur le site des ministères Écologie Énergie Territoires : actualités, presse, organisation et politiques publiques !',
      imageUrl: null,
      faviconUrl:
        'https://www.ecologie.gouv.fr/themes/custom/meem/medias/favicon.png',
    })
  })

  it('should return metadata values for website with image', () => {
    const document = `
<!DOCTYPE html>
<html lang="en"  data-a11y-animated-images="system">
  <head>
    <meta charset="utf-8">
  <title>GitHub: Let’s build from here · GitHub</title>
  <meta name="route-pattern" content="/">
  <meta name="current-catalog-service-hash" content="40dc28bd654b20f337468a532ff456ed5863889cfbb4e982b793597321d48d3f">
  <meta name="request-id" content="C171:FB69:433ABAB:442CCE2:6475F337" data-pjax-transient="true"/><meta name="html-safe-nonce" content="9405da1233ba4182c27040fd5686083185e37b0f1dc0df3750023c5febe6b572" data-pjax-transient="true"/><meta name="visitor-payload" content="eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiJDMTcxOkZCNjk6NDMzQUJBQjo0NDJDQ0UyOjY0NzVGMzM3IiwidmlzaXRvcl9pZCI6IjEzNDcxNjQwMzA3NDk1ODQ4MDIiLCJyZWdpb25fZWRnZSI6ImZyYSIsInJlZ2lvbl9yZW5kZXIiOiJmcmEifQ==" data-pjax-transient="true"/><meta name="visitor-hmac" content="159e5071fa62d079f988cfd87b8a55d6f123d3e9d813bd7cc22d8f5dfa0046bd" data-pjax-transient="true"/>
    <meta name="page-subject" content="GitHub">
  <meta name="github-keyboard-shortcuts" content="dashboards" data-turbo-transient="true" />
  <meta name="selected-link" value="/" data-turbo-transient>
  <link rel="assets" href="https://github.githubassets.com/">
<meta name="octolytics-url" content="https://collector.github.com/github/collect" />
    <meta name="user-login" content="">
    <meta name="viewport" content="width=device-width">
      <meta name="description" content="GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.">
      <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <meta property="fb:app_id" content="1401488693436528">
    <meta name="apple-itunes-app" content="app-id=1477376905" />
      <meta name="twitter:image:src" content="https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png" />
      <meta name="twitter:site" content="@github" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="GitHub: Let’s build from here" />
      <meta name="twitter:description" content="GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea..." />
      <meta property="og:image" content="https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png" />
      <meta property="og:image:alt" content="GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea..." />
      <meta property="og:site_name" content="GitHub" />
      <meta property="og:type" content="object" />
      <meta property="og:title" content="GitHub: Let’s build from here" />
      <meta property="og:url" content="https://github.com/" />
      <meta property="og:description" content="GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea..." />
        <meta name="hostname" content="github.com">
        <meta name="expected-hostname" content="github.com">
    <meta name="enabled-features" content="TURBO_EXPERIMENT_RISKY,IMAGE_METRIC_TRACKING,GEOJSON_AZURE_MAPS">
  <meta name="turbo-cache-control" content="no-preview" data-turbo-transient="">
      <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <link crossorigin="anonymous" media="all" rel="stylesheet" href="https://github.githubassets.com/assets/home-campaign-d4421b93e1ca.css" />
  <link rel="preload" href="https://github.githubassets.com/static/fonts/github/mona-sans.woff2" as="font" type="font/woff2" crossorigin>
  <meta name="is_logged_out_page" content="true">
    <link rel="canonical" href="https://github.com/" data-turbo-transient>
  <meta name="turbo-body-classes" content="logged-out env-production page-responsive header-overlay home-campaign">
  <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">
  <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">
  <meta name="browser-optimizely-client-errors-url" content="https://api.github.com/_private/browser/optimizely_client/errors">
  <link rel="mask-icon" href="https://github.githubassets.com/pinned-octocat.svg" color="#000000">
  <link rel="alternate icon" class="js-site-favicon" type="image/png" href="https://github.githubassets.com/favicons/favicon.png">
  <link rel="icon" class="js-site-favicon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon.svg">
  <meta name="theme-color" content="#1e2327">
  <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials">
  </head>
  <body class="logged-out env-production page-responsive header-overlay home-campaign" style="word-wrap: break-word;">
   </body>
</html>`

    expect(
      getMetadataFromDocument(document, {
        hasDefaultFavicon: true,
        url: new URL('https://github.com/random-page?stuff=1&yes=no#stuff'),
      }),
    ).toEqual({
      title: 'GitHub: Let’s build from here',
      description:
        'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.',
      imageUrl:
        'https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png',
      faviconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
    })
  })
})
