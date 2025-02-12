export const onSubmit = (
    mutation: any,
    formData: any,
    setErrors: any,
    Validator: any,
    e: any
) => {
    e.preventDefault();
    if (!checkValidation(formData, setErrors, Validator,))
        return
    mutation.mutate(formData)
}
export const checkValidation = (
    formData: any,
    setErrors: any,
    Validator: any,
) => {
    const result = Validator.safeParse(formData);

    if (!result.success) {
        const formErrors: Record<string, string> = {};
        result.error.errors.forEach((err: any) => {
            if (err.path.length > 0)
                formErrors[err.path[0]] = err.message;
        });
        console.log("formErrors", formErrors)
        setErrors(formErrors);
        return false
    }
    setErrors({});
    return true

}
export const handleChange = (event: any,
    setFormData: any,
) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
        ...prevData,
        [name!]: value,
    }));

};

export function toArabicNumbers(num: number): string {
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(digit => 
      arabicNumbers[parseInt(digit)]
    ).join('');
  }