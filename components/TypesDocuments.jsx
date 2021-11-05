import Image from 'next/image'

import { Title, Section, Container, BlockInfo } from './index'
import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

const items = [
    {
        title_ro: 'Acte privind starea civilă',
        title_ru: 'Документы о гражданском состоянии',
        description_ro:
            'certificate de naștere, căsătorie, deces, divorț, caziere judiciare, etc.',
        description_ru:
            'свидетельства о рождении, браке, смерти, разводе, судимости и т.д.',
    },
    {
        title_ro: 'Acte medicale',
        title_ru: 'Медицинские карты',
        description_ro:
            'certificate și extrase medicale, concluzii și rețete medicale, certificate de vaccinare, etc.',
        description_ru:
            'медицинские справки и выписки, медицинские заключения и рецепты, свидетельства о вакцинации и т.д.',
    },
    {
        title_ro: 'Acte privind activitatea de afaceri',
        title_ru: 'Документы о хозяйственной деятельности',
        description_ro:
            'statutul întreprinderii, autorizații, contracte de parteneriat, documente conexe afacerii, etc.',
        description_ru:
            'уставы компаний, разрешения, партнерские договоры, деловые документы и т.д.',
    },
    {
        title_ro: 'Acte juridice de instanță',
        title_ru: 'Юридические документы суда',
        description_ro:
            'încheieri, extrădări, mandate, împuterniciri, legi, proiecte de hotărâri, regulamente, etc.',
        description_ru:
            'решения, экстрадиции, ордера, доверенности, законы, проекты решений, постановления и т.д.',
    },
    {
        title_ro: 'Acte privind proprietățile imobiliare',
        title_ru: 'Документы на недвижимость',
        description_ro:
            'certificate de proprietate, contracte de vânzare-cumpărare, titlu de autentificare, etc.',
        description_ru:
            'имущественные сертификаты, договоры купли-продажи, правоустанавливающие документы и т.д.',
    },
    {
        title_ro: 'Acte privind activitatea profesională',
        title_ru: 'Документы, относящиеся к профессиональной деятельности',
        description_ro:
            'diplome, suplimente la diplome, certificate de studii, confirmări, etc.',
        description_ru:
            'дипломы, приложения к дипломам, свидетельства об учебе, подтверждения и т.д.',
    },
]

export default function TypesDocuments() {
    const router = useRouter()
    const { locale } = router

    return (
        <div className="check-block">
            <Section
                type="dark-inverse"
                id={navigationItems.typesDocuments.link}
            >
                <div className="image">
                    <div className="image__wrapper">
                        <Image
                            src="/img/girl2.png"
                            alt=""
                            width="1000"
                            height="853"
                        />
                    </div>
                </div>

                <div className="main-index">
                    <Title>{translate.title_types_docs[locale]}</Title>
                    <Container>
                        <div className="col-lg-4"></div>
                        <div className="col-lg-8 col-md-12">
                            <div className="row no-gutters check-block__row">
                                {items.map((item) => (
                                    <div
                                        key={item.title_ro}
                                        className="col-lg-6 col-md-6 col-sm-6"
                                    >
                                        <div className="check-block__item">
                                            <h3 className="check-block__item-title">
                                                <Image
                                                    src="/img/icons/check.svg"
                                                    alt={
                                                        item['title_' + locale]
                                                    }
                                                    width="24"
                                                    height="24"
                                                />
                                                <span>
                                                    {item['title_' + locale]}
                                                </span>
                                            </h3>
                                            <p className="check-block__item-description">
                                                {item['description_' + locale]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-lg-12 col-md-8 col-sm-8">
                                    {locale === 'ro' && (
                                        <BlockInfo>
                                            În caz că nu regăsiți tipul de act
                                            care aveți nevoie să-l traduceți în
                                            categoriile de mai sus nu ezitați să
                                            ne contactați. Cu siguranță vă putem
                                            ajuta.
                                        </BlockInfo>
                                    )}
                                    {locale === 'ru' && (
                                        <BlockInfo>
                                            Если вы не нашли нужный вам тип
                                            переведенного документа в
                                            вышеперечисленных категориях,
                                            пожалуйста, не стесняйтесь
                                            обращаться к нам. Мы, непременно,
                                            сможем вам помочь.
                                        </BlockInfo>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </Section>
        </div>
    )
}
