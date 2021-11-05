import Head from 'next/head'

import 'focus-visible'
import 'modern-normalize//modern-normalize.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

import '../public/fonts/NotoSerif/stylesheet.css'
import '../public/fonts/OpenSans/stylesheet.css'

import '../styles/components/HowGetTranslation.scss'
import '../styles/components/BlockInfo.scss'
import '../styles/components/ServicesList.scss'
import '../styles/components/Faq.scss'
import '../styles/components/Button.scss'
import '../styles/components/Performance.scss'
import '../styles/components/Advantages.scss'
import '../styles/components/FirstBlock.scss'
import '../styles/components/Navigation.scss'
import '../styles/components/PriceList.scss'
import '../styles/components/Feedback.scss'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <title>ASA.md</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="robots" content="follow, index" />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href="https://asa.md"
                />
                <link rel="alternate" hrefLang="ro" href="https://asa.md/ro" />
                <link rel="alternate" hrefLang="ru" href="https://asa.md/ru" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
