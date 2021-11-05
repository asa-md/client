import React, { useState } from 'react'
import Image from 'next/image'
import ModalVideo from 'react-modal-video'

import { NavigationMenu, Container, OrderModal, DotsNavigation, Button } from './index'

import { social, translate } from '../utils'
import { useRouter } from 'next/router'

export default function FirstBlock({ languagesList, video }) {
    const router = useRouter()
    const { locale } = router

    const [isOpenVideo, setOpenVideo] = useState(false)

    const handlerVideo = () => {
        setOpenVideo(false)
        if (typeof window !== "undefined") {
            if (window.fbq != null) {
                window.fbq('track', 'ViewContent');
            }
        }
    }

    return (
        <header className="first-block" id="home">
            <div className="image">
                <div className="image__wrapper">
                    <Image
                        src="/img/girl1.png"
                        alt=""
                        width="1000"
                        height="977"
                    />
                </div>
            </div>
            <NavigationMenu />
            <div className="first-block__wrapper">
                <div className="first-block__social">
                    <ul className="social">
                        {Object.entries(social).map(([key, value]) => (
                            <li key={key} className="social__item">
                                <a
                                    href={value.link}
                                    className="social__link"
                                    target="_blank"
                                >
                                    <div className="social__link-icon">
                                        <Image
                                            src={'/img/social/' + value.img}
                                            width="20"
                                            height="20"
                                        />
                                    </div>

                                    <span className="social__link-text">
                                        {value.text}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <span className="first-block__social-follow">
                        {translate.urmariti_ne[locale]}
                    </span>
                </div>
                <div className="first-block__container">
                    <Container>
                        <div className="col-xl-6 col-lg-7 col-md-8 col-sm-8">
                            <h1 className="title first-block__title">
                                <span className="first-block__title-line">
                                    {translate.agentia[locale]}
                                </span>
                                <span>
                                    {translate.servicii_autorizate[locale]}
                                </span>
                            </h1>
                            <p className="first-block__subtitle">
                                {translate.slogan[locale]}
                            </p>
                        </div>
                    </Container>
                    <Container>
                        <div className="col-lg-6 col-sm-5 col-12 d-flex justify-content-lg-between align-items-lg-center mt-4 flex-lg-row flex-column align-items-sm-start align-items-center">
                            <OrderModal languagesList={languagesList} />
                            {video && (
                                <div className="play__container">
                                    <React.Fragment>
                                        <ModalVideo
                                            channel="youtube"
                                            autoplay
                                            isOpen={isOpenVideo}
                                            videoId={video}
                                            loop={true}
                                            showinfo={false}
                                            onClose={handlerVideo}
                                        />
                                        <button
                                            className="play mt-lg-0 mt-5"
                                            onClick={() => setOpenVideo(true)}
                                        >
                                            <span className="play__circle">
                                                <div className="play__icon">
                                                    <Image
                                                        src="/img/icons/play.svg"
                                                        alt="Play"
                                                        width="16"
                                                        height="26"
                                                    />
                                                </div>
                                            </span>
                                            <span className="play__text">
                                                {translate.video[locale]}
                                            </span>
                                        </button>
                                    </React.Fragment>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
                <div className="first-block__navigation">
                    {<DotsNavigation />}
                </div>
            </div>
        </header>
    )
}
