import Image from 'next/image'
import { useRef } from 'react'

import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

import { Section, Container, Title } from './index'
import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

const feedbacks_ro = [
    {
        name: 'Sergiu Budaianu',
        func: 'Antreprenor',
        comment:
            'Recomand cu încredere.... Echipa își face treaba profesionist. Traduceri legalizate livrate la timp... Mulțumesc 🙂',
        facebook: 'https://www.facebook.com/budaianusergiu',
        instagram: 'https://www.instagram.com/sergiubudaianu/',
    },
    {
        name: 'Fiodor Gutu',
        func: 'Client ASA',
        comment:
            'Recomand cu încredere Agenția Servicii Autorizate , profesionalism și rapiditate, echipă amabilă și deservire înaltă 👍🌟',
        facebook: 'https://www.facebook.com/fiodor.gutu.58',
        instagram: null,
    },
    {
        name: 'Igor Vt',
        func: 'Client ASA',
        comment:
            'Rapid și calitativ, opțiunea de a face totul online e perfectă, pentru toți care au nevoie de serviciile date-recomand cu încredere, bravo, 10⭐',
        facebook: 'https://www.facebook.com/igor.vt.52',
        instagram: null,
    },
    {
        name: 'Jumir Artiom',
        func: 'Client ASA',
        comment: 'Servicii de calitate. Rapid și avantajos.',
        facebook: 'https://www.facebook.com/artiom.jumir',
        instagram: null,
    },
]
const feedbacks_ru = [
    {
        name: 'Даша Маруха',
        func: 'Клиент ASA',
        comment:
            'Отличное агентство, они выполняют свои услуги хорошо и быстро - рекомендую агентство, исходя из собственного опыта.',
        facebook: 'https://www.facebook.com/profile.php?id=100005130464921',
        instagram: null,
    },
    {
        name: 'Нелу Болокан',
        func: 'Клиент ASA',
        comment:
            'Компания, предлагающая ценность услуг. Рекомендую с уверенностью. 💪👌',
        facebook: 'https://www.facebook.com/nelu.bolocan.52',
        instagram: null,
    },
    {
        name: 'Фрекауцан Игорь',
        func: 'Веб разработчик',
        comment:
            'Заказал онлайн перевод для сайта, сделали быстро, и самое главное никуда не надо ехать. Экономия времени и денег! Спасибо большое, буду вас рекомендовать друзьям.',
        facebook: 'https://www.facebook.com/frecautanigor',
        instagram: 'https://www.instagram.com/igorfrecautan',
    },
]

export default function Feedback() {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const router = useRouter()
    const { locale } = router

    const params = {
        slidesPerView: 1,
        // autoHeight: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
        },
        onBeforeInit() {
            this.params.navigation.prevEl = navigationPrevRef.current
            this.params.navigation.nextEl = navigationNextRef.current
        },
    }
    return (
        <div className="feedback">
            <Section type="dark" id={navigationItems.recommendation.link}>
                <div className="image">
                    <div className="image__wrapper">
                        <Image
                            src="/img/girl3.png"
                            alt={navigationItems.recommendation.text}
                            width="1000"
                            height="724"
                        />
                    </div>
                </div>

                <Title>{translate.title_feedback[locale]}</Title>
                <Container>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="feedback__slider">
                            <div className="feedback__arrows">
                                <div
                                    className="swiper-button-prev"
                                    ref={navigationPrevRef}
                                />
                                <div
                                    className="swiper-button-next"
                                    ref={navigationNextRef}
                                />
                            </div>

                            <Image
                                src="/img/icons/quote.svg"
                                alt={navigationItems.recommendation.text}
                                width="50"
                                height="50"
                            />
                            <Swiper {...params}>
                                {locale === 'ro' &&
                                    feedbacks_ro.map((item) => (
                                        <SwiperSlide key={item.name}>
                                            <div className="feedback__item">
                                                <div className="feedback__message">
                                                    {item.comment}
                                                </div>
                                                <div className="feedback__client">
                                                    <div className="info-client">
                                                        <span className="name">
                                                            {item.name}
                                                        </span>
                                                        <span className="function">
                                                            {item.func}
                                                        </span>
                                                    </div>
                                                    <div className="social-client">
                                                        {item.facebook && (
                                                            <a
                                                                href={
                                                                    item.facebook
                                                                }
                                                                className="social-client__link"
                                                                target="_blank"
                                                            >
                                                                <Image
                                                                    src={
                                                                        '/img/social/facebook.svg'
                                                                    }
                                                                    width="20"
                                                                    height="20"
                                                                />
                                                            </a>
                                                        )}
                                                        {item.instagram && (
                                                            <a
                                                                href={
                                                                    item.instagram
                                                                }
                                                                className="social-client__link"
                                                                target="_blank"
                                                            >
                                                                <Image
                                                                    src={
                                                                        '/img/social/instagram.svg'
                                                                    }
                                                                    width="20"
                                                                    height="20"
                                                                />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                {locale === 'ru' &&
                                    feedbacks_ru.map((item) => (
                                        <SwiperSlide key={item.name}>
                                            <div className="feedback__item">
                                                <div className="feedback__message">
                                                    {item.comment}
                                                </div>
                                                <div className="feedback__client">
                                                    <div className="info-client">
                                                        <span className="name">
                                                            {item.name}
                                                        </span>
                                                        <span className="function">
                                                            {item.func}
                                                        </span>
                                                    </div>
                                                    <div className="social-client">
                                                        {item.facebook && (
                                                            <a
                                                                href={
                                                                    item.facebook
                                                                }
                                                                className="social-client__link"
                                                                target="_blank"
                                                            >
                                                                <Image
                                                                    src={
                                                                        '/img/social/facebook.svg'
                                                                    }
                                                                    width="20"
                                                                    height="20"
                                                                />
                                                            </a>
                                                        )}
                                                        {item.instagram && (
                                                            <a
                                                                href={
                                                                    item.instagram
                                                                }
                                                                className="social-client__link"
                                                                target="_blank"
                                                            >
                                                                <Image
                                                                    src={
                                                                        '/img/social/instagram.svg'
                                                                    }
                                                                    width="20"
                                                                    height="20"
                                                                />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    )
}
