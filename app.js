var app = angular.module('mapaPDI', []);
app.controller('HomeController', function($scope) {

var vm = this;

vm.marcadoresAdicionados = [];

function incluirPDI(coordenadas){
    $scope.$apply(function()
      {vm.marcadoresAdicionados.push(coordenadas)}
    );
}

//Funções Mapa leaflet
var mymap = L.map('mapa').setView([-19.9262, -43.9425], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZmVndXNzIiwiYSI6ImNrNTM3cmtrdzA1dXYzbG5rNWtxeXluZmgifQ.V7IoNsTcQ8QDv_JQbHXUgg'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('Marcador incluído')
        .openOn(mymap);

    incluirPDI(e.latlng);
    L.marker(e.latlng).addTo(mymap);
}

vm.removerMarcador = function (coordenadas){
  var camadas = Object.values(mymap._layers).filter(x => x._latlng == coordenadas)[0].remove();
  vm.marcadoresAdicionados.splice(vm.marcadoresAdicionados.findIndex(x => x == coordenadas));
}

vm.focar = function(marcador) {
	mymap.setView(marcador, 15);
} 

mymap.on('click', onMapClick);

});
