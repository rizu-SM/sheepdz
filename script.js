document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for reservation to today
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = today;
    });

    // Wilaya and Region data
    const regions = {
        'الجزائر': ['باب الوادي', 'بئر مراد رايس', 'بوزريعة', 'الحراش', 'الدار البيضاء'],
        'وهران': ['وهران المدينة', 'عين الترك', 'أرزيو', 'السانية', 'بئر الجير'],
        'قسنطينة': ['قسنطينة المدينة', 'الخروب', 'حامة بوزيان', 'زيغود يوسف', 'ديدوش مراد'],
        'عنابة': ['عنابة المدينة', 'البوني', 'الحجار', 'سرايدي', 'برحال'],
        'سطيف': ['سطيف المدينة', 'العلمة', 'عين ولمان', 'بوقاعة', 'عين أرنات'],
        'تلمسان': ['تلمسان المدينة', 'مغنية', 'الرمشي', 'ندرومة', 'الغزوات']
    };

    // Update regions based on selected wilaya
    const wilayaSelect = document.getElementById('wilaya');
    const regionSelect = document.getElementById('region');
    
    if (wilayaSelect && regionSelect) {
        wilayaSelect.addEventListener('change', function() {
            const selectedWilaya = this.value;
            regionSelect.innerHTML = '<option value="">اختر المنطقة</option>';
            
            if (selectedWilaya && regions[selectedWilaya]) {
                regionSelect.disabled = false;
                
                regions[selectedWilaya].forEach(region => {
                    const option = document.createElement('option');
                    option.value = region;
                    option.textContent = region;
                    regionSelect.appendChild(option);
                });
            } else {
                regionSelect.disabled = true;
            }
        });
    }

    // Show/hide CCP details based on payment method
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const ccpDetails = document.getElementById('ccpDetails');
    
    if (paymentRadios.length && ccpDetails) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'ccp') {
                    ccpDetails.classList.remove('hidden');
                } else {
                    ccpDetails.classList.add('hidden');
                }
            });
        });
    }

    // Form validation and submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const fullName = document.getElementById('fullName').value;
            const wilaya = document.getElementById('wilaya').value;
            const region = document.getElementById('region').value;
            const familyBookNumber = document.getElementById('familyBookNumber').value;
            const contact = document.getElementById('contact').value;
            
            if (!fullName || !wilaya || !region || !familyBookNumber || !contact) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Store data in localStorage for use in reservation
            localStorage.setItem('userFullName', fullName);
            localStorage.setItem('userWilaya', wilaya);
            localStorage.setItem('userRegion', region);
            localStorage.setItem('userFamilyBook', familyBookNumber);
            localStorage.setItem('userContact', contact);
            
            // Redirect to reservation page
            window.location.href = 'reservation.html';
        });
    }

    // Reservation form handling
    const reservationForm = document.getElementById('reservationForm');
    const confirmationModal = document.getElementById('confirmationModal');
    
    if (reservationForm) {
        // Pre-fill wilaya if user came from registration
        const userWilaya = localStorage.getItem('userWilaya');
        const userRegion = localStorage.getItem('userRegion');
        
        if (userWilaya && wilayaSelect) {
            wilayaSelect.value = userWilaya;
            // Trigger change event to populate regions
            const event = new Event('change');
            wilayaSelect.dispatchEvent(event);
            
            if (userRegion && regionSelect) {
                setTimeout(() => {
                    regionSelect.value = userRegion;
                }, 100);
            }
        }
        
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const reservationDate = document.getElementById('reservationDate').value;
            const timeSlot = document.getElementById('timeSlot').value;
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            
            if (!reservationDate || !timeSlot || !paymentMethod) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // If CCP payment is selected, validate CCP number
            if (paymentMethod.value === 'ccp') {
                const ccpNumber = document.getElementById('ccpNumber').value;
                if (!ccpNumber) {
                    alert('يرجى إدخال رقم CCP');
                    return;
                }
                localStorage.setItem('userCcpNumber', ccpNumber);
            }
            
            // Generate reservation ID
            const reservationId = 'SH' + Math.floor(100000 + Math.random() * 900000);
            
            // Store reservation data
            localStorage.setItem('reservationId', reservationId);
            localStorage.setItem('reservationDate', reservationDate);
            localStorage.setItem('reservationTime', timeSlot);
            localStorage.setItem('paymentMethod', paymentMethod.value);
            
            // Show confirmation modal
            if (confirmationModal) {
                const reservationDetails = document.getElementById('reservationDetails');
                if (reservationDetails) {
                    reservationDetails.innerHTML = `
                        <p><strong>رقم الحجز:</strong> ${reservationId}</p>
                        <p><strong>التاريخ:</strong> ${reservationDate}</p>
                        <p><strong>الوقت:</strong> ${timeSlot}</p>
                    `;
                }
                confirmationModal.style.display = 'block';
            }
        });
    }
    
    // Modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn && confirmationModal) {
        closeBtn.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // View confirmation button
    const viewConfirmationBtn = document.getElementById('viewConfirmation');
    if (viewConfirmationBtn) {
        viewConfirmationBtn.addEventListener('click', function() {
            window.location.href = 'confirmation.html';
        });
    }
    
    // Populate confirmation page
    const reservationId = document.getElementById('reservationId');
    const wilayaConfirm = document.getElementById('wilayaConfirm');
    const regionConfirm = document.getElementById('regionConfirm');
    const dateConfirm = document.getElementById('dateConfirm');
    const timeConfirm = document.getElementById('timeConfirm');
    const paymentConfirm = document.getElementById('paymentConfirm');
    
    if (reservationId && wilayaConfirm && regionConfirm && dateConfirm && timeConfirm && paymentConfirm) {
        reservationId.textContent = localStorage.getItem('reservationId') || 'غير متوفر';
        wilayaConfirm.textContent = localStorage.getItem('userWilaya') || 'غير متوفر';
        regionConfirm.textContent = localStorage.getItem('userRegion') || 'غير متوفر';
        dateConfirm.textContent = localStorage.getItem('reservationDate') || 'غير متوفر';
        timeConfirm.textContent = localStorage.getItem('reservationTime') || 'غير متوفر';
        
        const paymentMethod = localStorage.getItem('paymentMethod');
        if (paymentMethod === 'ccp') {
            paymentConfirm.textContent = 'CCP - ' + (localStorage.getItem('userCcpNumber') || '');
        } else {
            paymentConfirm.textContent = 'نقداً عند الاستلام';
        }
    }
    
    // Print confirmation
    const printConfirmationBtn = document.getElementById('printConfirmation');
    if (printConfirmationBtn) {
        printConfirmationBtn.addEventListener('click', function() {
            window.print();
        });
    }
});