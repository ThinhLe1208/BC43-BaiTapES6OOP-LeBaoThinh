/**
 * @param {number} person 'student', 'employee', 'customer'
 */
export const renderModal = (person = 'student') => {
    let stringHTML;
    switch (person) {
        case 'student':
            stringHTML = `
            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Toán">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-calculator"
                                aria-hidden="true"></i></span>
                    </div>
                    <input type="number" name="toan" id="toan" class="form-control input-sm"
                        placeholder="Toán">
                </div>
                <span class="sp-thongbao" id="tbToan"></span>
            </div>

            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Lý">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-cogs" aria-hidden="true"></i></span>
                    </div>
                    <input type="number" name="ly" id="ly" class="form-control input-sm" placeholder="Lý">
                </div>
                <span class="sp-thongbao" id="tbLy"></span>
            </div>

            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Hóa">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-flask" aria-hidden="true"></i></span>
                    </div>
                    <input type="number" name="hoa" id="hoa" class="form-control input-sm"
                        placeholder="Hóa">
                </div>
                <span class="sp-thongbao" id="tbHoa"></span>
            </div>
            `;
            break;
        case 'employee':
            stringHTML = `
            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Lương ngày">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-money" aria-hidden="true"></i></span>
                    </div>
                    <input type="number" name="luongNgay" id="luongNgay" class="form-control input-sm"
                        placeholder="Lương theo ngày">
                </div>
                <span class="sp-thongbao" id="tbluongNgay"></span>
            </div>

            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Số ngày làm việc">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-calendar"
                                aria-hidden="true"></i></span>
                    </div>
                    <input type="number" name="soNgayLam" id="soNgayLam" class="form-control input-sm"
                        placeholder="Số ngày làm việc">
                </div>
                <span class="sp-thongbao" id="tbSoNgayLam"></span>
            </div>
            `;
            break;
        case 'customer':
            stringHTML = `
            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Tên Công ty">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-building"></i></span>
                    </div>
                    <input type="text" name="tenCongTy" id="tenCongTy" class="form-control input-sm"
                        placeholder="Tên Công ty">
                </div>

                <span class="sp-thongbao" id="tbTenCongTy"></span>
            </div>

            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Trị giá hóa đơn">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-money"></i></span>
                    </div>
                    <input type="number" name="triGiaHoaDon" id="triGiaHoaDon" class="form-control input-sm"
                        placeholder="Trị giá hóa đơn">
                </div>

                <span class="sp-thongbao" id="tbTriGiaHoaDon"></span>
            </div>

            <div class="form-group">
                <div class="input-group" data-toggle="tooltip" data-placement="left" title="Đánh giá">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-sticky-note"></i></span>
                    </div>
                    <input type="text" name="danhGia" id="danhGia" class="form-control input-sm"
                        placeholder="Đánh giá">
                </div>

                <span class="sp-thongbao" id="tbDanhGia"></span>
            </div>
            `;
            break;
    }

    document.querySelector('#extendForm').innerHTML = stringHTML;
};

export const renderTable = (list) => {
    let stringHTML = list.map((person) => {
        let string;
        switch (person.loaiDoiTuong()) {
            case 'student':
                string = `Điểm trung bình : ${person.tinhDiemTrungBinh()}`;
                break;
            case 'employee':
                string = `Tổng lương : ${person.tinhLuong().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
                break;
            case 'customer':
                string = `-`;
                break;
        }
        return `
        <tr>
            <th>${person.ma}</th>
            <th>${person.hoTen}</th>
            <th>${person.diaChi}</th>
            <th>${person.email}</th>
            <th>${string}</th>
            <th>
                <button class="btn btn-primary" onclick="chiTietDoiTuong('${person.ma}')">Chi tiết</button>
                <button class="btn btn-success" onclick="suaDoiTuong('${person.ma}')">Sửa</button>
                <button class="btn btn-danger"  onclick="xoaDoiTuong('${person.ma}')">Xóa</button>
            </th>
            </th>
        </tr>
        `;
    });
    document.querySelector('#tableDanhSach').innerHTML = stringHTML.join('');
};