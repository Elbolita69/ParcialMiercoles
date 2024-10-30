const registrationForm = document.getElementById('registrationForm');
const parkingLot = document.getElementById('parkingLot');

// Se comenta ya que depende de localStorage
/*
const parkedCars = JSON.parse(localStorage.getItem('parkedCars')) || {};
*/

const parkedCars = {}; // Sin localStorage, parkedCars empieza vacío

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const documentNumber = document.getElementById('documentNumber').value;
  const userName = document.getElementById('userName').value;
  const parkingSpot = document.getElementById('parkingSpot').value;

  if (!documentNumber || isNaN(documentNumber)) {
    document.getElementById('documentNumberError').textContent = 'El número de documento debe ser un número.';
    return;
  } else {
    document.getElementById('documentNumberError').textContent = '';
  }

  if (!userName || /\d/.test(userName)) {
    document.getElementById('userNameError').textContent = 'El nombre no puede contener números.';
    return;
  } else {
    document.getElementById('userNameError').textContent = '';
  }

  if (parkedCars[parkingSpot]) {
    alert('El lugar de estacionamiento ya está ocupado.');
  } else {
    parkedCars[parkingSpot] = { userName, documentNumber };
    // Se comenta ya que depende de localStorage
    // localStorage.setItem('parkedCars', JSON.stringify(parkedCars));
    updateParkingLot();
  }
});

function updateParkingLot() {
  const spots = parkingLot.getElementsByClassName('parking-spot');
  for (let spot of spots) {
    const spotId = spot.getAttribute('data-spot');
    if (parkedCars[spotId]) {
      spot.classList.add('bg-danger');
      spot.classList.remove('bg-success');
      spot.textContent = `${spotId} (Ocupado)`;
    } else {
      spot.classList.remove('bg-danger');
      spot.classList.add('bg-success');
      spot.textContent = spotId;
    }
  }
}

updateParkingLot();

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput').value;
  const result = Object.entries(parkedCars).find(([key, value]) => 
    value.userName === searchInput || value.documentNumber === searchInput
  );

  if (result) {
    alert(`El usuario ${result[1].userName} está en el estacionamiento ${result[0]}`);
  } else {
    alert('No se encontró al usuario.');
  }
});

// Verificación de acceso a Parking.html
function verificarAccesoParking() {
    
    /*
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!usuarioLogueado) {
        alert("Acceso denegado. Debes iniciar sesión.");
        window.location.href = "Login.html"; 
    }
    */
}

document.addEventListener("DOMContentLoaded", function() {
    verificarAccesoParking(); 
});
