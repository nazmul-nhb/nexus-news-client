// Custom Styles for React Select
const customStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'transparent',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: 'none',
        padding: '0 0 0 4px',
    }),
    container: (base) => ({
        ...base,
        padding: '0 0 0 4px',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 0 0 4px',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#b6d1e4f8',
        padding: '0 0 0 4px',
    }),
    multiValue: (base) => ({
        ...base,
        // backgroundColor: 'transparent',
    }),
    multiValueLabel: (base) => ({
        ...base,
        // backgroundColor: 'transparent',
        // color: '#000',
    }),
    multiValueRemove: (base) => ({
        ...base,
        // color: '#000',
        ':hover': {
            backgroundColor: 'transparent',
            // color: '#000',
        },
    }),
    input: (base) => ({
        ...base,
        // backgroundColor: 'transparent',
        margin: '0',
        padding: '0 0 0 4px',
    }),
    placeholder: (base) => ({
        ...base,
        // color: '#aaa',
    }),
    options: (base, state) => ({
        ...base,
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: state.isFocused ? '#f0f0f0' : 'transparent', // Example hover color
            color: state.isFocused ? '#fff' : '#fff', // Example hover text color
        },
    })
};

export default customStyles;