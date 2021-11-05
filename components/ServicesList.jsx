import { useState } from 'react'
import Image from 'next/image'
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs'
import { useMediaQuery } from 'react-responsive'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    resetNextUuid,
} from 'react-accessible-accordion'

import { Title, Section, Container } from './index'
import {
    navigationItems,
    servicesList,
    servicesContent,
    translate,
} from '../utils'
import { useRouter } from 'next/router'

export default function ServicesList() {
    resetNextUuid()
    resetIdCounter()
    const router = useRouter()
    const { locale } = router

    const [icon, setIcon] = useState('')
    const [hover, setHover] = useState('')
    const [active, setActive] = useState('0')
    const [firstRender, setFirstRender] = useState(true)

    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 767.98px)',
    })

    const onMouseEnterHandler = (i) => {
        setIcon(servicesList[i].imgRed)
        setHover(i)
    }
    const onMouseLeaveHandler = (i) => {
        setIcon('')
        setHover('')
    }
    const clickHandler = (i) => {
        setFirstRender(false)
        setActive(i)
    }
    return (
        <Section id={navigationItems.services.link}>
            <Title>{translate.title_services[locale]}</Title>

            {isTabletOrMobile && (
                <Container>
                    <div className="col-12">
                        <Accordion>
                            {servicesList.map((item, i) => (
                                <AccordionItem key={item.title_ro}>
                                    <AccordionItemHeading
                                        onClick={() => clickHandler(i)}
                                    >
                                        <AccordionItemButton>
                                            <Image
                                                className="services-accordion__icon"
                                                src={
                                                    active === i
                                                        ? item.imgRed
                                                        : item.imgBlue
                                                }
                                                height="24"
                                                width="24"
                                                layout="fixed"
                                            />
                                            <span className="services-accordion__button-text">
                                                {item['title_' + locale]}
                                            </span>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <div
                                            className="simple-html"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    servicesContent[active][
                                                        'text_' + locale
                                                    ],
                                            }}
                                        ></div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </Container>
            )}

            {!isTabletOrMobile && (
                <Tabs className="services__tabs">
                    <Container>
                        <div className="col-lg-auto col-md-5 col-12">
                            <TabList className="services__tabs-list">
                                {servicesList.map((item, i) => (
                                    <Tab
                                        className="services__tab"
                                        key={item.title_ro}
                                        onMouseEnter={() =>
                                            onMouseEnterHandler(i)
                                        }
                                        onMouseLeave={() =>
                                            onMouseLeaveHandler(i)
                                        }
                                        onClick={() => clickHandler(i)}
                                    >
                                        <div className="services__tab-icon">
                                            {(firstRender && i === 0) ||
                                            active === i ? (
                                                <Image
                                                    src={item.imgRed}
                                                    height="20"
                                                    width="20"
                                                    layout="fixed"
                                                />
                                            ) : (
                                                <Image
                                                    src={
                                                        hover === i
                                                            ? icon
                                                            : item.imgBlue
                                                    }
                                                    height="20"
                                                    width="20"
                                                    layout="fixed"
                                                />
                                            )}
                                        </div>

                                        <span className="services__tab-text">
                                            {item['title_' + locale]}
                                        </span>
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                        <div className="col">
                            {servicesContent.map((item) => (
                                <TabPanel
                                    className="services__tabs-panel"
                                    key={item.text_ro}
                                >
                                    <div className="services__tabs-panel-content">
                                        <div className="services__tabs-panel-heading">
                                            <Image
                                                className="services__tabs-panel-icon"
                                                src={
                                                    servicesList[active].imgRed
                                                }
                                                height="30"
                                                width="30"
                                                layout="fixed"
                                            />
                                            <h3 className="services__tabs-panel-title">
                                                {
                                                    servicesList[active][
                                                        'title_' + locale
                                                    ]
                                                }
                                            </h3>
                                        </div>

                                        <div
                                            className="simple-html"
                                            dangerouslySetInnerHTML={{
                                                __html: item['text_' + locale],
                                            }}
                                        ></div>
                                    </div>
                                </TabPanel>
                            ))}
                        </div>
                    </Container>
                </Tabs>
            )}
        </Section>
    )
}
