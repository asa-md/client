import React, { useState } from 'react'
import Image from 'next/image'

import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

import { Title, Section, Container } from './index'
import { useRouter } from 'next/router'
import { translate } from '../utils'

const items = [
    {
        number: 16,
        symbol: '',
        text_ro: 'Ani de experiență',
        text_ru: 'Лет опыта работы',
    },
    {
        number: 22,
        symbol: '',
        text_ro: 'Combinații de limbi',
        text_ru: 'Языка перевода',
    },
    {
        number: 90000,
        symbol: '+',
        text_ro: 'Proiecte finalizate',
        text_ru: 'Завершенных проектов',
    },
    {
        number: 80,
        symbol: '+',
        text_ro: 'Traducători',
        text_ru: 'Переводчики',
    },
]

export default function Performance() {
    const [viewPortEntered, setViewPortEntered] = useState(false)

    const router = useRouter()
    const { locale } = router

    return (
        <Section type="dark">
            <div className="performance-wrapper"></div>
            <div className="performance">
                <Title>{translate.title_performance[locale]}</Title>
                <Container>
                    {items.map((item) => (
                        <div key={item.text_ro} className="col">
                            <div className="performance__item">
                                <div className="performance__item-number">
                                    <CountUp
                                        duration={2}
                                        end={item.number}
                                        start={viewPortEntered ? null : 0}
                                    >
                                        {({ countUpRef }) => {
                                            return (
                                                <VisibilitySensor
                                                    active={!viewPortEntered}
                                                    onChange={(isVisible) => {
                                                        if (isVisible) {
                                                            setViewPortEntered(
                                                                true
                                                            )
                                                        }
                                                    }}
                                                    delayedCall
                                                >
                                                    <span ref={countUpRef} />
                                                </VisibilitySensor>
                                            )
                                        }}
                                    </CountUp>
                                    {item.symbol}
                                </div>
                                <div className="performance__item-text">
                                    {item['text_' + locale]}
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
        </Section>
    )
}
