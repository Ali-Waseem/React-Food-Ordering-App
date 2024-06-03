const useInputValidation = (value) => {
    if(value !== '' || value !== null || value !== undefined )
    return true;
    return false;
}

export default useInputValidation;