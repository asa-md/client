export default function Container({ children, size = 'md', className, rowClasses }) {
    return (
        <div className={className ? 'container-' + size + ' ' + className : 'container-' + size}>
            <div className={rowClasses ? 'row ' + rowClasses : 'row'}>{children}</div>
        </div>
    );
}
