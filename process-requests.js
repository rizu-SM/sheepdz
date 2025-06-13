const searchInput = document.getElementById('search-name');

searchInput.addEventListener('input', function () {
    renderTable(wilayaSelect.value, this.value.trim());
});
const requests = [
    {
        name: "محمد بن أحمد",
        familyBook: "12345",
        contact: "mohamed@example.com",
        salaire: 35000,
        familyCount: 5,
        wilaya: "1",
        status: "pending"
    },
    {
        name: "فاطمة قاسي",
        familyBook: "23456",
        contact: "0550234567",
        salaire: 25000,
        familyCount: 7,
        wilaya: "2",
        status: "pending"
    },
    {
        name: "سميرة براهيمي",
        familyBook: "45678",
        contact: "samira@example.com",
        salaire: 30000,
        familyCount: 4,
        wilaya: "3",
        status: "pending"
    },
    {
        name: "يوسف زروقي",
        familyBook: "56789",
        contact: "youssef@example.com",
        salaire: 40000,
        familyCount: 6,
        wilaya: "5",
        status: "pending"
    }
];

const tableBody = document.getElementById('requests-table');
const modal = document.getElementById('details-modal');
const detailsContent = document.getElementById('details-content');
const wilayaSelect = document.getElementById('wilaya-select');
let selectedRequest = null;
let filteredRequests = [];

// عرض الطلبات في الجدول حسب الولاية المختارة مع تلوين حسب الحالة
function renderTable(wilayaId, nameFilter = '') {
    tableBody.innerHTML = '';
    filteredRequests = requests.filter(req => {
        const matchesWilaya = req.wilaya === wilayaId;
        const matchesName = req.name.includes(nameFilter);
        return matchesWilaya && matchesName;
    });
    
    if (filteredRequests.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align:center; padding:10px;">لا توجد طلبات مطابقة</td>`;
        tableBody.appendChild(row);
        return;
    }

    filteredRequests.forEach((req, idx) => {
        let rowColor = '';
        if (req.status === 'accepted') rowColor = 'background:#e8f8f5;';
        else if (req.status === 'rejected') rowColor = 'background:#fdecea;';
        else rowColor = '';

        const statusText = req.status === 'accepted' ? '<span style="color:#27ae60;font-weight:bold;">مقبول</span>' :
                           req.status === 'rejected' ? '<span style="color:#c0392b;font-weight:bold;">مرفوض</span>' :
                           '<span style="color:#888;">قيد المعالجة</span>';

        const row = document.createElement('tr');
        row.setAttribute('style', rowColor);
        row.innerHTML = `
            <td style="padding:10px;">${req.name}</td>
            <td style="padding:10px;">${req.familyBook}</td>
            <td style="padding:10px;">${req.contact}</td>
            <td style="padding:10px;">${statusText}</td>
            <td style="padding:10px;">
                <button class="btn" onclick="showDetails(${idx})">عرض التفاصيل</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// عند تغيير الولاية
wilayaSelect.addEventListener('change', function() {
    renderTable(this.value);
});

// عرض التفاصيل في المودال
window.showDetails = function(idx) {
    selectedRequest = idx;
    const req = filteredRequests[idx];
    detailsContent.innerHTML = `
        <p><strong>الاسم:</strong> ${req.name}</p>
        <p><strong>رقم دفتر العائلة:</strong> ${req.familyBook}</p>
        <p><strong>البريد الإلكتروني / رقم الهاتف:</strong> ${req.contact}</p>
        <p><strong>الراتب:</strong> ${req.salaire} دج</p>
        <p><strong>عدد أفراد العائلة:</strong> ${req.familyCount}</p>
        <p><strong>الحالة الحالية:</strong> ${
            req.status === 'accepted' ? '<span style="color:#27ae60;font-weight:bold;">مقبول</span>' :
            req.status === 'rejected' ? '<span style="color:#c0392b;font-weight:bold;">مرفوض</span>' :
            '<span style="color:#888;">قيد المعالجة</span>'
        }</p>
    `;
    modal.style.display = 'block';
};

// إغلاق المودال
document.getElementById('close-modal').onclick = function() {
    modal.style.display = 'none';
    selectedRequest = null;
};

// قبول الطلب
document.getElementById('accept-btn').onclick = function() {
    if (selectedRequest !== null) {
        filteredRequests[selectedRequest].status = "accepted";
        alert("تم قبول الطلب!");
        modal.style.display = 'none';
        renderTable(wilayaSelect.value);
    }
};

// رفض الطلب
document.getElementById('reject-btn').onclick = function() {
    if (selectedRequest !== null) {
        filteredRequests[selectedRequest].status = "rejected";
        alert("تم رفض الطلب!");
        modal.style.display = 'none';
        renderTable(wilayaSelect.value);
    }
};

// إغلاق المودال عند الضغط خارج المحتوى
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        selectedRequest = null;
    }
};

renderTable("1");