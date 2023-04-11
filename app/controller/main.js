import ListPerson from "../model/ListPerson.js";
import Validation from '../model/Validation.js';
import SetUpList from "../model/SetUpList.js";
import { renderModal, renderTable } from '../utils/render.js';
import { Student, Employee, Customer } from "../model/Person.js";
import { successAlert, confirmAlert, errorAlert } from '../controller/lib/sweetalert.js';

// Tạo các đối tượng mẫu
const student1 = new Student('0001', 'Nguyen Van A', 'HCM', 'nguyenvana@gmail.com', '8', '7', '9.5');
const student2 = new Student('0002', 'Nguyen Van B', 'HN', 'nguyenvanb@gmail.com', '6', '5.5', '7');
const student3 = new Student('0003', 'Nguyen Van C', 'BT', 'nguyenvanc@gmail.com', '9', '9', '10');
const employee1 = new Employee('0004', 'Nguyen Van D', 'DN', 'nguyenvand@gmail.com', '24', '230000');
const employee2 = new Employee('0005', 'Nguyen Van E', 'TN', 'nguyenvane@gmail.com', '22', '210000');
const employee3 = new Employee('0006', 'Nguyen Van G', 'LA', 'nguyenvang@gmail.com', '19', '310000');
const customer1 = new Customer('0007', 'Nguyen Van H', 'DL', 'nguyenvanh@gmail.com', 'CDNCorp', '230000', 'Tot');
const customer2 = new Customer('0008', 'Nguyen Van K', 'GL', 'nguyenvank@gmail.com', 'MDNCorp', '460000', 'Kha');
const customer3 = new Customer('0009', 'Nguyen Van L', 'QB', 'nguyenvanl@gmail.com', 'JSXCorp', '160000', 'Yeu');

// Tạo danh sách các đối tượng
const list = new ListPerson();
list.themDoiTuong(student1, employee2, student2, customer3, employee1, student3, customer1, employee3, customer2);

// Tạo danh sách dữ liệu cho validation
const setUpList = new SetUpList();
// Syntax: setUpList.addItem( id , item1 , item2 , ... )
//  id : id của input
//  item :  [ nameOfRule , { option } ]
setUpList.addItem('ma', ['isRequired'], ['isBetween', { type: 'length', cur: 'ký tự', min: 4, max: 6 }]);
setUpList.addItem('ma', ['isDuplicate', { id: 'ma' }]);
setUpList.addItem('hoTen', ['isRequired'], ['isName']);
setUpList.addItem('diaChi', ['isRequired']);
setUpList.addItem('email', ['isRequired'], ['isEmail']);
setUpList.addItem('toan', ['isRequired'], ['isBetween', { cur: 'điểm', min: 0, max: 10 }]);
setUpList.addItem('ly', ['isRequired'], ['isBetween', { cur: 'điểm', min: 0, max: 10 }]);
setUpList.addItem('hoa', ['isRequired'], ['isBetween', { cur: 'điểm', min: 0, max: 10 }]);
setUpList.addItem('soNgayLam', ['isRequired']);
setUpList.addItem('luongNgay', ['isRequired']);
setUpList.addItem('tenCongTy', ['isRequired']);
setUpList.addItem('triGiaHoaDon', ['isRequired']);
setUpList.addItem('danhGia', ['isRequired']);

const val = new Validation(setUpList.list, list.danhSachDoiTuong);

/**
 * Định dạng các yếu tố hiển thị trong Modal
 * @param {number} type 1:thêm đối tượng, 2:sửa đối tượng, 3:chi tiết đối tượng
 * @param {number} person 'student', 'employee', 'customer'
 */
const xetModal = (modalTitle = 'Thêm đối tượng', type = 1, person = 'student') => {
    document.querySelector('#header-title').innerHTML = modalTitle;
    renderModal(person);
    val.addHandleInput();

    switch (type) {
        case 1: // Thêm đối tượng
            document.querySelector('#ma').disabled = false;
            document.querySelector('#btnThemNV').style.display = 'block';
            document.querySelector('#btnCapNhat').style.display = 'none';
            document.querySelector('#doiTuong').closest('.form-group').style.visibility = 'visible';
            break;
        case 2: // Sửa đối tượng
            document.querySelector('#ma').disabled = true;
            document.querySelector('#btnThemNV').style.display = 'none';
            document.querySelector('#btnCapNhat').style.display = 'block';
            document.querySelector('#doiTuong').closest('.form-group').style.visibility = 'hidden';
            break;
        case 3: // Chi tiết đối tượng
            document.querySelectorAll('#mainForm input').forEach((input) => {
                input.disabled = 'true';
            });
            document.querySelector('#btnThemNV').style.display = 'none';
            document.querySelector('#btnCapNhat').style.display = 'none';
            document.querySelector('#doiTuong').closest('.form-group').style.visibility = 'hidden';
            break;
    }
};

/**
 * Chuyển form về dạng ban đầu
 * @param {boolean | string} loai false: không chuyển đối tượng, 'student' , 'employee' , 'customer' 
 */
const xoaForm = (loai = 'student') => {
    let inputs = document.querySelectorAll('#mainForm input');
    let spans = document.querySelectorAll('#mainForm .sp-thongbao');

    inputs.forEach((input) => {
        input.value = '';
        input.disabled = false;
    });
    spans.forEach((span) => {
        span.innerHTML = '';
    });

    xetModal();
    if (loai) {
        document.querySelector('#doiTuong').value = loai;
    }
};

// Tạo đối tượng chứa các giá trị input theo đối tượng đang được lựa chọn trong Modal
const taoDoiTuong = () => {
    let inputs = document.querySelectorAll('#mainForm input');
    let { value } = document.querySelector('#doiTuong');
    let person;

    switch (value) {
        case 'student':
            person = new Student();
            break;
        case 'employee':
            person = new Employee();
            break;
        case 'customer':
            person = new Customer();
            break;
    }
    inputs.forEach((input) => {
        person[input.id] = input.value;
    });

    return person;
};


// ========= Init ===========

window.addEventListener('load', () => {
    renderTable(list.danhSachDoiTuong);
    xetModal();

    // ========== Modal =============

    // Xử lý khi chọn đối tượng hiển thị trong Modal
    document.querySelector('#doiTuong').addEventListener('change', (e) => {
        xoaForm(false);
        renderModal(e.target.value);
        val.addHandleInput();
    });

    // Xử lý khi nhấn nút Thêm để thêm đối tượng vào danh sách 
    document.querySelector('#btnThemNV').addEventListener('click', () => {
        let isValid = val.checkForm();
        if (!isValid) {
            return;
        }

        let person = taoDoiTuong();
        list.themDoiTuong(person);
        // ??? giải pháp tạm lỗi val.personList không được cập nhật sau khi thêm đối tượng
        val.updatePersonList(list.danhSachDoiTuong);
        // ??
        renderTable(list.danhSachDoiTuong);
        successAlert("Thêm thành công");
        xoaForm();
    });

    // Xử lý khi nhấn nút Cập nhật đối tượng để sửa đối tượng
    document.querySelector('#btnCapNhat').addEventListener('click', async () => {
        let isValid = val.checkForm();
        if (!isValid) {
            return;
        }

        const result = await confirmAlert('Bạn có chắc chắn muốn sửa?');
        if (result) {
            let doiTuong = taoDoiTuong();
            list.capNhatDoiTuong(doiTuong);
            renderTable(list.danhSachDoiTuong);
            successAlert("Cập nhật thành công");
        } else {
            errorAlert("Dữ liệu không thay đổi");
        }
    });

    // Xử lý khi nhấn nút Đóng để ẩn Modal
    document.querySelector('#btnDong').addEventListener('click', () => {
        xoaForm();
    });

    // Xử lý khi nhấn overlay để ẩn Modal
    document.querySelector('#myModal').addEventListener('mousedown', (e) => {
        if (!e.target.closest('.modal-content')) {
            xoaForm();
        }
    });

    // ========== Table =============

    // Xử lý hiển thị chi tiết đối tượng khi nhấn nút Chi tiết
    window.chiTietDoiTuong = async (id) => {
        let doiTuong = list.timDoiTuongTheoMa(id);
        let loaiDoiTuong = doiTuong.loaiDoiTuong();
        xetModal("Chi tiết đối tượng", 3, loaiDoiTuong);
        val.getInputs().forEach((input) => {
            input.value = doiTuong[input.id];
        });
        document.querySelector('#btnThem').click();
    };

    // Xử lý hiển thị Modal có thông tin đối tượng khi nhấn nút Sửa
    window.suaDoiTuong = (id) => {
        let doiTuong = list.timDoiTuongTheoMa(id);
        let loaiDoiTuong = doiTuong.loaiDoiTuong();

        xetModal("Cập nhật đối tượng", 2, loaiDoiTuong);
        val.getInputs().forEach((input) => {
            input.value = doiTuong[input.id];
        });
        document.querySelector('#btnThem').click();
    };

    // Xử lý xóa đối tượng khỏi danh sách khi nhấn nút Xóa
    window.xoaDoiTuong = async (id) => {
        const result = await confirmAlert('Bạn có chắc chắn muốn xóa?');
        if (result) {
            list.xoaDoiTuong(id);
            renderTable(list.danhSachDoiTuong);
            successAlert("Xóa thành công");
        } else {
            errorAlert("Dữ liệu không thay đổi");
        }
    };

    // Xử lý sắp xếp tên đối tượng tăng dần
    document.querySelector('#SapXepTang').addEventListener('click', () => {
        document.querySelector('#SapXepTang').style.display = 'none';
        document.querySelector('#SapXepGiam').style.display = 'inline';

        let { value: doiTuong } = document.querySelector('#timDoiTuong');
        let danhSachHienTai = list.locDanhSach(doiTuong);
        let danhSachSapXep = list.sapXepTheoTen(danhSachHienTai, 1);
        renderTable(danhSachSapXep);
    });

    // Xử lý sắp xếp tên đối tượng giảm dần
    document.querySelector('#SapXepGiam').addEventListener('click', () => {
        document.querySelector('#SapXepTang').style.display = 'inline';
        document.querySelector('#SapXepGiam').style.display = 'none';

        let { value: doiTuong } = document.querySelector('#timDoiTuong');
        let danhSachHienTai = list.locDanhSach(doiTuong);
        let danhSachSapXep = list.sapXepTheoTen(danhSachHienTai, -1);
        renderTable(danhSachSapXep);
    });

    // Xử lý lọc danh sách đối tượng theo loại
    document.querySelector('#timDoiTuong').addEventListener('change', (e) => {
        let doiTuong = e.target.value;
        let dangSachLoc = list.locDanhSach(doiTuong);
        renderTable(dangSachLoc);
    });
});