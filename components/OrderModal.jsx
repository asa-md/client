import { useState, useMemo, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import dynamic from 'next/dynamic'
import { Button } from './index'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/router'
import SimpleReactValidator from 'simple-react-validator'
import { translate } from '../utils'

SimpleReactValidator.addLocale('ro', {
    required: 'Acest câmp este obligatoriu.',
    email: 'În acest câmp trebuie să fie o adresă de e-mail validă.',
})
SimpleReactValidator.addLocale('ru', {
    required: 'Это поле обязательно для заполнения.',
    email: 'В этом поле должен быть действующий адрес электронной почты.',
})

Modal.setAppElement('#__next')
const MySelect = dynamic(() => import('./MySelect'), { ssr: false })

const stepsList = [
    { id: 1, name_ro: 'Date personale', name_ru: 'Личные данные' },
    { id: 2, name_ro: 'Limba de traducere', name_ru: 'Язык оригинала' },
    {
        id: 3,
        name_ro: 'Încărcarea documentelor',
        name_ru: 'Загрузка документов',
    },
]

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border .3s ease-in-out',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
}

const activeStyle = {
    borderColor: '#2196f3',
}

const acceptStyle = {
    borderColor: '#00e676',
}

const rejectStyle = {
    borderColor: '#ff1744',
}

export default function OrderModal({ languagesList }) {
    const router = useRouter()
    const { locale } = router

    const simpleValidator = useRef(new SimpleReactValidator({ locale: locale }))

    const [activeSteps, setActiveSteps] = useState(1)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [notes, setNotes] = useState('')
    const [fromLang, setFromLang] = useState('')
    const [whatLang, setWhatLang] = useState('')
    const [legalization, setLegalization] = useState('')
    const [check, setCheck] = useState(false)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        if (activeSteps === 2) {
            setFromLang('')
            setWhatLang('')
            setLegalization('')
        }
        if (activeSteps === 3) {
            setCheck(false)
        }
    }, [activeSteps])

    let languagesOptions = [
        { value: 'Română', label: locale === 'ro' ? 'Română' : 'Румынский' },
    ]

    const languagesListToOptions = (arr) => {
        arr.map((item) => {
            languagesOptions.push({
                value: item.name_ro,
                label: item['name_' + locale],
            })
        })
    }
    languagesListToOptions(languagesList)

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        maxSize: '2050000', // 2 MB
        accept:
            'image/jpeg,image/png,application/msword,application/pdf,application/zip,application/x-rar-compressed',
    })

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    )

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li className="acceptedFiles__item" key={file.path}>
            <span className="icon">
                <svg
                    width={12}
                    height={12}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 28"
                >
                    <path
                        fill="#fff"
                        d="M8.3 25.5l-5.8-7c-.8-.9-2.3-2.4-2.4-2.7-.3-.8 0-1.8.8-2.5.5-.4.8-.5 1.5-.5s1 0 1.5.5c1.1 1 4.2 4.5 5.2 6 .7 1.1 1 1 2.3-1.1C15.5 11.9 20.2 6.6 25 2.8A17 17 0 0130 0l-2.3 2.4a60.9 60.9 0 00-10.3 12.8c-1 1.4-3.4 5.7-4.8 8.5-2.1 4.3-2.1 4.3-2.3 4.3-.8-.8-1.3-1.7-2-2.5z"
                    />
                </svg>
            </span>
            <span>{file.path}</span>
        </li>
    ))

    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
        if (typeof window !== 'undefined') {
            if (window.fbq != null) {
                window.fbq('track', 'InitiateCheckout')
            }
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    const handlerCloseModalFinished = () => {
        setActiveSteps(1)
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setNotes('')
        setFromLang('')
        setWhatLang('')
        setLegalization('')
        setCheck(false)
        setFinished(false)
        closeModal()
    }

    function handleClickPrev() {
        setActiveSteps(activeSteps - 1)
    }

    function handleClickNext() {
        if (activeSteps + 1 <= stepsList.length) {
            setActiveSteps(activeSteps + 1)
        }
    }

    const onSubmitHandler = () => {
        setFinished(true)
        const fd = new FormData()

        fd.append('first_name', firstName)
        fd.append('last_name', lastName)
        fd.append('phone', phone)
        fd.append('email', email)
        fd.append('notes', notes)
        fd.append('from_lang', fromLang)
        fd.append('what_lang', whatLang)
        fd.append('legalization', legalization)

        async function firebase() {
            await acceptedFiles.forEach((file, index) => {
                fd.append('files[]', file)
            })
        }
        firebase()
        async function post() {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', `${process.env.API}/order`, true)
            xhr.withCredentials = true
            // xhr.onload = () => {
            //     console.log(fd.entries())
            // }
            // xhr.onerror = (evt) => rej(evt)
            xhr.upload.onprogress = (event) => {
                // console.log(event)
            }

            xhr.send(fd)
            // console.log(xhr.response)
        }
        post()

        if (typeof window !== 'undefined') {
            if (window.fbq != null) {
                window.fbq('track', 'Lead')
            }
        }
    }

    return (
        <>


            <div style={{ display: locale === 'ru' ? 'block' : 'none' }}>
                {/* <script
                    data-b24-form="click/12/m9k2j4"
                    data-skip-moving="true"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,u){ var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0); var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h); })(window,document,'https://cdn-ru.bitrix24.ru/b18465378/crm/form/loader_12.js');`,
                    }}
                /> */}
                <Button text={translate.btn[locale]} />
            </div>
            <div style={{ display: locale === 'ro' ? 'block' : 'none' }}>
                {/* <script
                    data-b24-form="click/10/yfq96d"
                    data-skip-moving="true"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,u){ var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0); var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h); })(window,document,'https://cdn-ru.bitrix24.ru/b18465378/crm/form/loader_10.js');`,
                    }}
                /> */}
                <Button text={translate.btn[locale]} />
            </div>



























            {/*<Button onClick={openModal} text={translate.btn[locale]} />*/}
            {/*<Modal isOpen={modalIsOpen}>*/}
            {/*    <div className="container-xl modal" style={{ height: '100%' }}>*/}
            {/*        {!finished && (*/}
            {/*            <div className="row" style={{ height: '100%' }}>*/}
            {/*                <div className="col-xl-5 col-lg-5 modal__info">*/}
            {/*                    <div className="modal__info-container">*/}
            {/*                        <h1 className="modal__info-title">*/}
            {/*                            {translate.modal_title[locale]}*/}
            {/*                        </h1>*/}
            {/*                        {activeSteps === 1 && (*/}
            {/*                            <p className="modal__info-text">*/}
            {/*                                {*/}
            {/*                                    translate.modal_step_1_info[*/}
            {/*                                        locale*/}
            {/*                                    ]*/}
            {/*                                }*/}
            {/*                            </p>*/}
            {/*                        )}*/}
            {/*                        {activeSteps === 2 && (*/}
            {/*                            <p className="modal__info-text">*/}
            {/*                                {*/}
            {/*                                    translate.modal_step_2_info[*/}
            {/*                                        locale*/}
            {/*                                    ]*/}
            {/*                                }*/}
            {/*                            </p>*/}
            {/*                        )}*/}
            {/*                        {activeSteps === 3 && (*/}
            {/*                            <p className="modal__info-text">*/}
            {/*                                {*/}
            {/*                                    translate.modal_step_3_info[*/}
            {/*                                        locale*/}
            {/*                                    ]*/}
            {/*                                }*/}
            {/*                            </p>*/}
            {/*                        )}*/}
            {/*                        <button*/}
            {/*                            className="modal__info-close"*/}
            {/*                            onClick={closeModal}*/}
            {/*                        >*/}
            {/*                            {translate.modal_cancel[locale]}*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="col-xl-7 col-lg-7">*/}
            {/*                    <div className="modal__content">*/}
            {/*                        <div className="modal__steps">*/}
            {/*                            <ul className="modal__steps-ul">*/}
            {/*                                {stepsList.map((item) => (*/}
            {/*                                    <li*/}
            {/*                                        onClick={() =>*/}
            {/*                                            setActiveSteps(item.id)*/}
            {/*                                        }*/}
            {/*                                        key={item.id}*/}
            {/*                                        className={*/}
            {/*                                            'modal__steps-li' +*/}
            {/*                                            (activeSteps === item.id*/}
            {/*                                                ? ' active'*/}
            {/*                                                : '') +*/}
            {/*                                            (activeSteps > item.id*/}
            {/*                                                ? ' compleated'*/}
            {/*                                                : '')*/}
            {/*                                        }*/}
            {/*                                    >*/}
            {/*                                        <span className="number">*/}
            {/*                                            {item.id}*/}
            {/*                                        </span>*/}
            {/*                                        <span>*/}
            {/*                                            {item['name_' + locale]}*/}
            {/*                                        </span>*/}
            {/*                                    </li>*/}
            {/*                                ))}*/}
            {/*                            </ul>*/}
            {/*                        </div>*/}
            {/*                        {activeSteps === 1 && (*/}
            {/*                            <div className="modal__form">*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <div className="input-block__label">*/}
            {/*                                        {*/}
            {/*                                            translate*/}
            {/*                                                .modal_first_name[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <input*/}
            {/*                                        type="text"*/}
            {/*                                        className="input-block__input"*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_first_name_input[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        name="firstName"*/}
            {/*                                        value={firstName}*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setFirstName(*/}
            {/*                                                e.target.value*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                        onBlur={() =>*/}
            {/*                                            simpleValidator.current.showMessageFor(*/}
            {/*                                                'name'*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                    {simpleValidator.current.message(*/}
            {/*                                        'name',*/}
            {/*                                        firstName,*/}
            {/*                                        'required'*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <div className="input-block__label">*/}
            {/*                                        {*/}
            {/*                                            translate*/}
            {/*                                                .modal_last_name[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <input*/}
            {/*                                        type="text"*/}
            {/*                                        className="input-block__input"*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_last_name_input[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        name="lastName"*/}
            {/*                                        value={lastName}*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setLastName(*/}
            {/*                                                e.target.value*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                        onBlur={() =>*/}
            {/*                                            simpleValidator.current.showMessageFor(*/}
            {/*                                                'name'*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                    {simpleValidator.current.message(*/}
            {/*                                        'name',*/}
            {/*                                        lastName,*/}
            {/*                                        'required'*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <div className="input-block__label">*/}
            {/*                                        {*/}
            {/*                                            translate.modal_phone[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <input*/}
            {/*                                        type="number"*/}
            {/*                                        className="input-block__input"*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_phone_input[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        name="phone"*/}
            {/*                                        value={phone}*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setPhone(e.target.value)*/}
            {/*                                        }*/}
            {/*                                        onBlur={() =>*/}
            {/*                                            simpleValidator.current.showMessageFor(*/}
            {/*                                                'name'*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                    {simpleValidator.current.message(*/}
            {/*                                        'name',*/}
            {/*                                        phone,*/}
            {/*                                        'required'*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <div className="input-block__label">*/}
            {/*                                        {*/}
            {/*                                            translate.modal_email[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <input*/}
            {/*                                        type="email"*/}
            {/*                                        className="input-block__input"*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_email_input[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        name="email"*/}
            {/*                                        value={email}*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setEmail(e.target.value)*/}
            {/*                                        }*/}
            {/*                                        onBlur={() =>*/}
            {/*                                            simpleValidator.current.showMessageFor(*/}
            {/*                                                'name'*/}
            {/*                                            )*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                    {simpleValidator.current.message(*/}
            {/*                                        'name',*/}
            {/*                                        email,*/}
            {/*                                        'required|email'*/}
            {/*                                    )}*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <div className="input-block__label">*/}
            {/*                                        {*/}
            {/*                                            translate.modal_notes[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <input*/}
            {/*                                        type="email"*/}
            {/*                                        className="input-block__input"*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_notes_input[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        name="notes"*/}
            {/*                                        value={notes}*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setNotes(e.target.value)*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        )}*/}
            {/*                        {activeSteps === 2 && (*/}
            {/*                            <div className="modal__form">*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <MySelect*/}
            {/*                                        options={languagesOptions}*/}
            {/*                                        label={*/}
            {/*                                            translate*/}
            {/*                                                .modal_from_lang[*/}
            {/*                                                locale*/}
            {/*                                                ]*/}
            {/*                                        }*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_select_lang[*/}
            {/*                                                locale*/}
            {/*                                                ]*/}
            {/*                                        }*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setFromLang(e.value)*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <MySelect*/}
            {/*                                        options={languagesOptions}*/}
            {/*                                        label={*/}
            {/*                                            translate*/}
            {/*                                                .modal_what_lang[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_select_lang[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setWhatLang(e.value)*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div className="input-block">*/}
            {/*                                    <MySelect*/}
            {/*                                        options={[*/}
            {/*                                            {*/}
            {/*                                                value:*/}
            {/*                                                    'Fără legalizare notarială',*/}
            {/*                                                label:*/}
            {/*                                                    locale === 'ro'*/}
            {/*                                                        ? 'Fără legalizare notarială'*/}
            {/*                                                        : 'Без нотариального заверенния',*/}
            {/*                                            },*/}
            {/*                                            {*/}
            {/*                                                value:*/}
            {/*                                                    'Cu legalizare notarială',*/}
            {/*                                                label:*/}
            {/*                                                    locale === 'ro'*/}
            {/*                                                        ? 'Cu legalizare notarială'*/}
            {/*                                                        : 'С нотариальным заверением',*/}
            {/*                                            },*/}
            {/*                                            {*/}
            {/*                                                value:*/}
            {/*                                                    'Cu legalizare notarială + apostilă',*/}
            {/*                                                label:*/}
            {/*                                                    locale === 'ro'*/}
            {/*                                                        ? 'Cu legalizare notarială + apostilă'*/}
            {/*                                                        : 'С нотариальным заверением + Апостиль',*/}
            {/*                                            },*/}
            {/*                                        ]}*/}
            {/*                                        label={*/}
            {/*                                            translate*/}
            {/*                                                .modal_legalization[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        placeholder={*/}
            {/*                                            translate*/}
            {/*                                                .modal_select_legalization[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        onChange={(e) =>*/}
            {/*                                            setLegalization(e.label)*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        )}*/}
            {/*                        {activeSteps === 3 && (*/}
            {/*                            <div className="modal__form">*/}
            {/*                                <section>*/}
            {/*                                    <div*/}
            {/*                                        {...getRootProps({*/}
            {/*                                            style,*/}
            {/*                                            className: 'dropzone',*/}
            {/*                                        })}*/}
            {/*                                    >*/}
            {/*                                        <input*/}
            {/*                                            {...getInputProps()}*/}
            {/*                                        />*/}
            {/*                                        <p*/}
            {/*                                            className="modal__dropzone-text"*/}
            {/*                                            style={{*/}
            {/*                                                textAlign: 'center',*/}
            {/*                                            }}*/}
            {/*                                        >*/}
            {/*                                            <svg*/}
            {/*                                                fill="none"*/}
            {/*                                                viewBox="0 0 60 60"*/}
            {/*                                                height={60}*/}
            {/*                                                width={60}*/}
            {/*                                            >*/}
            {/*                                                <path*/}
            {/*                                                    fill="#E0E0E0"*/}
            {/*                                                    d="M48.88 18.03a16.96 16.96 0 00-33.16-6c-.25-.02-.5-.02-.74-.02a14.97 14.97 0 000 29.93h9a1 1 0 000-2h-9a12.97 12.97 0 111.38-25.86c.49.04.94-.28 1.07-.75a14.97 14.97 0 0129.36 5.66 1 1 0 001 1h.12a9.98 9.98 0 110 19.96h-11.9a1 1 0 100 2h11.9a11.98 11.98 0 00.97-23.92z"*/}
            {/*                                                />*/}
            {/*                                                <path*/}
            {/*                                                    fill="#E0E0E0"*/}
            {/*                                                    d="M41.95 30.57l-12-12-12 12 1.42 1.41 9.58-9.58v37.5h2V22.4l9.58 9.58 1.42-1.4z"*/}
            {/*                                                />*/}
            {/*                                            </svg>*/}
            {/*                                            {!isDragActive ? (*/}
            {/*                                                <span className="title">*/}
            {/*                                                    {*/}
            {/*                                                        translate*/}
            {/*                                                            .modal_trage[*/}
            {/*                                                            locale*/}
            {/*                                                        ]*/}
            {/*                                                    }*/}
            {/*                                                </span>*/}
            {/*                                            ) : (*/}
            {/*                                                <span className="title">*/}
            {/*                                                    {isDragReject ? (*/}
            {/*                                                        <span>*/}
            {/*                                                            {*/}
            {/*                                                                translate*/}
            {/*                                                                    .modal_nu_cerinte[*/}
            {/*                                                                    locale*/}
            {/*                                                                ]*/}
            {/*                                                            }*/}
            {/*                                                        </span>*/}
            {/*                                                    ) : (*/}
            {/*                                                        <span>*/}
            {/*                                                            {*/}
            {/*                                                                translate*/}
            {/*                                                                    .modal_plaseaza[*/}
            {/*                                                                    locale*/}
            {/*                                                                ]*/}
            {/*                                                            }*/}
            {/*                                                        </span>*/}
            {/*                                                    )}*/}
            {/*                                                </span>*/}
            {/*                                            )}*/}
            {/*                                            <span className="or">*/}
            {/*                                                {locale === 'ro'*/}
            {/*                                                    ? 'sau'*/}
            {/*                                                    : 'или'}*/}
            {/*                                            </span>*/}
            {/*                                            <span className="btn">*/}
            {/*                                                {*/}
            {/*                                                    translate*/}
            {/*                                                        .modal_upload[*/}
            {/*                                                        locale*/}
            {/*                                                    ]*/}
            {/*                                                }*/}
            {/*                                            </span>*/}
            {/*                                        </p>*/}
            {/*                                        <em className="acceptedFiles__info">*/}
            {/*                                            {*/}
            {/*                                                translate*/}
            {/*                                                    .modal_format[*/}
            {/*                                                    locale*/}
            {/*                                                ]*/}
            {/*                                            }*/}
            {/*                                        </em>*/}
            {/*                                    </div>*/}
            {/*                                    <div className="acceptedFiles">*/}
            {/*                                        {acceptedFiles.length !==*/}
            {/*                                            0 && (*/}
            {/*                                            <aside className="acceptedFiles__files">*/}
            {/*                                                <span className="acceptedFiles__title">*/}
            {/*                                                    {*/}
            {/*                                                        translate*/}
            {/*                                                            .modal_attachment[*/}
            {/*                                                            locale*/}
            {/*                                                        ]*/}
            {/*                                                    }*/}
            {/*                                                </span>*/}
            {/*                                                <ul className="acceptedFiles__ul">*/}
            {/*                                                    {*/}
            {/*                                                        acceptedFileItems*/}
            {/*                                                    }*/}
            {/*                                                </ul>*/}
            {/*                                            </aside>*/}
            {/*                                        )}*/}
            {/*                                    </div>*/}
            {/*                                    <div>*/}
            {/*                                        <input*/}
            {/*                                            type="checkbox"*/}
            {/*                                            id="cb1"*/}
            {/*                                            onChange={() =>*/}
            {/*                                                setCheck(!check)*/}
            {/*                                            }*/}
            {/*                                        />*/}
            {/*                                        <label htmlFor="cb1">*/}
            {/*                                            {*/}
            {/*                                                translate*/}
            {/*                                                    .modal_check[*/}
            {/*                                                    locale*/}
            {/*                                                ]*/}
            {/*                                            }*/}
            {/*                                        </label>*/}
            {/*                                    </div>*/}
            {/*                                </section>*/}
            {/*                            </div>*/}
            {/*                        )}*/}
            {/*                        <div className="modal__buttons">*/}
            {/*                            {activeSteps !== 1 && (*/}
            {/*                                <Button*/}
            {/*                                    onClick={handleClickPrev}*/}
            {/*                                    bg="white"*/}
            {/*                                    text={*/}
            {/*                                        translate.modal_btn_prev[*/}
            {/*                                            locale*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    arrow="left"*/}
            {/*                                />*/}
            {/*                            )}*/}
            {/*                            {activeSteps === 1 &&*/}
            {/*                            simpleValidator.current.allValid() ? (*/}
            {/*                                <Button*/}
            {/*                                    onClick={handleClickNext}*/}
            {/*                                    text={*/}
            {/*                                        translate.modal_btn_next[*/}
            {/*                                            locale*/}
            {/*                                        ]*/}
            {/*                                    }*/}
            {/*                                    arrow="right"*/}
            {/*                                />*/}
            {/*                            ) : (*/}
            {/*                                ''*/}
            {/*                            )}*/}
            {/*                            {activeSteps === 2 &&*/}
            {/*                                fromLang &&*/}
            {/*                                whatLang &&*/}
            {/*                                legalization && (*/}
            {/*                                    <Button*/}
            {/*                                        onClick={handleClickNext}*/}
            {/*                                        text={*/}
            {/*                                            translate*/}
            {/*                                                .modal_btn_next[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        arrow="right"*/}
            {/*                                    />*/}
            {/*                                )}*/}
            {/*                            {activeSteps === 3 &&*/}
            {/*                                check &&*/}
            {/*                                acceptedFiles.length !== 0 && (*/}
            {/*                                    <Button*/}
            {/*                                        onClick={onSubmitHandler}*/}
            {/*                                        text={*/}
            {/*                                            translate*/}
            {/*                                                .modal_btn_finished[*/}
            {/*                                                locale*/}
            {/*                                            ]*/}
            {/*                                        }*/}
            {/*                                        arrow="right"*/}
            {/*                                    />*/}
            {/*                                )}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        {finished && (*/}
            {/*            <div className="row" style={{ height: '100%' }}>*/}
            {/*                <div className="col-xl-12">*/}
            {/*                    <div className="finished-container">*/}
            {/*                        <div className="finished-circle">*/}
            {/*                            <svg*/}
            {/*                                width={30}*/}
            {/*                                height={30}*/}
            {/*                                xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                fill="none"*/}
            {/*                                viewBox="0 0 30 28"*/}
            {/*                            >*/}
            {/*                                <path*/}
            {/*                                    fill="#fff"*/}
            {/*                                    d="M8.3 25.5l-5.8-7c-.8-.9-2.3-2.4-2.4-2.7-.3-.8 0-1.8.8-2.5.5-.4.8-.5 1.5-.5s1 0 1.5.5c1.1 1 4.2 4.5 5.2 6 .7 1.1 1 1 2.3-1.1C15.5 11.9 20.2 6.6 25 2.8A17 17 0 0130 0l-2.3 2.4a60.9 60.9 0 00-10.3 12.8c-1 1.4-3.4 5.7-4.8 8.5-2.1 4.3-2.1 4.3-2.3 4.3-.8-.8-1.3-1.7-2-2.5z"*/}
            {/*                                />*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                        <span*/}
            {/*                            style={{*/}
            {/*                                fontSize: '24px',*/}
            {/*                                lineHeight: '40px',*/}
            {/*                                color: '#0B626B',*/}
            {/*                                marginTop: '30px',*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            {*/}
            {/*                                translate.modal_finished_title_1[*/}
            {/*                                    locale*/}
            {/*                                ]*/}
            {/*                            }*/}
            {/*                        </span>*/}
            {/*                        <span*/}
            {/*                            style={{*/}
            {/*                                fontSize: '16px',*/}
            {/*                                marginTop: '20px',*/}
            {/*                                color: '#103464',*/}
            {/*                                fontWeight: 300,*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            {*/}
            {/*                                translate.modal_finished_title_2[*/}
            {/*                                    locale*/}
            {/*                                ]*/}
            {/*                            }*/}
            {/*                        </span>*/}
            {/*                        <span*/}
            {/*                            style={{*/}
            {/*                                fontSize: '20px',*/}
            {/*                                lineHeight: '40px',*/}
            {/*                                color: '#103464',*/}
            {/*                                marginTop: '30px',*/}
            {/*                                marginBottom: '60px',*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            {*/}
            {/*                                translate.modal_finished_title_3[*/}
            {/*                                    locale*/}
            {/*                                ]*/}
            {/*                            }*/}
            {/*                        </span>*/}
            {/*                        <Button*/}
            {/*                            text={*/}
            {/*                                translate.modal_btn_close_finished[*/}
            {/*                                    locale*/}
            {/*                                ]*/}
            {/*                            }*/}
            {/*                            onClick={handlerCloseModalFinished}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </>
    )
}
