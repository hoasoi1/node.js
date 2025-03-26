const express = require('express');
const router = express.Router();

// Dữ liệu tạm thời
let bookings = [
    { id: 1, customerName: 'Nguyễn Văn A' },
    { id: 2, customerName: 'Trần Thị B' }
];

// Hiển thị danh sách đặt chỗ
router.get('/', (req, res) => {
    res.render('index', { bookings });
});

// Thêm đặt chỗ mới
router.post('/add', (req, res) => {
    const newBooking = {
        id: bookings.length + 1,
        customerName: req.body.customerName
    };
    bookings.push(newBooking);
    res.redirect('/');
});

// Xóa đặt chỗ
router.post('/delete/:id', (req, res) => {
    const bookingId = parseInt(req.params.id);
    bookings = bookings.filter(booking => booking.id !== bookingId);
    res.redirect('/');
});

module.exports = router;
