import BaseSelect from 'react-select'
import FixRequiredSelect from './FixRequiredSelect'

const Select = (props) => (
    <FixRequiredSelect
        {...props}
        SelectComponent={BaseSelect}
        options={props.options || options}
    />
)

const colourStyles = {
    container: (styles) => ({
        ...styles,
        fontFamily:
            "'Open Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        fontSize: 14,
        fontWeight: '400',
    }),
    control: (styles) => ({
        ...styles,
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.04)',
        height: '50px',
        padding: '0 5px',
        border: '1px solid rgba(224, 224, 224, 0.3)',
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: 'transparent',
    }),
    menu: (styles) => ({
        ...styles,
        borderRadius: '10px',
        boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    }),
    menuList: (styles) => ({
        ...styles,
        maxHeight: '150px',
    }),
}

export default function MySelect({
    onChange = function () {},
    options = [],
    label = '',
    placeholder = 'Selectați opțiunea',
}) {
    function handleChange(event) {
        onChange(event)
    }

    return (
        <div className="select">
            {label && <div className="select__label">{label}</div>}
            <div className="select__input">
                <Select
                    onChange={handleChange}
                    options={options}
                    instanceId={
                        options[0].value +
                        Math.floor(99 * Math.random()) +
                        Date.now()
                    }
                    styles={colourStyles}
                    noOptionsMessage={() => 'Opțiunea nu există'}
                    placeholder={placeholder}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#287191',
                        },
                    })}
                />
            </div>
        </div>
    )
}
