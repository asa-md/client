import {
    HowGetTranslation,
    ServicesList,
    Faq,
    Performance,
    Advantages,
    SimpleBlock,
    TypesDocuments,
    Guarantees,
    FirstBlock,
    Calc,
    PriceList,
    Feedback,
    Contacts,
    Footer,
    CallBack,
} from '../components'
import { useRouter } from 'next/router'
import { servicesContent, translate } from '../utils'
import Head from 'next/head'
export default function Home(props) {
    const router = useRouter()
    const { locale } = router

    return (
        <>
            {locale === 'ru' ? (
                <Head>
                    <title>ASA - Агентство Авторизированных Услуг</title>
                    <meta
                        name="description"
                        content="✅ Агенство Авторизированных услуг ⮕ Бюро авторизированных переводов ⮕ Легализированные Переводы ⮕ Апостиль ⮕ Устный перевод ⮕ Онлайн переводы ⮕ Доставка ⮕ Переводы тестов Covid 19"
                    />
                    <meta
                        name="keywords"
                        content="ASA, Агенство Авторизированных услуг, Бюро авторизированных переводов, Легализированные Переводы, Апостиль, Устный перевод, Онлайн переводы, Доставка, Переводы тестов Covid 19"
                    />
                    <meta
                        property="og:title"
                        content="ASA - Агентство Авторизированных Услуг"
                    />
                    <meta
                        property="og:site_name"
                        content="ASA - Агентство Авторизированных Услуг"
                    />
                    <meta property="og:locale" content="ru_RU" />
                    <meta property="og:url" content="https://asa.md/ru" />
                    <meta
                        property="og:description"
                        content="✅ Агенство Авторизированных Услуг ⮕ Бюро авторизированных переводов ⮕ Легализированные Переводы ⮕ Апостиль ⮕ Устный перевод ⮕ Онлайн переводы ⮕ Доставка ⮕ Переводы тестов Covid 19"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:image"
                        content="https://asa.md/img/open_graph_ru.jpg"
                    />
                    <meta
                        property="og:image"
                        content="https://asa.md/img/open_graph_ru.jpg"
                    />
                    <meta
                        property="og:image:secure_url"
                        content="https://asa.md/img/open_graph_ru.jpg"
                    />
                    <meta property="og:image:type" content="image/jpeg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image:alt"
                        content="Агенство Авторизированных Услуг"
                    />
                </Head>
            ) : (
                <Head>
                    <title>ASA - Agenția Servicii Autorizate</title>
                    <meta
                        name="description"
                        content="✅ Agenția Servicii Autorizate ⮕ Birou Traduceri Autorizate, ⮕ Traduceri Legalizate, ⮕ Apostila, ⮕ Interpretariat, ⮕ Traduceri online, ⮕ Livrare, ⮕ Traduceri Test COVID-19"
                    />
                    <meta
                        name="keywords"
                        content="ASA, Agenția Servicii Autorizate, Birou Traduceri Autorizate, Traduceri Legalizate, Apostila, Interpretariat, Traduceri online, Livrare, Traduceri Test COVID-19"
                    />
                    <meta
                        property="og:title"
                        content="ASA - Agenția Servicii Autorizate"
                    />
                    <meta
                        property="og:site_name"
                        content="ASA - Agenția Servicii Autorizate"
                    />
                    <meta property="og:locale" content="ro_RO" />
                    <meta property="og:url" content="https://asa.md" />
                    <meta
                        property="og:description"
                        content="✅ Agenția Servicii Autorizate ⮕ Birou Traduceri Autorizate, ⮕ Traduceri Legalizate, ⮕ Apostila, ⮕ Interpretariat, ⮕ Traduceri online, ⮕ Livrare, ⮕ Traduceri Test COVID-19"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:image"
                        content="https://asa.md/img/open_graph_ro.jpg"
                    />
                    <meta
                        property="og:image"
                        content="https://asa.md/img/open_graph_ro.jpg"
                    />
                    <meta
                        property="og:image:secure_url"
                        content="https://asa.md/img/open_graph_ro.jpg"
                    />
                    <meta property="og:image:type" content="image/jpeg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image:alt"
                        content="Agenția Servicii Autorizate"
                    />
                </Head>
            )}
            {props.settings[0].google && (
                <Head>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${props.settings[0].google}`}
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${props.settings[0].google}');
                        `,
                        }}
                    />
                </Head>
            )}
            {props.settings[0].facebook && (
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${props.settings[0].facebook}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${props.settings[0].facebook}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </Head>
            )}

            <Head>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=UA-201087216-1`}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'UA-201087216-1')
                        `,
                    }}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWGJ4X6')`,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWGJ4X6"height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
            </Head>

            {/*<CallBack />*/}
            <FirstBlock
                translate={props.translate}
                languagesList={props.languagesList}
                video={props.settings[0].video}
            />

            <ServicesList
                tabsList={props.tabsList}
                contentList={props.contentList}
            />

            <PriceList
                languagesList={props.languagesList}
                // prices={props.prices}
                // documents={props.documents}
            />

            {/*<Calc*/}
            {/*    languagesList={props.languagesList}*/}
            {/*    documents={props.documents}*/}
            {/*    prices={props.prices}*/}
            {/*/>*/}

            <TypesDocuments />

            <HowGetTranslation languagesList={props.languagesList} />

            <Performance />

            <Advantages />

            <SimpleBlock
                languagesList={props.languagesList}
                title={translate.title_metode_de_plata[locale]}
                img="/img/side-view-business-man-calculating-finance-numbers.jpg"
            >
                {locale === 'ru' && (
                    <div>
                        <p>
                            При переводах на сумму до 500 леев, 50% депозита
                            оплачивается в момент получения адреса, а оставшаяся
                            часть - в момент доставки документов. При переводах,
                            превышающих 500 леев, полная сумма оплачивается с
                            самого начала.
                        </p>
                        <p>
                            Оплата производится наличными в офисе или в банке, в
                            зависимости от ситуации и суммы. Авансовый платеж
                            является обязательным при получении заказа и
                            определяется на основании переводимого материала. По
                            желанию мы можем выслать твой перевод
                            экспресс-курьером с оплатой у получателя.
                        </p>
                    </div>
                )}
                {locale === 'ro' && (
                    <div>
                        <p>
                            Pentru traducerile în valoare de până la 500 lei, se
                            achită 50% avans în momentul adresării, iar restul
                            sumei în momentul livrării documentelor. Pentru
                            traducerile ce depășesc suma de 500 lei, din start
                            se achită suma integrală.
                        </p>
                        <p>
                            Plata se face în numerar la sediu sau prin bancă, în
                            funcție de situație și de sumă. Avansul este
                            obligatoriu la preluarea comenzii și se stabilește
                            concret pe baza materialului de tradus.La cerere,
                            îți putem expedia traducerea prin curier rapid cu
                            plata la destinatar.
                        </p>
                    </div>
                )}
            </SimpleBlock>

            <Feedback />

            <SimpleBlock
                languagesList={props.languagesList}
                title={translate.title_delivery[locale]}
                img="/img/red-open-mailbox-with-five-white-envelopes.jpg"
            >
                {locale === 'ru' && (
                    <div>
                        <p>
                            Теперь ты можешь заказать услуги доставки в любой
                            уголок мира - онлайн или оффлайн по всей Молдове.
                        </p>
                        <p>
                            Если ты находишься за границей, ты можешь отправить
                            нам документ, который ты хотите перевести, в наших
                            социальных сетях или по почте непосредственно в наш
                            офис.
                        </p>
                        <p>
                            Если ты находитесь в Республике Молдова, вы можете
                            приехать к нам в офис или отправить нам документ
                            онлайн, и мы доставим его по почте или курьером
                            прямо к тебе домой.
                        </p>
                        <p>
                            Оплата производится в нашем офисе, наличными и через
                            терминал, а в случае онлайн-переводов - переводом на
                            наш счет.
                        </p>
                    </div>
                )}
                {locale === 'ro' && (
                    <div>
                        <p>
                            Acum poți comanda servicii de livrare în orice colț
                            al lumii - în mediul online sau offline pe întreg
                            teritoriul Republicii Moldova.
                        </p>
                        <p>
                            În cazul în care te afli peste hotarele țării, ne
                            poți expedia documentul pe care vrei să-l traduci
                            prin rețelele noastre de socializare sau prin poștă,
                            direct la oficiul nostru.
                        </p>
                        <p>
                            Dacă te afli pe teritoriul Republicii Moldova, te
                            poți apropia la oficiul nostru sau ne expediezi
                            documentul online, iar noi la rândul nostru, ți-l
                            livrăm prin poștă sau curier direct la domiciliul
                            tău.
                        </p>
                        <p>
                            Achitarea se efectuează la noi în oficiu, în numerar
                            și terminal, iar în cazul traducerilor online,
                            achiți prin transfer pe contul companiei.
                        </p>
                    </div>
                )}
            </SimpleBlock>

            <Guarantees />

            <Contacts />

            <Faq />

            <Footer />

            <div className="dev">
                <span>Designed & Developed with</span>
                <svg
                    className="dev__svg"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height={20}
                    width={20}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                <span>
                    by{' '}
                    <a href="https://ul.md/igorfrecautan">
                        <strong>Igor Frecautan</strong>
                    </a>
                </span>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const languagesList = await fetch(`https://success.asa.md/api/languages`).then(
        // const languagesList = await fetch(`${process.env.API}/languages`).then(
        (response) => {
            return response.json()
        }
    )

    const settings = await fetch(`https://success.asa.md/api/settings`).then(
        // const settings = await fetch(`${process.env.API}/settings`).then(
        (response) => {
            return response.json()
        }
    )

    // const translate = await fetch('http://127.0.0.1:8000/api/translate').then(
    //     (response) => {
    //         return response.json()
    //     }
    // )

    // const prices = await fetch(`${process.env.API}/prices`).then((response) => {
    //     return response.json()
    // })
    //
    // const documents = await fetch('http://127.0.0.1:8000/api/documents').then(
    //     (response) => {
    //         return response.json()
    //     }
    // )

    return {
        props: {
            languagesList,
            settings,
            // translate,
            // prices,
            // documents,
        },
    }
}