import Image from 'next/image'

import { Title, Section, Container, BlockInfo } from './index'
import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

const items = [
    // {
    //     title_ro: 'Achitare sigură',
    //     title_ru: 'Безопасный платеж',
    //     description_ro:
    //         'fizic - achiți fie cash, fie cu cardul și primești cec care confirmă plata; sau la distanță - fie prin aplicația mobilă a băncii Dvs, fie prin transfer direct pe contul firmei.',
    //     description_ru:
    //         'лично  -  оплачиваешь наличными или картой и получаешь чек, подтверждающий платеж; или дистанционно - через мобильное приложение Вашего банка или прямым переводом на счет Вашей компании.',
    // },
    {
        title_ro: 'Experiență pe piață',
        title_ru: 'Опыт работы на рынке',
        description_ro:
            'Agenția Servicii Autorizate a fost fondată în anul 2021, iar muncitorii ce activează în cadrul ei sunt traducători autorizați cu 15 ani vechime în domeniul traducerilor.',
        description_ru:
            'Авторизованное агентство по оказанию услуг было основано в 2021 году, а его сотрудники являются дипломированными переводчиками с 15-летним опытом работы в переводческой отрасли.',
    },
    {
        title_ro: 'Servicii de calitate',
        title_ru: 'Качество услуг',
        description_ro:
            'pentru noi calitatea stă la baza celor mai importante puncte în procesul de prestare a serviciilor, de aceea te asigurăm că rămâi  mulțumit de profesionalismul acordat.',
        description_ru:
            'для нас качество является важнейшим моментом в процессе предоставления услуг, поэтому мы следим за тем, чтобы вы оставались довольны нашим профессионализмом.',
    },
    {
        title_ro: 'Rapiditate',
        title_ru: 'Скорость',
        description_ro:
            'știm cât de prețios este timpul tău și nu ne dorim să-l irosești în zadar. Datorită angajaților noștri calificați, pe lângă calitatea pe care o oferim, mai punem accent pe timpul livrării serviciului în cel mai scurt timp.',
        description_ru:
            'мы знаем, как драгоценно твоё  время, и мы не хотим его тратить впустую. Благодаря нашим квалифицированным сотрудникам, помимо качества, которое мы предлагаем, мы также уделяем особое внимание предоставлению услуг в кратчайшие сроки.',
    },
    {
        title_ro: 'Servicii de livrare',
        title_ru: 'Услуги по доставке',
        description_ro:
            'pe lângă livrarea serviciilor în mediul online,  oferim livrare în offline pe întreg teritoriul Republicii Moldova, fie prin poștă sau direct prin curier. Puteți achita prin transfer sau direct curierului.',
        description_ru:
            'помимо доставки в режиме онлайн, мы предлагаем доставку в режиме офлайн по всей территории Республики Молдова, как по почте, так и непосредственно курьером. Вы можете оплатить переводом или непосредственно курьеру.',
    },
    {
        title_ro: 'Nu pleci până nu ești mulțumit!',
        title_ru: 'Не уходи, пока не будешь  удовлетворены!',
        description_ro:
            'În cazul în care există neclarități, suntem gata să îți restituim suma de bani achitată sau să prelucrăm documentul până când ești  total satisfăcut.',
        description_ru:
            'Если есть сомнения, мы готовы вернуть уплаченную сумму или обработать документ до тех пор, пока вы не будете полностью удовлетворены.',
    },
    {
        title_ro: 'Ai făcut alegerea corectă',
        title_ru: 'Ты сделал правильный выбор',
        description_ro:
            'știm perfect fricile și frustrările tale, de aceea am depus multă muncă în serviciile noastre întrucât valoarea acestora să fie ba chiar mai mare decât prețul pe care îl achiți.',
        description_ru:
            'мы знаем твои  страхи и разочарования, поэтому мы вложили много работы в наши услуги, чтобы  ценность была еще больше, чем цена, которую вы платите.',
    },
]

export default function Guarantees() {
    const router = useRouter()
    const { locale } = router

    return (
        <div className="check-block">
            <Section type="dark-inverse" id={navigationItems.guarantees.link}>
                <div className="image">
                    <div className="image__wrapper">
                        <Image
                            src="/img/girl4.png"
                            alt=""
                            width="1000"
                            height="880"
                        />
                    </div>
                </div>

                <div className="main-index">
                    <Title>{translate.title_garantii[locale]}</Title>
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
                                    {locale === 'ru' && (
                                        <BlockInfo>
                                            Мы гарантируем полную
                                            конфиденциальность Ваших документов
                                            даже без предварительного обращения.
                                        </BlockInfo>
                                    )}
                                    {locale === 'ro' && (
                                        <BlockInfo>
                                            Asigurăm deplină confidențialitate a
                                            documentelor dumneavoastră chiar și
                                            fără o solicitare expresă.
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
