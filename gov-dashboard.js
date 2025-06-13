const sheepData = {
    total: 3200,
    wilayas: {
        "1": { name: "أدرار", sheep: 400, orders: [
            { name: "محمد بن أحمد", familyBook: "12345", contact: "mohamed@example.com" },
            { name: "فاطمة قاسي", familyBook: "23456", contact: "0550234567" }
        ] },
        "2": { name: "الشلف", sheep: 600, orders: [
            { name: "عبد القادر بوزيد", familyBook: "34567", contact: "abdelkader@example.com" }
        ] },
        "3": { name: "الأغواط", sheep: 300, orders: [
            { name: "سميرة براهيمي", familyBook: "45678", contact: "0550456789" }
        ] },
        "4": { name: "أم البواقي", sheep: 900, orders: [] },
        "5": { name: "باتنة", sheep: 1000, orders: [
            { name: "يوسف زروقي", familyBook: "56789", contact: "youssef@example.com" },
            { name: "ليلى بن عيسى", familyBook: "67890", contact: "0550678901" }
        ] }
    }
};

document.getElementById('total-sheep').textContent = sheepData.total;

document.getElementById('wilaya-select').addEventListener('change', function() {
    const wilayaId = this.value;
    const wilayaInfo = sheepData.wilayas[wilayaId];
    const sheepSpan = document.getElementById('wilaya-sheep');
    const tableBody = document.getElementById('orders-table');

    if (wilayaInfo) {
        sheepSpan.textContent = wilayaInfo.sheep;
        tableBody.innerHTML = '';
        if (wilayaInfo.orders.length > 0) {
            wilayaInfo.orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding:10px;">${order.name}</td>
                    <td style="padding:10px;">${order.familyBook}</td>
                    <td style="padding:10px;">${order.contact}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="3" style="text-align:center; padding:10px;">لا توجد طلبات في هذه الولاية</td>`;
            tableBody.appendChild(row);
        }
    } else {
        sheepSpan.textContent = 0;
        tableBody.innerHTML = '';
    }
});