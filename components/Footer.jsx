import Image from 'next/image'
import { Link } from 'react-scroll'
import { social } from '../utils'
import { useRouter } from 'next/router'

export default function Footer() {
    const router = useRouter()
    const { locale } = router
    return (
        <footer className="footer">
            <div className="footer__logo">
                <Link
                    to={'home'}
                    spy={true}
                    smooth={true}
                    duration={1500}
                    href={'#home'}
                    offset={-100}
                >
                    <Image src="/img/logo.svg" width="100" height="35" />
                </Link>
            </div>
            {locale === 'ro' && (
                <p className="footer__copyright">
                    &copy; 2021 Agenția Servicii Autorizate. Toate drepturile
                    rezervate.
                </p>
            )}

            {locale === 'ru' && (
                <p className="footer__copyright">
                    &copy; 2021 Агентство Авторизированных Услуг. Все права
                    защищены.
                </p>
            )}

            <ul className="social-footer">
                {Object.entries(social).map(([key, value]) => (
                    <li key={key} className="social-footer__item">
                        <a
                            href={value.link}
                            className="social-footer__link"
                            target="_blank"
                        >
                            <div className="social-footer__link-icon">
                                <Image
                                    src={'/img/social/' + value.img}
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    )
}
