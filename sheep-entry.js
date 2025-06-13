document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sheepEntryForm');
    const result = document.getElementById('entryResult');
    const announcementType = document.getElementById('announcementType');
    const wilayaGroup = document.getElementById('wilayaGroup');

    // مصفوفة لتخزين الإعلانات
    let announcements = [];

    // إظهار/إخفاء اختيار الولاية حسب نوع الإعلان
    announcementType.addEventListener('change', function() {
        if (this.value === 'wilaya') {
            wilayaGroup.style.display = '';
            document.getElementById('wilaya').setAttribute('required', 'required');
        } else {
            wilayaGroup.style.display = 'none';
            document.getElementById('wilaya').removeAttribute('required');
        }
    });

    // عرض جميع الإعلانات
    function renderAnnouncements() {
        if (announcements.length === 0) {
            result.innerHTML = `<div style="color:#888; text-align:center;">لا توجد إعلانات بعد</div>`;
            return;
        }
        result.innerHTML = announcements.map((a, idx) => `
            <div class="confirmation-card" style="background:#f9f9f9; padding:20px; border-radius:8px; margin-bottom:15px; position:relative;">
                <button onclick="deleteAnnouncement(${idx})" 
                    style="
                        position:absolute;
                        left:10px;
                        top:10px;
                        background:linear-gradient(90deg, #e74c3c 60%, #c0392b 100%);
                        color:#fff;
                        border:none;
                        border-radius:50%;
                        width:32px;
                        height:32px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:1.2em;
                        box-shadow:0 2px 6px rgba(0,0,0,0.12);
                        cursor:pointer;
                        transition:background 0.2s, transform 0.2s;
                    "
                    onmouseover="this.style.background='linear-gradient(90deg, #c0392b 60%, #e74c3c 100%)'; this.style.transform='scale(1.1)'"
                    onmouseout="this.style.background='linear-gradient(90deg, #e74c3c 60%, #c0392b 100%)'; this.style.transform='scale(1)'"
                    title="حذف الإعلان"
                >
                    <i class="fas fa-trash-alt"></i>
                </button>
                <h3>إعلان ${idx + 1}</h3>
                <p><strong>نوع الإعلان:</strong> ${a.type === 'all' ? 'إعلان عام (كل الولايات)' : 'إعلان خاص بولاية ' + a.wilayaText}</p>
                <p><strong>نص الإعلان:</strong> ${a.announcement}</p>
                ${a.sheepNumber ? `<p><strong>عدد الأضاحي المدخلة:</strong> ${a.sheepNumber}</p>` : ''}
            </div>
        `).join('');
    }

    // إضافة إعلان جديد
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = announcementType.value;
        const wilaya = document.getElementById('wilaya').value;
        const wilayaText = document.getElementById('wilaya').options[document.getElementById('wilaya').selectedIndex]?.text || '';
        const sheepNumber = document.getElementById('sheepNumber').value;
        const announcement = document.getElementById('announcement').value;

        announcements.push({
            type,
            wilaya,
            wilayaText,
            sheepNumber,
            announcement
        });

        renderAnnouncements();
        form.reset();
        wilayaGroup.style.display = 'none';
    });

    // حذف إعلان
    window.deleteAnnouncement = function(idx) {
        if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
            announcements.splice(idx, 1);
            renderAnnouncements();
        }
    };

    // عرض الإعلانات عند التحميل
    renderAnnouncements();
});