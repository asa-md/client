import { Link } from 'react-scroll'

import { navigationItems } from '../utils'
import { useRouter } from 'next/router'

export default function DotsNavigation() {
    const router = useRouter()
    const { locale } = router

    return (
        <nav className="dots-navigation">
            <ul className="dots-navigation__list">
                {Object.entries(navigationItems).map(([key, value]) => (
                    <li key={value.link} className="dots-navigation__item">
                        <Link
                            activeClass="dots-navigation__link--active"
                            to={value.link}
                            spy={true}
                            smooth={true}
                            duration={1500}
                            href={'#' + value.link}
                            offset={-100}
                            className="dots-navigation__link"
                        >
                            <span className="text">
                                {value['text_' + locale]}
                            </span>
                            <span className="dot"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
