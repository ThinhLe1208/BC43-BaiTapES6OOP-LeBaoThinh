export default class ListPerson {
    constructor() {
        this.danhSachDoiTuong = new Array();
    }

    themDoiTuong(...doiTuong) {
        this.danhSachDoiTuong = [...this.danhSachDoiTuong, ...doiTuong];
    }

    xoaDoiTuong(ma) {
        const viTri = this.timViTriTheoMa(ma);
        this.danhSachDoiTuong.splice(viTri, 1);
    }

    timViTriTheoMa(ma) {
        const viTri = this.danhSachDoiTuong.findIndex((doiTuong) => {
            return doiTuong.ma === ma;
        });
        return viTri;
    }

    timDoiTuongTheoMa(ma) {
        const doiTuong = this.danhSachDoiTuong.find((doiTuong) => {
            return doiTuong.ma === ma;
        });
        return doiTuong;
    }

    capNhatDoiTuong(doiTuongMoi) {
        const doiTuongCu = this.timDoiTuongTheoMa(doiTuongMoi.ma);
        Object.assign(doiTuongCu, doiTuongMoi);
    }

    /**
     * @param {number} thuTu 1: tăng dần, -1: giảm dần
     */
    sapXepTheoTen(danhSach, thuTu) {
        if (thuTu === 1) {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return 1; }
                if (x < y) { return -1; }
                return 0;
            });
        } else {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return -1; }
                if (x < y) { return 1; }
                return 0;
            });
        }
        return danhSach;
    }

    /**
     * @param {string} loai 'student' , 'employee' , 'customer'
     */
    locDanhSach(loai) {
        if (loai) {
            const danhSachLoc = this.danhSachDoiTuong.filter((doiTuong) => {
                return doiTuong.loaiDoiTuong() === loai;
            });
            return danhSachLoc;
        } else {
            return this.danhSachDoiTuong;
        }
    }
}