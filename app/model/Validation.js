/**
 * Cấu trúc html
 * #mainForm
 *      .form-group // bọc riêng từng cặp input và sp-thongbao, để closest rồi kiếm sp-thongbao
 *              input
 *          .sp-thongbao
 */
export default class Validation {
    constructor(setUpList, personList, formSelector = '#mainForm', formGroupSelector = '.form-group', errorSelector = '.sp-thongbao') {
        this.formSelector = formSelector;
        this.formGroupSelector = formGroupSelector;
        this.errorSelector = errorSelector;
        this.setUpList = setUpList;
        this.personList = personList;
    }

    // ============ DOM và xử lý sự kiện ==================

    // DOM tới form node tương ứng formSelector
    getFormEle() {
        return document.querySelector(this.formSelector);
    }

    // DOM tới error node tương ứng với input id
    getErrorEl(id) {
        let formEl = this.getFormEle();
        let inputEl = formEl.querySelector(`#${id}`);
        return inputEl.closest(this.formGroupSelector).querySelector(this.errorSelector);
    }

    // DOM lấy toàn bộ input đang được hiển thị trong form
    getInputs() {
        let formEl = this.getFormEle();
        return formEl.querySelectorAll(`input`);
    }

    // Thêm hàm xử lý sự kiện cho toàn bộ ô input đang được hiển thị trong form
    addHandleInput() {
        this.getInputs().forEach((input) => {
            // Xử lý khi blur khỏi input
            input.onblur = () => {
                this.checkInput(input);
            };

            // Xử lý khi nhập giá trị vô input
            input.oninput = () => {
                this.getErrorEl(input.id).style.display = 'none';
                this.getErrorEl(input.id).innerHTML = '';
            };
        });
    }

    //  =========== Validation ===============

    /**
     * Hàm kiểm tra tính hợp lệ của input dựa theo Set Up List
     * @param {HTMLElement} input input node cần kiểm tra
     * @return {undefined | string} undefined (nếu input hợp lệ) || thông báo lỗi (nếu input không hợp lệ)
     */
    checkInput(input) {
        let { rules } = this.setUpList.find((item) => {
            return item.id === input.id;
        });

        // Nếu input bị disabled thì luôn hợp lệ
        if (input.disabled) {
            return undefined;
        }

        // Lọc qua tất cả luật của input trong rules, 
        // nếu chỉ 1 luật không hợp lệ, trả về luật đó
        let invalidRule = rules.find((rule) => {
            let error = this[rule.name](input.value, rule.opt);
            return error;
        });

        if (invalidRule) {
            let error = this[invalidRule.name](input.value, invalidRule.opt);
            this.getErrorEl(input.id).style.display = 'block';
            this.getErrorEl(input.id).innerHTML = error;
            return error;
        } else {
            this.getErrorEl(input.id).style.display = 'none';
            this.getErrorEl(input.id).innerHTML = '';
        }
    }

    /**
  * Hàm kiểm tra tính hợp lệ của form dựa theo checkInput
  * @return {boolean} true (nếu tất cả input hợp lệ) || false (nếu 1 input không hợp lệ)
  */
    checkForm() {
        let inputs = this.getFormEle().querySelectorAll('input');
        let isValid = true;

        inputs.forEach((input) => {
            if (this.checkInput(input)) {
                isValid = false;
            };
        });

        return isValid;
    }

    // ============= Các luật kiểm tra validation =============

    // 1. Luật nội dung không được để trống 
    isRequired(content, opt) {
        if (content.trim() === '') {
            return 'Vui lòng nhập nội dung';
        }
    }

    // 2. Luật nội dung mang giá trị trong khoảng xác định
    isBetween(content, opt) {
        let { type, cur, min, max } = opt;
        let minFm = new Intl.NumberFormat('vn-VN').format(min);
        let maxFm = new Intl.NumberFormat('vn-VN').format(max);
        let isValid = true;

        switch (type) {
            case 'length':
                if (content.length < min || content.length > max) {
                    isValid = false;
                }
                break;
            default:
                if (content < min || content > max) {
                    isValid = false;
                }
        }

        if (!isValid) {
            return `Vui lòng nhập từ ${minFm} đến ${maxFm} ${cur}`;
        }
    }

    // 3. Luật nội dung phải là tên
    isName(content, opt) {
        let pattern = /^([a-z]+)((\s{1}[a-z]+){1,})$/;
        let fm = 'không chứa số và ký tự, không khoảng trống đầu và cuối nội dung, tối đa một khoảng trống giữa các chữ';

        if (!pattern.test(this.toSlug(content))) {
            return `Vui lòng nhập đúng họ và tên <i style="font-size: 0.8em;">(${fm})</i>`;
        }
    }

    // 4. Luật nội dung phải là số
    isNumber(content, opt) {
        let pattern = /^[0-9]*$/;

        if (!pattern.test(content)) {
            return `Vui lòng nhập số`;
        }
    }

    // 5. Luật nội dung phải là email
    isEmail(content, opt) {
        let pattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

        if (!pattern.test(content)) {
            return `Vui lòng nhập đúng email`;
        }
    }

    // 6. Luật nội dung phải là mật khẩu
    isPassword(content, opt) {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        let fm = 'chứa ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt gồm ! @ # $ % ^ & *';

        if (!pattern.test(content)) {
            return `Vui lòng nhập đúng mật khẩu <i style="font-size: 0.8em;">(${fm})</i>`;
        }
    }

    // 7. Luật nội dung phải là tháng ngày năm
    isDate(content, opt) {
        let pattern = /^(0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        let fm = 'mm/dd/yyyy';

        if (!pattern.test(content)) {
            return `Vui lòng nhập đúng tháng/ngày/năm <i style="font-size: 0.8em;">(${fm})</i>`;
        }
    }

    // 8. Luật nội dung không được trùng lặp
    isDuplicate(content, opt) {
        let { id } = opt;
        let isDup = this.personList.some((person) => {
            return person[id] === content;
        });

        if (isDup) {
            return `Vui lòng nhập lại do nội dung này bị trùng lặp`;
        }
    }

    //  ================ Utilities ===================

    // Cập nhật personList (lỗi không thể tham chiếu ? isDuplicate không nhận được personList mới )
    updatePersonList(newList) {
        this.personList = newList;
    }

    // Đổi chữ thàng dạng slug
    toSlug(str, opt) {
        //Đổi chữ hoa thành chữ thường
        let slug = str.toLowerCase();

        switch (opt) {
            case true:
                //Xóa các ký tự đặt biệt
                slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
                //Đổi khoảng trắng thành ký tự gạch ngang
                slug = slug.replace(/ /gi, "-");
                //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
                //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
                slug = slug.replace(/\-\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-/gi, '-');
                slug = slug.replace(/\-\-/gi, '-');
                //Xóa các ký tự gạch ngang ở đầu và cuối
                slug = '@' + slug + '@';
                slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            default:
                //Đổi ký tự có dấu thành không dấu
                slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
                slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
                slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
                slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
                slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
                slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
                slug = slug.replace(/đ/gi, 'd');
        }

        return slug;
    }
}