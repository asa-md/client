import Image from 'next/image'

import { Title, Section, Container, OrderModal } from './index'
import React from 'react'

export default function SimpleBlock({ children, title, img, languagesList }) {
    return (
        <Section>
            <Title>{title}</Title>
            <Container rowClasses="flex-wrap-reverse">
                <div className="col-xl-6 col-lg-7">
                    <div style={{ fontSize: '18px', marginBottom: '40px' }}>
                        {children}
                    </div>

                    <OrderModal languagesList={languagesList} />
                </div>
                <div className="col">
                    <Image src={img} width="1200" height="750" alt={title} />
                </div>
            </Container>
        </Section>
    )
}
