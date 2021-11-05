import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Section, Container, Title, PriceItem } from '../components'

import { navigationItems, translate } from '../utils'

export default function PriceList({ languagesList, prices, documents }) {
    const router = useRouter()
    const { locale } = router

    // const [activeLevel, setActiveLevel] = useState(1)
    // const [searchTerm, setSearchTerm] = useState('')

    // const handlerLevel = (level) => {
    //     setActiveLevel(level)
    // }
    //
    // const editSerchTerm = (e) => {
    //     setSearchTerm(e.target.value)
    // }

    // const dynamicSearch = () => {
    //     return languagesList.filter((item) =>
    //         item['name_' + locale]
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase())
    //     )
    // }
    //
    // const getPrice = (lang, level) => {
    //     const price = prices.find(
    //         (item) => item.language_id === lang && item.level_id === level
    //     )
    //     return price ? price.price : '0'
    // }
    //
    // const getDocumentsByActiveLevel = documents.filter(
    //     (item) => item.level_id === activeLevel
    // )

    return (
        <Section id={navigationItems.languagesAndPrices.link}>
            <Title>{translate.title_languages[locale]}</Title>
            {/*<Container>*/}
            {/*    <div className="col-12 d-flex align-items-lg-center justify-content-lg-between flex-sm-row flex-column mb-4">*/}
            {/*        <div className="level">*/}
            {/*            <span className="level__placeholder">*/}
            {/*                Grad de complexitate:*/}
            {/*            </span>*/}

            {/*            <button*/}
            {/*                className={*/}
            {/*                    activeLevel === 1*/}
            {/*                        ? 'level__button level__button--active'*/}
            {/*                        : 'level__button'*/}
            {/*                }*/}
            {/*                onClick={() => handlerLevel(1)}*/}
            {/*            >*/}
            {/*                Nivelul 1*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className={*/}
            {/*                    activeLevel === 2*/}
            {/*                        ? 'level__button level__button--active'*/}
            {/*                        : 'level__button'*/}
            {/*                }*/}
            {/*                onClick={() => handlerLevel(2)}*/}
            {/*            >*/}
            {/*                Nivelul 2*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="input-search"*/}
            {/*            placeholder="Caută limba de traducere din listă"*/}
            {/*            value={searchTerm}*/}
            {/*            onChange={editSerchTerm}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</Container>*/}

            <PriceItem
                languagesList={languagesList}
                // getPrice={getPrice}includes(searchTerm.toLowerCase()
                // activeLevel={activeLevel}
            />

            {/*<Container>*/}
            {/*    <div className="col-12">*/}
            {/*        <div className="level__info">*/}
            {/*            <span className="level__info--accent">*/}
            {/*                Lista actelor pentru Nivelul {activeLevel}:*/}
            {/*            </span>*/}

            {/*            {getDocumentsByActiveLevel.map((item) => (*/}
            {/*                <span key={item.id}>*/}
            {/*                    {item['name_' + locale]},{' '}*/}
            {/*                </span>*/}
            {/*            ))}*/}

            {/*            <span>{locale === 'ro' ? 'etc.' : 'и т. д'}</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Container>*/}
        </Section>
    )
}
