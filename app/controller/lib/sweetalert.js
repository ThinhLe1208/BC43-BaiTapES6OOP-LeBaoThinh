export const successAlert = (text) => {
    Swal.fire({
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1000
    });
};

export const errorAlert = (text) => {
    Swal.fire({
        icon: 'error',
        title: text,
        showConfirmButton: false,
        timer: 1000
    });
};

export const confirmAlert = async (question = 'Bạn có chắc chắn ?') => {
    const promise = await Swal.fire({
        title: question,
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Có',
        denyButtonText: `Không`,
    });
    return promise.value;
};