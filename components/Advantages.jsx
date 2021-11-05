import Image from 'next/image'

import { Title, Section, Container } from './index'
import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

const items = [
    {
        img: 'envelope-open-text.svg',
        title_ro: 'Livrare în toată lumea',
        title_ru: 'Доставка по всему миру',
        description_ro:
            'online - în orice colț al lumii sau prin poștă pe tot teritoriul Republicii Moldova.',
        description_ru:
            'онлайн - в любой уголок мира или по почте по всей Республике Молдова.',
    },
    {
        img: 'stopwatch.svg',
        title_ro: 'Rapiditate',
        title_ru: 'Скорость',
        description_ro:
            'lucrăm operativ, punem accent pe livrare efectuata în cel mai scurt timp posibil.',
        description_ru:
            'lucrăm operativ, punem accent pe livrare efectuata în cel mai scurt timp posibil.',
    },
    {
        img: 'map-marker-alt.svg',
        title_ro: 'Amplasare strategică',
        title_ru: 'Стратегическое местоположение',
        description_ro: 'ne găsiți ușor, din orice punct al orașului.',
        description_ru: 'Вы можете легко найти нас из любой точки города.',
    },
    {
        img: 'credit-card.svg',
        title_ro: 'Achitare sigură',
        title_ru: 'Безопасный платеж',
        description_ro:
            'fizic - achiți fie cash, fie cu cardul și primești cec care confirmă plata; sau la distanță - fie prin aplicația mobilă a băncii tale, fie prin transfer direct pe contul companiei.',
        description_ru:
            'лично  - вы оплачиваете наличными или картой и получаете чек, подтверждающий платеж; или дистанционно - через мобильное приложение вашего банка или прямым переводом на счет вашей компании.',
    },
    {
        img: 'history.svg',
        title_ro: 'Timp',
        title_ru: 'Время',
        description_ro:
            'într-o eră digitală, îți propunem serviciile noastre online, care te scutesc de deplasări inutile, plus serviciile noastre de livrare rapidă!',
        description_ru:
            'в цифровую эпоху мы предлагаем вам наши онлайн-услуги, которые избавят вас от лишних путешествий, плюс наши услуги быстрой доставки!',
    },
    {
        img: 'percent.svg',
        title_ro: '10 % reducere',
        title_ru: '10% скидка',
        description_ro: 'la orice comandă online și la a doua comandă offline!',
        description_ru:
            'мы предлагаем 10% скидку на онлайн-заказы вне зависимости от суммы сделки.',
    },
    {
        img: 'mug-hot.svg',
        title_ro: 'Confort',
        title_ru: 'Комфорт',
        description_ro:
            'oficii moderne care îți transmit un feeling confortabil, unde poți servi o cafea, un ceai sau pur și simplu să te relaxezi în timp ce noi pregătim actele tale.',
        description_ru:
            'современные офисы, которые дарят вам ощущение комфорта, где вы можете выпить кофе, чай или просто расслабиться, пока мы готовим ваши документы.',
    },
    {
        img: 'comments.svg',
        title_ro: 'Consultație gratuită',
        title_ru: 'Бесплатная консультация',
        description_ro:
            'suntem deschiși să oferim răspuns la toate întrebările tale absolut gratuit.',
        description_ru:
            'мы готовы ответить на все Ваши вопросы абсолютно бесплатно.',
    },
]

export default function Advantages() {
    const router = useRouter()
    const { locale } = router

    return (
        <Section id={navigationItems.advantage.link}>
            <Title>{translate.title_advantages[locale]}</Title>
            <div className="advantages">
                <Container>
                    {items.map((item, i) => (
                        <div
                            key={item.title_ro}
                            className={
                                i === 0 ||
                                i === 1 ||
                                i === 2 ||
                                i === 5 ||
                                i === 6 ||
                                i === 7
                                    ? 'col-lg-4 col-sm-6'
                                    : 'col-sm-6'
                            }
                        >
                            <div className="advantages__item">
                                <Image
                                    src={'/img/icons/icons-blue/' + item.img}
                                    width="50"
                                    height="50"
                                    alt={item['title_' + locale]}
                                />
                                <h3 className="advantages__title">
                                    {item['title_' + locale]}
                                </h3>
                                <p className="advantages__description">
                                    {item['description_' + locale]}
                                </p>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
        </Section>
    )
}
