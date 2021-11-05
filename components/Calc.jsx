import dynamic from 'next/dynamic'

import { Section, Container, Button, Title, BlockInfo } from './index'
const MySelect = dynamic(() => import('./MySelect'), { ssr: false })

import { navigationItems } from '../utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Calc({ languagesList, documents, prices }) {
    const router = useRouter()
    const { locale } = router
    const [fromLang, setFromLang] = useState('')
    const [whatLang, setWhatLang] = useState('')
    const [typeDoc, setTypeDoc] = useState('')
    const [count, setCount] = useState(1)

    let languagesOptions = [
        { value: 'romana', label: locale === 'ro' ? 'Română' : 'Румынский' },
    ]
    const documentsOptions = []

    const languagesListToOptions = (arr) => {
        arr.map((item) => {
            languagesOptions.push({
                value: item.id,
                label: item['name_' + locale],
            })
        })
    }

    const documentsToOptions = (arr) => {
        arr.map((item) => {
            documentsOptions.push({
                value: item.id,
                label: item['name_' + locale],
            })
        })
    }

    languagesListToOptions(languagesList)
    documentsToOptions(documents)

    function handleChangeFromLang(newValue) {
        setFromLang(newValue.value)
    }

    function handleChangeWhatLang(newValue) {
        setWhatLang(newValue.value)
    }
    function handleChangeTypeDoc(newValue) {
        setTypeDoc(newValue.value)
    }

    function getTotalPrice(fromLang, whatLang, doc) {
        if (fromLang && whatLang && doc) {
            if ('romana' === fromLang && 'romana' !== whatLang) {
                const idLevel = documents[doc - 1].level_id
                const price = prices.find(
                    (item) =>
                        item.language_id === whatLang &&
                        item.level_id === idLevel
                )

                const total = Number(price.price) * Number(count)
                return total ? total : '0'
            } else if ('romana' !== fromLang && 'romana' === whatLang) {
                const idLevel = documents[doc - 1].level_id
                const price = prices.find(
                    (item) =>
                        item.language_id === fromLang &&
                        item.level_id === idLevel
                )
                console.log(price)

                const total = Number(price.price) * Number(count)
                return total ? total : '0'
            }
        }
        return '0'
    }

    return (
        <Section type="dark" id={navigationItems.calc.link}>
            <Container>
                <Title>Calculator online al costurilor de traducere</Title>
                <div className="col-xxl-6 col-xl-7">
                    <div className="row">
                        <div className="col-sm-6 col-12">
                            <MySelect
                                options={languagesOptions}
                                label="Din ce limbă traducem"
                                placeholder="Selectați limba"
                                onChange={handleChangeFromLang}
                            />
                        </div>
                        <div className="col-sm-6 col-12">
                            <MySelect
                                options={languagesOptions}
                                label="În ce limbă traducem"
                                placeholder="Selectați limba"
                                onChange={handleChangeWhatLang}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-12">
                            <MySelect
                                options={documentsOptions}
                                label="Tipul documentului"
                                placeholder="Selectați tipul documentului"
                                onChange={handleChangeTypeDoc}
                            />
                        </div>
                        <div className="col-sm-6 col-12">
                            <div className="input-block">
                                <div className="input-block__label">
                                    Numărul de pagini
                                </div>
                                <input
                                    type="number"
                                    className="input-block__input"
                                    placeholder="Introduce-ți numărul de pagini"
                                    min="1"
                                    max="100"
                                    defaultValue={count}
                                    onChange={(e) => setCount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-sm-between mt-4 mb-4 flex-sm-row flex-column-reverse">
                        <div className="col-auto mb-sm-0 mt-sm-0 mt-4 mb-4">
                            <Button />
                        </div>
                        <div className="col-auto mb-sm-0 mt-sm-0 mt-4 mb-4">
                            <div className="price">
                                <span className="price__text">Preț:</span>
                                <span className="price__result">
                                    {getTotalPrice(fromLang, whatLang, typeDoc)}{' '}
                                    lei
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <BlockInfo>
                                Atenție! Prețurile afișate de calculator nu sunt
                                fixe ci doar o aproximație, după simulare când
                                dumneavoastră comandați traducere, veți fi
                                contactat de un manager care v-a preciza prețul
                                final.
                            </BlockInfo>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
