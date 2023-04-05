export class Person {
    constructor(ma, hoTen, diaChi, email) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.diaChi = diaChi;
        this.email = email;
    }
}

export class Student extends Person {
    constructor(ma, hoTen, diaChi, email, toan, ly, hoa) {
        super(ma, hoTen, diaChi, email);
        this.toan = +toan;
        this.ly = +ly;
        this.hoa = +hoa;
    }

    tinhDiemTrungBinh() {
        const diemTrungBinh = (+this.toan + +this.ly + +this.hoa) / 3;
        return diemTrungBinh.toFixed(1);
    }

    loaiDoiTuong() {
        return 'student';
    }
}

export class Employee extends Person {
    constructor(ma, hoTen, diaChi, email, soNgayLam, luongNgay) {
        super(ma, hoTen, diaChi, email);
        this.soNgayLam = +soNgayLam;
        this.luongNgay = +luongNgay;
    }

    tinhLuong() {
        return +this.soNgayLam * +this.luongNgay;
    }

    loaiDoiTuong() {
        return 'employee';
    }
}

export class Customer extends Person {
    constructor(ma, hoTen, diaChi, email, tenCongTy, triGiaHoaDon, danhGia) {
        super(ma, hoTen, diaChi, email);
        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = +triGiaHoaDon;
        this.danhGia = danhGia;
    }

    loaiDoiTuong() {
        return 'customer';
    }
}