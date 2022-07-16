import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                        crossOrigin=""
                    />
                    <script src="https://frecautan.github.io/made-with-love/min.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn-ru.bitrix24.ru/b18465378/crm/site_button/loader_2_n9wypv.js');`,
                        }}
                    /> */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"958150",hash:"ded3f914db44f79016e505cbb00f4188",locale:"en"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");</script><script id="amoforms_script_958150" async="async" charset="utf-8" src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1657883861`,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"958147",hash:"c81aeeefdc5891b9028c8f258668d098",locale:"en"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");</script><script id="amoforms_script_958147" async="async" charset="utf-8" src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1657883831`,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"965731",hash:"abee4b7f9538c9dc8dfb9c0ac17d6dc8",locale:"en"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");</script><script id="amoforms_script_965731" async="async" charset="utf-8" src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1657875946`,
                        }}
                    />
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-WWGJ4X6"
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        ></iframe>
                    </noscript>
                </body>
            </Html>
        )
    }
}

export default MyDocument
