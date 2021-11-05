import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const MapDynamic = dynamic(() => import('../components/Map'), { ssr: false })

import { Section, Container, Title } from './index'
import { navigationItems, contacts, translate } from '../utils'
import { useRouter } from 'next/router'

export default function Contacts() {
    const [position, setPosition] = useState(contacts.chisinau.position)
    const [active, setActive] = useState(contacts.chisinau)

    const router = useRouter()
    const { locale } = router

    const clickHandler = (key, pos) => {
        setActive(contacts[key])
        setPosition(pos)
    }

    return (
        <div className="contacts">
            <Section id={navigationItems.contacts.link}>
                <Title>{translate.title_contacts[locale]}</Title>
                <Container>
                    {locale === 'ro' && (
                        <div className="subtitle">
                            Aveți o întrebare sau o sugestie? <br />
                            Contactați-ne sau scrieți-ne acum, vă vom răspunde
                            cât mai curând posibil.
                        </div>
                    )}
                    {locale === 'ru' && (
                        <div className="subtitle">
                            У вас есть вопрос или предложение? <br />
                            Свяжитесь с нами или напишите нам сейчас, мы
                            свяжемся с вами как можно скорее.
                        </div>
                    )}
                </Container>
                <Container>
                    <div className="col-xxl-4 col-lg-5 col-md-6">
                        <div className="contacts__buttons">
                            {Object.entries(contacts).map(([key, value]) => (
                                <button
                                    className={
                                        value.position === position
                                            ? 'contacts__button contacts__button--active'
                                            : 'contacts__button'
                                    }
                                    key={value.text_ro}
                                    onClick={() =>
                                        clickHandler(key, value.position)
                                    }
                                >
                                    {value['text_' + locale]}
                                </button>
                            ))}
                        </div>

                        <div className="contacts__item">
                            <div className="contacts__label">
                                {translate.adresa[locale]}
                            </div>
                            <div className="contacts__info">
                                <div className="contacts__icon">
                                    <Image
                                        src="/img/icons/icons-blue/map-marker-alt.svg"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="contacts__text">
                                    {active['address_' + locale]}
                                </div>
                            </div>
                        </div>

                        <div className="contacts__item">
                            <div className="contacts__label">
                                {translate.program_de_lucru[locale]}
                            </div>
                            {active['timetable_' + locale].map((item, i) => (
                                <div key={i} className="contacts__info">
                                    <div className="contacts__icon">
                                        <Image
                                            src="/img/icons/icons-blue/time.svg"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className="contacts__text">{item}</div>
                                </div>
                            ))}
                        </div>

                        <div className="contacts__group">
                            <div className="contacts__item">
                                <div className="contacts__label">
                                    {translate.telefon[locale]}
                                </div>
                                {active.numbers.map((item, i) => (
                                    <div key={i} className="contacts__info">
                                        <div className="contacts__icon">
                                            <Image
                                                src="/img/icons/icons-blue/phone.svg"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="contacts__text">
                                            <a href={'tel:' + item}>{item}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="contacts__item">
                                <div className="contacts__label">
                                    {translate.email[locale]}
                                </div>
                                <div className="contacts__info">
                                    <div className="contacts__icon">
                                        <Image
                                            src="/img/icons/icons-blue/email.svg"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className="contacts__text">
                                        <a href={'mailto:' + active.email}>
                                            {active.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-8 col-lg-7 col-md-6 mt-md-0 mt-5">
                        <MapDynamic
                            position={position}
                            address={active['address_' + locale]}
                        />
                    </div>
                </Container>
            </Section>
        </div>
    )
}
