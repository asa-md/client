import Image from 'next/image'

import { Container } from '../components'
import { useRouter } from 'next/router'

export default function PriceItem({ languagesList, getPrice, activeLevel }) {
    const router = useRouter()
    const { locale } = router

    return (
        <div className="language">
            <Container>
                {languagesList.map((item) => (
                    <div
                        key={item.id}
                        className="col-xl-2 col-md-3 col-sm-4 col-6"
                    >
                        <div className="language__item">
                            <div className="language__img">
                                <Image
                                    src={'/img/flag/' + item.icon + '.svg'}
                                    alt={item.name_ro}
                                    width="30"
                                    height="20"
                                />
                            </div>
                            <div className="language__title">
                                {item['name_' + locale]}
                            </div>
                            {/*<div className="language__price">*/}
                            {/*    {getPrice(item.id, activeLevel)} lei*/}
                            {/*</div>*/}
                        </div>
                    </div>
                ))}
                {!languagesList.length && (
                    <div className="language__not-found">
                        Limba introdusă nu a fost găsită!
                        <span
                            style={{
                                display: 'block',
                                fontSize: '18px',
                                marginTop: '10px',
                            }}
                        >
                            Verificați corectitudinea textului și încercați încă
                            odată.
                        </span>
                    </div>
                )}
            </Container>
        </div>
    )
}
