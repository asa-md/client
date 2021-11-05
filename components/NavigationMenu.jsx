import Image from 'next/image'
import { useState } from 'react'
import { Link } from 'react-scroll'

import { navigationItems } from '../utils'
import { useRouter } from 'next/router'

export default function NavigationMenu({ translate }) {
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
                style={{ zIndex: 2 }}
                onClick={() => setHamburger(false)}
            >
                <Image src="/img/logo.svg" width="100" height="35" />
            </Link>
            <ul
                className={
                    hamburger ? 'navigation__menu open' : 'navigation__menu'
                }
            >
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
                <li className="navigation__item">
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
