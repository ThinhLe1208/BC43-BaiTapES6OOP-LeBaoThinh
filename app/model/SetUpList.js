// Lớp tạo danh sách dữ liệu cho lớp Validation đối chiếu và kiểm tra input
export default class SetUpList {
    constructor(list = []) {
        this.list = list;
    }

    addItem(id, ...rules) {
        let item = this.findItem(id);
        if (item) {
            this.addRule(id, rules);
        } else {
            this.list.push({ id, rules: [] });
            this.addRule(id, rules);
        }
    }

    addRule(id, rules) {
        let item = this.findItem(id);
        rules.forEach((rule) => {
            let [name, opt = {}] = rule;
            let oldRule = this.findRule(id, name);
            if (oldRule) {
                // kiem tra option
            } else {
                item.rules.push({
                    name,
                    opt
                });
            }
        });
    }

    findItem(id) {
        return this.list.find((item) => {
            return item.id === id;
        });
    }

    findRule(id, name) {
        let item = this.findItem(id);
        return item.rules.find((rule) => {
            return rule.name === name;
        });
    }
}

/**
 * Cấu trúc:
 * List > item - rules > rule - name
 */

// Ví dụ danh sách sau khi được tạo
export const exampleSetUpList = [
    {
        id: 'ma',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isBetween',
                opt: {
                    type: 'length',
                    cur: 'ký tự',
                    min: 4,
                    max: 6
                }
            },
            {
                name: 'isDuplicate',
                opt: {
                    id: 'ma',
                }
            }
        ]
    },
    {
        id: 'hoTen',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isName',
            }
        ]
    },
    {
        id: 'diaChi',
        rules: [
            {
                name: 'isRequired',
            }
        ]
    },
    {
        id: 'email',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isEmail',
            }
        ]
    },
    {
        id: 'toan',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isBetween',
                opt: {
                    cur: 'điểm',
                    min: 0,
                    max: 10
                }
            }
        ]
    },
    {
        id: 'ly',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isBetween',
                opt: {
                    cur: 'điểm',
                    min: 0,
                    max: 10
                }
            }
        ]
    },
    {
        id: 'hoa',
        rules: [
            {
                name: 'isRequired',
            },
            {
                name: 'isBetween',
                opt: {
                    cur: 'điểm',
                    min: 0,
                    max: 10
                }
            }
        ]
    },
    {
        id: 'soNgayLam',
        rules: [
            {
                name: 'isRequired',
            },
        ]
    },
    {
        id: 'luongNgay',
        rules: [
            {
                name: 'isRequired',
            },
        ]
    },
    {
        id: 'tenCongTy',
        rules: [
            {
                name: 'isRequired',
            },
        ]
    },
    {
        id: 'triGiaHoaDon',
        rules: [
            {
                name: 'isRequired',
            },
        ]
    },
    {
        id: 'danhGia',
        rules: [
            {
                name: 'isRequired',
            },
        ]
    }
];
