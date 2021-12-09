import Image from 'next/image'
import { useState } from 'react'
import { Link } from 'react-scroll'

import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

export default function NavigationMenu() {
    const [hamburger, setHamburger] = useState(false)
    const router = useRouter()
    const { locale } = router

    return (
        <nav className={hamburger ? 'navigation open' : 'navigation'}>
            <Link
                to={'home'}
                spy={true}
                smooth={true}
                duration={1500}
                href={'#home'}
                offset={-100}
                style={{ zIndex: 2, flex: '0 0 auto' }}
                onClick={() => setHamburger(false)}
            >
                <Image src="/img/logo.svg" width="70" height="25" />
            </Link>
            <ul
                className={
                    hamburger ? 'navigation__menu open' : 'navigation__menu'
                }
            >
                <li
                    className="navigation__item d-sm-none d-block"
                    style={{ width: '85%' }}
                >
                    <div className="navigation__phone-wrapper">
                        <div style={{ marginBottom: 10 }}>
                            <Image
                                src="/img/icons/icons-blue/phone.svg"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="navigation__phone">
                            <a href="tel:+37368853504">
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 100,
                                        opacity: 0.7,
                                    }}
                                >
                                    {translate.chisinau_centru[locale]}:
                                </div>
                                <div>068 853 504</div>
                            </a>
                            <span className="navigation__phone-span">/</span>
                            <a href="tel:+37378150555">
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 100,
                                        opacity: 0.7,
                                    }}
                                >
                                    {translate.chisinau_botanica[locale]}:
                                </div>
                                <div>078 150 555</div>
                            </a>
                        </div>
                    </div>
                </li>
                {Object.entries(navigationItems).map(([key, value]) => (
                    <li key={value.link} className="navigation__item">
                        <Link
                            activeClass="navigation__link--active"
                            to={value.link}
                            spy={true}
                            smooth={true}
                            duration={1500}
                            href={'#' + value.link}
                            offset={-100}
                            className="navigation__link"
                            onClick={() => setHamburger(false)}
                        >
                            {value['text_' + locale]}
                        </Link>
                    </li>
                ))}
                <li className="navigation__item d-xl-none d-flex">
                    {locale === 'ru' && (
                        <button
                            className="navigation__lang d-xl-none d-flex"
                            onClick={() => {
                                router.push('/', '/', { locale: 'ro' })
                            }}
                        >
                            <span className="icon">
                                <Image
                                    src="/img/icons/language.svg"
                                    width={18}
                                    height={18}
                                />
                            </span>
                            <span>Romana</span>
                        </button>
                    )}

                    {locale === 'ro' && (
                        <button
                            className="navigation__lang d-xl-none d-flex"
                            onClick={() => {
                                router.push('/', '/', { locale: 'ru' })
                            }}
                        >
                            <span className="icon">
                                <Image
                                    src="/img/icons/language.svg"
                                    width={18}
                                    height={18}
                                />
                            </span>
                            <span>Русский</span>
                        </button>
                    )}
                </li>
            </ul>

            <div className="navigation__phone-wrapper d-sm-flex d-none">
                <Image
                    src="/img/icons/icons-blue/phone.svg"
                    width={20}
                    height={20}
                />
                <div className="navigation__phone">
                    <a href="tel:+37368853504">
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 100,
                                opacity: 0.7,
                            }}
                        >
                            {translate.chisinau_centru[locale]}
                        </div>
                        <div>068 853 504</div>
                    </a>
                    <span className="navigation__phone-span">/</span>
                    <a href="tel:+37378150555">
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 100,
                                opacity: 0.7,
                            }}
                        >
                            {translate.chisinau_botanica[locale]}
                        </div>
                        <div>078 150 555</div>
                    </a>
                </div>
            </div>

            {locale === 'ru' && (
                <button
                    className="navigation__lang"
                    onClick={() => {
                        router.push('/', '/', { locale: 'ro' })
                    }}
                >
                    <span className="icon">
                        <Image
                            src="/img/icons/language.svg"
                            width={18}
                            height={18}
                        />
                    </span>
                    <span>Romana</span>
                </button>
            )}

            {locale === 'ro' && (
                <button
                    className="navigation__lang"
                    onClick={() => {
                        router.push('/', '/', { locale: 'ru' })
                    }}
                >
                    <span className="icon">
                        <Image
                            src="/img/icons/language.svg"
                            width={18}
                            height={18}
                        />
                    </span>
                    <span>Русский</span>
                </button>
            )}

            <button
                className={hamburger ? 'btn-menu open' : 'btn-menu'}
                onClick={() => setHamburger((hamburger) => !hamburger)}
            >
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
            </button>
        </nav>
    )
}
