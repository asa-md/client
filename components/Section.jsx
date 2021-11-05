export default function Section({ children, type = 'light', id }) {
    return (
        <section className={'section section--' + type} id={id}>
            {children}
        </section>
    );
}
