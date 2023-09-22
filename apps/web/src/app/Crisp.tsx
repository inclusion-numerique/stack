import Script from 'next/script'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

// The Next <Script> tag expect a nonce as Next directly inject the code from the script file in an inline <script> tag
const Crisp = ({ nonce }: { nonce?: string }) =>
  process.env.NODE_ENV === 'production' &&
  PublicWebAppConfig.Crisp.websiteId &&
  PublicWebAppConfig.Crisp.enableChat ? (
    <Script
      id="crisp"
      nonce={nonce}
      strategy="lazyOnload"
    >{`window.$crisp=[];window.CRISP_WEBSITE_ID="${PublicWebAppConfig.Crisp.websiteId}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
  ) : null

export default Crisp
