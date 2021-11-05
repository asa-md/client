import Image from 'next/image'

import { BlockInfo, Title, Section, Container, OrderModal } from './index'
import React from 'react'
import { translate } from '../utils'
import { useRouter } from 'next/router'

const items = [
    {
        img: 'sync_files.svg',
        text_ro: 'Transmiteți documentele',
        text_ru: 'Отправляете документы',
    },
    {
        img: 'file_analysis.svg',
        text_ro: 'Noi analizăm textul',
        text_ru: 'Мы анализируем текст',
    },
    {
        img: 'mobile_marketing.svg',
        text_ro: 'Vă contactăm',
        text_ru: 'Связываемся с вами',
    },
    {
        img: 'payments.svg',
        text_ro: 'Achitați',
        text_ru: 'Оплачиваете',
    },
    {
        img: 'to_do_list.svg',
        text_ro: 'Traducem documentele',
        text_ru: 'Переводим документы',
    },
    {
        img: 'newsletter.svg',
        text_ro: 'Vă transmitem traducerea',
        text_ru: 'Отправляем вам перевод',
    },
]

export default function HowGetTranslation({ languagesList }) {
    const router = useRouter()
    const { locale } = router
    return (
        <Section>
            <Title>{translate.title_how_get[locale]}</Title>
            <Container
                className="how-get"
                rowClasses="justify-content-center equal"
            >
                {items.map((item) => (
                    <div
                        className="col-xxl-2 col-xl-2 col-md-4 col-sm-4 col-6"
                        key={item.text_ro}
                    >
                        <div className="how-get__item">
                            <Image
                                src={'/img/' + item.img}
                                alt={item['text_' + locale]}
                                width="140"
                                height="140"
                            />
                            <p className="how-get__text">
                                {item['text_' + locale]}
                            </p>
                        </div>
                    </div>
                ))}
            </Container>
            <Container>
                <div className="col-12">
                    {locale === 'ro' && (
                        <BlockInfo>
                            Dumneavoastră transmiteți documentele, noi analizăm
                            textul, vă contactăm și confirmăm comanda! După
                            confirmarea comenzii achitați suma stabilită. Apoi
                            traducem documentele solicitate și vă transmitem
                            traducerea solicitată.
                        </BlockInfo>
                    )}
                    {locale === 'ru' && (
                        <BlockInfo>
                            Вы отправляете документы, мы анализируем текст,
                            связываемся с вами и подтверждаем заказ! После
                            подтверждения заказа вы оплачиваете оговоренную
                            сумму. Затем мы переводим документы и высылаем вам
                            запрошенный перевод.
                        </BlockInfo>
                    )}
                </div>
                <div className="col-12 d-flex justify-content-center mt-5">
                    <OrderModal languagesList={languagesList} />
                </div>
            </Container>
        </Section>
    )
}
