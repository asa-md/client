import { createContext, useContext } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
    let sharedState = {
        /* whatever you want */
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}

export async function getServerSideProps() {
    const tabsList = [
        {
            imgRed: '/img/icons/icons-red/file-certificate.svg',
            imgBlue: '/img/icons/icons-blue/file-certificate.svg',
            title: 'Traduceri autorizate',
        },
        {
            imgRed: '/img/icons/icons-red/group.svg',
            imgBlue: '/img/icons/icons-blue/group.svg',
            title: 'Traduceri specializate',
        },
        {
            imgRed: '/img/icons/icons-red/balance-scale-right.svg',
            imgBlue: '/img/icons/icons-blue/balance-scale-right.svg',
            title: 'Traduceri legalizate',
        },
        {
            imgRed: '/img/icons/icons-red/stamp.svg',
            imgBlue: '/img/icons/icons-blue/stamp.svg',
            title: 'Apostilare',
        },
        {
            imgRed: '/img/icons/icons-red/file-signature.svg',
            imgBlue: '/img/icons/icons-blue/file-signature.svg',
            title: 'Supralegalizarea actelor',
        },
        {
            imgRed: '/img/icons/icons-red/male-volume.svg',
            imgBlue: '/img/icons/icons-blue/male-volume.svg',
            title: 'Interpretariat / Traduceri verbale',
        },
        {
            imgRed: '/img/icons/icons-red/file-import.svg',
            imgBlue: '/img/icons/icons-blue/file-import.svg',
            title: 'Solicitarea documentelor',
        },
        {
            imgRed: '/img/icons/icons-red/file-invoice.svg',
            imgBlue: '/img/icons/icons-blue/file-invoice.svg',
            title: 'Declarație de valoare',
        },
        {
            imgRed: '/img/icons/icons-red/check-edit.svg',
            imgBlue: '/img/icons/icons-blue/check-edit.svg',
            title: 'Corectura',
        },
        {
            imgRed: '/img/icons/icons-red/car.svg',
            imgBlue: '/img/icons/icons-blue/car.svg',
            title: 'Suport în obținerea creditului auto',
        },
        {
            imgRed: '/img/icons/icons-red/envelope-open-text.svg',
            imgBlue: '/img/icons/icons-blue/envelope-open-text.svg',
            title: 'Servicii de livrare',
        },
    ]
    const contentList = [
        { text: 'Content for Traduceri autorizate' },
        {
            text:
                '<p>Traduceri specializate - traduceri specializate (terminologice). Se diferențiază de traducerile autorizate printr-un nivel ridicat de dificultate. De aceea, textele traduse cu profesionalism, conferă o imagine bună activității dumneavoastră și vă ajută să evitați o serie întreagă de probleme și neînțelegeri pe viitor. </p><p><strong>Oferim traducerea specializată în următoarele domenii de activitate:</strong></p><ul><li>Traduceri medicale</li><li>Traduceri tehnice</li><li>Traduceri economice și financiare</li><li>Traduceri resurse umane</li><li>Traduceri corespondenta de afaceri</li><li>Traduceri site-uri web și Localizare web</li><li>Traduceri comerciale</li></ul>',
        },
        { text: 'Content for Traduceri legalizate' },
        { text: 'Content for Apostilare' },
        { text: 'Content for Supralegalizarea actelor' },
        { text: 'Content for Interpretariat / Traduceri verbale' },
        { text: 'Content for Solicitarea documentelor' },
        { text: 'Content for Declarație de valoare' },
        { text: 'Content for Corectura' },
        { text: 'Content for Suport în obținerea creditului auto' },
        { text: 'Content for Servicii de livrare' },
    ]

    const languagesList = await fetch(
        'http://127.0.0.1:8000/api/languages'
    ).then((response) => {
        return response.json()
    })

    return {
        props: { tabsList, contentList, languagesList },
    }
}
