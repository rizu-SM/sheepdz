document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([28.0339, 1.6596], 6); // الجزائر

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker = null;
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    const places = [];
    const placesTable = document.getElementById('places-table');

    // عند النقر على الخريطة
    map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        latInput.value = lat.toFixed(6);
        lngInput.value = lng.toFixed(6);

        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
    });

    // إضافة مكان جديد
    document.getElementById('placeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('placeName').value;
        const wilaya = document.getElementById('wilaya');
        const wilayaText = wilaya.options[wilaya.selectedIndex].text;
        const lat = latInput.value;
        const lng = lngInput.value;

        if (!lat || !lng) {
            alert('يرجى اختيار موقع على الخريطة');
            return;
        }

        places.push({ name, wilaya: wilayaText, lat, lng });
        renderPlaces();
        this.reset();
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        latInput.value = '';
        lngInput.value = '';
    });

    // عرض الأماكن في الجدول
    function renderPlaces() {
        placesTable.innerHTML = '';
        places.forEach(place => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding:10px;">${place.name}</td>
                <td style="padding:10px;">${place.wilaya}</td>
                <td style="padding:10px;">${place.lat}, ${place.lng}</td>
            `;
            placesTable.appendChild(row);
        });
    }
});