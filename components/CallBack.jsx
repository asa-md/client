import { useState, useMemo, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import { Button } from './index'
import { useRouter } from 'next/router'
import { translate } from '../utils'
import SimpleReactValidator from 'simple-react-validator'
import { useDropzone } from 'react-dropzone'

Modal.setAppElement('#__next')
export default function CallBack({ languagesList }) {
    const router = useRouter()
    const { locale } = router

    const simpleValidator = useRef(new SimpleReactValidator({ locale: locale }))

    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [check, setCheck] = useState(false)
    const [finished, setFinished] = useState(false)

    const onSubmitHandler = () => {
        const fd = new FormData()

        fd.append('name', name)
        fd.append('phone', phone)

        async function post() {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', `${process.env.API}/callback`, true)
            xhr.withCredentials = true
            xhr.send(fd)
        }
        post()
        setFinished(true)

        if (typeof window !== "undefined") {
            if (window.fbq != null) {
                window.fbq('track', 'Contact');
            }
        }
    }

    const handlerCloseModalFinished = () => {
        setName('')
        setPhone('')
        setCheck(false)
        setFinished(false)
        closeModal()
    }

    return (
        <>
            <div id="uptocall-mini" onClick={openModal}>
                <span className="uptocall-mini-phone"></span>
            </div>
            <Modal className="callback-modal modal" isOpen={modalIsOpen}>
                {!finished && (
                    <div className="callback">
                        <h2 className="title">
                            {translate.modal_solicita[locale]}
                        </h2>
                        <p className="subtitle">
                            {translate.modal_solicita_subtitle[locale]}
                        </p>
                        <div className="modal__form">
                            <div className="input-block">
                                <div className="input-block__label">
                                    {translate.modal_what_name[locale]}
                                </div>
                                <input
                                    type="text"
                                    className="input-block__input"
                                    placeholder={
                                        translate.modal_name_info[locale]
                                    }
                                    value={name}
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={() =>
                                        simpleValidator.current.showMessageFor(
                                            'name'
                                        )
                                    }
                                />
                                {simpleValidator.current.message(
                                    'name',
                                    name,
                                    'required'
                                )}
                            </div>
                            <div className="input-block">
                                <div className="input-block__label">
                                    {translate.modal_phone[locale]}
                                </div>
                                <input
                                    type="number"
                                    className="input-block__input"
                                    placeholder={
                                        translate.modal_phone_input[locale]
                                    }
                                    value={phone}
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    onBlur={() =>
                                        simpleValidator.current.showMessageFor(
                                            'phone'
                                        )
                                    }
                                />
                                {simpleValidator.current.message(
                                    'phone',
                                    phone,
                                    'required'
                                )}
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="cb1"
                                    onChange={() => setCheck(!check)}
                                />
                                <label htmlFor="cb1">
                                    {translate.modal_check[locale]}
                                </label>
                            </div>
                        </div>
                        <div className="callback__buttons">
                            <button
                                className="callback__close"
                                onClick={closeModal}
                            >
                                {translate.modal_cancel[locale]}
                            </button>
                            {check && simpleValidator.current.allValid() && (
                                <Button
                                    text={translate.modal_btn_solicita[locale]}
                                    onClick={onSubmitHandler}
                                />
                            )}
                        </div>
                    </div>
                )}

                {finished && (
                    <div className="callback">
                        <div className="col-xl-12">
                            <div className="finished-container">
                                <div className="finished-circle">
                                    <svg
                                        width={30}
                                        height={30}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 30 28"
                                    >
                                        <path
                                            fill="#fff"
                                            d="M8.3 25.5l-5.8-7c-.8-.9-2.3-2.4-2.4-2.7-.3-.8 0-1.8.8-2.5.5-.4.8-.5 1.5-.5s1 0 1.5.5c1.1 1 4.2 4.5 5.2 6 .7 1.1 1 1 2.3-1.1C15.5 11.9 20.2 6.6 25 2.8A17 17 0 0130 0l-2.3 2.4a60.9 60.9 0 00-10.3 12.8c-1 1.4-3.4 5.7-4.8 8.5-2.1 4.3-2.1 4.3-2.3 4.3-.8-.8-1.3-1.7-2-2.5z"
                                        />
                                    </svg>
                                </div>
                                <span
                                    style={{
                                        fontSize: '24px',
                                        lineHeight: '40px',
                                        color: '#0B626B',
                                        marginTop: '30px',
                                    }}
                                >
                                    {translate.modal_solicitare_title_1[locale]}
                                </span>
                                <span
                                    style={{
                                        fontSize: '16px',
                                        marginTop: '20px',
                                        color: '#103464',
                                        fontWeight: 300,
                                    }}
                                >
                                    {translate.modal_finished_title_2[locale]}
                                </span>
                                <span
                                    style={{
                                        fontSize: '20px',
                                        lineHeight: '40px',
                                        color: '#103464',
                                        marginTop: '30px',
                                        marginBottom: '60px',
                                    }}
                                >
                                    {translate.modal_finished_title_3[locale]}
                                </span>
                                <Button
                                    text={
                                        translate.modal_btn_close_finished[
                                            locale
                                        ]
                                    }
                                    onClick={handlerCloseModalFinished}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}
