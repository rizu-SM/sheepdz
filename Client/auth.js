// التسجيل: حفظ بيانات المستخدم في localStorage
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const notebook = document.getElementById('notebook').value.trim();
  const email = document.getElementById('email')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
  const password = document.getElementById('password').value;

  if (!firstname || !lastname || !notebook || !password) {
    alert('الرجاء ملء جميع الحقول.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const existingUser = users.find(user => user.notebook === notebook);
  if (existingUser) {
    alert('هذا الرقم مسجل مسبقاً.');
    return;
  }

  users.push({ firstname, lastname, notebook, email, phone, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
  window.location.href = 'login.html';
});

// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const notebook = document.getElementById('familyNote').value.trim();
 
  const password = document.getElementById('password').value;

  if (!notebook ||  !password) {
    alert('يرجى ملء جميع الحقول.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find(u =>
    u.notebook === notebook &&
   
    u.password === password
  );

  if (!user) {
    alert('بيانات الدخول غير صحيحة!');
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));
  alert('تم تسجيل الدخول بنجاح');
  window.location.href = 'dashboard.html'; // صفحة بعد الدخول
});
  