// Descripcion: Uso de Gmapas para la creaciòn de rutas y geoposicionamiento.
//Autor: Ing. Josè Luis Olivares
//email: joseluiss_503@hotmail.com

    var map, lat, lng;
    //localStorage.clear();
    localStorage.string_array_puntos = (localStorage.string_array_puntos || '[]');
    var array_puntos = JSON.parse(localStorage.string_array_puntos);
   //escuchando al evento click  del boton inicializar
  	//$("#btnInicializar").on('click', alert('llamada'));
var app={
      geolocalizar:function (){
        GMaps.geolocate({
          success: function(position){
            if(!array_puntos[0]) {
              lat = position.coords.latitude;  // guarda coords en lat y lng
              lng = position.coords.longitude;
            }else{
              lat = array_puntos[array_puntos.length-1][0] || position.coords.latitude;  // guarda coords en lat y lng
              lng = array_puntos[array_puntos.length-1][1] || position.coords.longitude;
            }
            
            array_puntos.push([lat,lng]); //insertando las nuevas geo posiciones

            map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
              el: '#map',
              lat: lat,
              lng: lng,
              click: app.enlazarMarcador,
              tap: app.enlazarMarcador
            });

            app.pinta_rutas(); //dibujando rutas
            
            map.addMarker({ lat: lat, lng: lng});  // agregando marcador en [lat, lng]
          },
          error: function(error) { alert('Geolocalización falla: '+error.message); },
          not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
        });
      },

	enlazarMarcador: function (e){
       // muestra ruta entre marcas anteriores y actuales
        map.drawRoute({
          origin: [lat, lng],  // origen en coordenadas anteriores
          // destino en coordenadas del click o toque actual
          destination: [e.latLng.lat(), e.latLng.lng()],
          travelMode: 'driving',  //opciones driving -walking
          strokeColor: '#C20041',  //color de linia
          strokeOpacity: 0.6,
          strokeWeight: 5
        });

        lat = e.latLng.lat();   // guarda coords para marca siguiente
        lng = e.latLng.lng();

        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa

        array_puntos.push([lat,lng]);
        localStorage.string_array_puntos = JSON.stringify(array_puntos);
      },


      pinta_rutas:function (){ //se carga al inicio, para las primeras coordenadas
      		
        for (var i=0; i<array_puntos.length-1; i++){
          map.drawRoute({
            origin: [array_puntos[i][0], array_puntos[i][1]],  // origen en coordenadas anteriores
            // destino en coordenadas del click o toque actual
            destination: [array_puntos[i+1][0], array_puntos[i+1][1]],
            travelMode: 'driving',
            strokeColor: '#C20041',
            strokeOpacity: 0.6,
            strokeWeight: 5
          });
          map.addMarker({ lat: array_puntos[i][0], lng: array_puntos[i][1]});
        }
      },

      cargarMapa:function(){
		alert('llama pinta_rutas');
		localStorage.string_array_puntos = '[]';
        array_puntos = JSON.parse(localStorage.string_array_puntos);
        app.geolocalizar();
      },


    inicializar: function() {
		"use strict";
		var self=this;
        self.cargarMapa(); //llamando metodo que carga el mapa
	}

};

app.inicializar(); //inicializando objeto al cargar la pagina
   
