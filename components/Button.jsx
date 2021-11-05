export default function Button({
    bg = '',
    text = '',
    arrow = false,
    onClick = function () {},
}) {
    function handlerClick() {
        onClick()
    }
    return (
        <button
            className={bg ? 'button ' + bg : 'button'}
            onClick={handlerClick}
        >
            {arrow === 'left' && (
                <svg fill="none" viewBox="0 0 24 24" width={24} height={24}>
                    <path
                        fill="#fff"
                        d="M8.22 17.84l.33-.34a.56.56 0 000-.8l-3.93-3.9h17.62c.3 0 .56-.26.56-.57v-.46a.56.56 0 00-.56-.57H4.62l3.93-3.9a.56.56 0 000-.8l-.33-.34a.56.56 0 00-.8 0L1.96 11.6a.56.56 0 000 .8l5.46 5.44c.22.21.58.21.8 0z"
                    />
                </svg>
            )}
            <span className="text">{text}</span>
            {arrow === 'right' && (
                <span>
                    <svg fill="none" viewBox="0 0 24 24" width={24} height={24}>
                        <path
                            fill="#fff"
                            d="M15.78 6.16l-.33.34a.56.56 0 000 .8l3.93 3.9H1.76a.56.56 0 00-.56.57v.46c0 .31.25.57.56.57h17.62l-3.93 3.9a.56.56 0 000 .8l.33.34c.22.21.58.21.8 0l5.46-5.44a.56.56 0 000-.8l-5.46-5.44a.56.56 0 00-.8 0z"
                        />
                    </svg>
                </span>
            )}
        </button>
    )
}
