import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    resetNextUuid,
} from 'react-accessible-accordion'

import { Container } from './index'

import { Title, Section } from './index'
import { navigationItems, translate } from '../utils'
import { useRouter } from 'next/router'

const items = [
    {
        title_ro: 'CE ESTE APOSTILA?',
        title_ru: 'ЧТО ТАКОЕ АПОСТИЛЬ?',
        description_ro:
            'Apostila (Apostille) reprezintă o ștampilă prin care se certifică autenticitatea unui document oficial, precum și a semnăturilor aflate pe acesta. Apostila este cerută în țările semnatare ale Convenției de la Haga și nu certifică nicidecum conținutul unui document. Este emisă exclusiv de Ministerul Justiției al Republicii Moldova și orice altă entitate ce oferă servicii în acest sens se află doar în poziția de intermediar între titularul actului / împuternicitul acestuia și instituția în cauză.',
        description_ru:
            'Апостиль - это штамп, удостоверяющий подлинность официального документа и подписей на нем. Апостиль необходим в странах, подписавших Гаагскую конвенцию, и никоим образом не удостоверяет содержание документа. Он выдается исключительно Министерством Юстиции Республики Молдова, а любой другой субъект, предлагающий услуги в этом отношении, находится только в положении посредника между владельцем документа / его уполномоченным представителем и соответствующим учреждением.',
    },
    {
        title_ro: 'CÂND ESTE NECESARĂ O APOSTILARE / SUPRALEGALIZARE?',
        title_ru: 'КОГДА НЕОБХОДИМА АПОСТИЛЬ / СУПЕРЛЕГАЛИЗАЦИЯ?',
        description_ro:
            'Supralegalizarea reprezintă o legalizare a unei legalizări deja existente. Fiecare document sau traducere ce urmează să fie recunoscute în străinătate necesită o vizare cu apostilă, conform convenției de la Haga din 5 octombrie 1961.',
        description_ru:
            'Супраллегализация - это легализация существующей легализации. Каждый документ или перевод, подлежащий признанию за рубежом, требует апостиля в соответствии с Гаагской конвенцией от 5 октября 1961 года.',
    },
    {
        title_ro: 'CE ESTE TRADUCEREA AUTORIZATĂ?',
        title_ru: 'ЧТО ТАКОЕ СЕРТИФИЦИРОВАННЫЙ ПЕРЕВОД?',
        description_ro:
            'Traducerea autorizată este traducerea efectuată de către un traducător posesor al unei autorizații emise de Ministerul Justiției din Republica Moldova, în baza Ordinului Ministrului. Traducerea efectuată este certificată de către traducător prin ștampila sau prin specimenul personal de semnătură. Semnătura traducătorului autorizat poate fi legalizată notarial conform reglementărilor legale în vigoare.',
        description_ru:
            'Сертифицированный перевод - это перевод, осуществляемый переводчиком, имеющим доверенность, выданную Министерством Юстиции Республики Молдова на основании приказа Министра. Перевод заверяется переводчиком с помощью печати или личного образца подписи. Подпись доверенного переводчика может быть нотариально заверена в соответствии с действующими правовыми нормами.',
    },
    {
        title_ro: 'CE ESTE TRADUCEREA LEGALIZATĂ?',
        title_ru: 'ЧТО ТАКОЕ НОТАРИАЛЬНЫЙ ПЕРЕВОД?',
        description_ro:
            'Majoritatea actelor prezentate spre traducere trebuie însoțite de o legalizare de semnătură efectuată de notarul public, deoarece, astfel, traducerile primesc formă autentică și dată certă. Există, de asemenea, foarte multe situații în care se acceptă traducerile doar cu semnătura și ștampila traducătorului, acest lucru fiind, însă, stabilit intern de instituția la care vor fi ulterior prezentate. Trebuie să rețineți un lucru: prin legalizarea notarială nu se certifică nicidecum conținutul traducerii, ci doar specimenul de semnătură și faptul că traducătorul este într-adevăr posesor al autorizației emise de Ministerul Justiției din Republica Moldova pentru limba respectivă. Conținutul și exactitatea traducerii sunt certificate exclusiv de către traducătorul autorizat prin semnătură sau ștampilă.',
        description_ru:
            'Большинство документов, подаваемых на перевод, должны сопровождаться нотариально заверенной подписью, так как это придает переводу аутентичную форму и дату. Существует также много случаев, когда переводы принимаются только с подписью и печатью переводчика, но это определяется внутри учреждения, в которое они впоследствии представляются. Обратите внимание на одно: нотариальное заверение не удостоверяет содержание перевода, а только образец подписи и тот факт, что переводчик действительно является обладателем разрешения, выданного Министерством Юстиции Республики Молдова на соответствующий язык. Содержание и точность перевода удостоверяются исключительно уполномоченным переводчиком подписью или печатью.',
    },
    {
        title_ro: 'CUM PLĂTESC TRADUCEREA?',
        title_ru: 'КАК ОПЛАТИТЬ ПЕРЕВОД?',
        description_ro:
            'Plata se face în numerar la sediu sau prin bancă, în funcție de situație și de sumă. Avansul este obligatoriu la preluarea comenzii și se stabilește concret pe baza materialului de tradus. Colaborările constante directe cu clienți companii se supun unui alt regim privind modalitatea de plată și preluarea comenzilor. La cerere, îți  putem expedia traducerea prin curier rapid cu plata la destinatar.',
        description_ru:
            'Оплата производится наличными в офисе или в банке, в зависимости от ситуации и суммы. Авансовый платеж является обязательным при принятии заказа и определяется конкретно на основании переводимого материала. Постоянное прямое сотрудничество с корпоративными клиентами осуществляется в соответствии с другой процедурой оплаты и принятия заказов. По желанию мы можем отправить тебе перевод курьером экспресс-доставкой с оплатой его получателю.',
    },
    {
        title_ro:
            'AVEM DEJA O TRADUCERE. SE POATE APLICA ȘTAMPILA DE TRADUCĂTOR?',
        title_ru:
            'У НАС УЖЕ ЕСТЬ ПЕРЕВОД. МОЖНО ЛИ ПРИМЕНИТЬ ПЕЧАТЬ ПЕРЕВОДЧИКА?',
        description_ro:
            'Serviciul se numește colaționare și reprezintă verificarea/corectarea și semnarea de către un traducător autorizat a unei traduceri efectuate de o terță persoană. Acest serviciu este tarifat cu minim 50% din tariful de traducere pe pagină, dacă verificarea traducerii presupune mici modificări. În cazul în care traducerea prezentată trebuie corectată semnificativ, tariful va fi cel integral. Acest serviciu se poate realiza doar dacă traducerea este deja pe suport electronic și aveți și textul sursă. Este un serviciu care se aplică numai în anumite cazuri și nu este valabil în cazul traducerilor legalizate/traducerilor autorizate de înscrisuri oficiale.',
        description_ru:
            'Услуга называется коллизией и представляет собой проверку/корректировку и подписание уполномоченным переводчиком перевода, выполненного третьей стороной. За эту услугу взимается как минимум 50% от стоимости перевода за страницу, если проверка перевода включает в себя незначительные изменения. Если предоставленный перевод нуждается в существенной корректировке, то взимается полная стоимость. Эта услуга доступна только в том случае, если перевод уже в электронном виде и у вас есть исходный текст. Данная услуга действует только в определенных случаях и недоступна для заверенных переводов/ сертифицированных  переводов официальных документов.',
    },
]

export default function NavigationMenu() {
    resetNextUuid()

    const router = useRouter()
    const { locale } = router

    return (
        <Section id={navigationItems.faq.link}>
            <Title>{translate.title_faq[locale]}</Title>
            <Container>
                <div className="col-12">
                    <Accordion allowZeroExpanded>
                        {items.map((item) => (
                            <AccordionItem key={item.title_ro}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <span className="accordion__button-icon"></span>
                                        <span className="accordion__button-text">
                                            {item['title_' + locale]}
                                        </span>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    {item['description_' + locale]}
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Container>
        </Section>
    )
}
