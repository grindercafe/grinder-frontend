function SearchField({ onChange, placeholder }) {
    return (
        <input
            onChange={onChange}
            className="search_field"
            type="search"
            placeholder={placeholder} />
    )
}

export default SearchField