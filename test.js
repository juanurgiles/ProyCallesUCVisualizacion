var map = L.map("map").setView([-2.90055, -79.00453], 13);
var toolserver = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
);
var stamen = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "Universidad de Cuenca- Proyecto Calles",
}).addTo(map);
var baseLayers = { stamen: stamen, "toolserver-mapnik": toolserver };
let colors = ['#10B4CC','#FF3F9E','#476CDA','#63EA7A','#FFD06C','#FF766C','#9F3ED9'
,'#FFD200','red','#360DC4','#9AAFB2','darkred']
// d3.json("roads2.js", function(collection) {

//   console.log([collection])
//   console.log(roads)

//   var roadsTest = [collection];

//   var geojson_d3 = L.geoJson(roadsTest, {
//       onEachFeature: onEachFeature
//   })

//   overlays["geojson_d3"] = geojson_d3;

//   d3.json("roads2_topo.json", function(error, topology) {
//     //console.log(topology)
//     var collection2 = topojson.feature(topology, topology.objects.roads2);
//     var roadsTopoJSON = [collection2];

//     console.log(roadsTopoJSON)

//     var geojson_tj = L.geoJson(roadsTopoJSON, {
//         onEachFeature: onEachFeature
//     });

//     overlays["geojson_topojson"] = geojson_tj;

//     //console.log(collection.features[0].geometry.coordinates)

//     var control = L.control.layers(baseLayers, overlays).addTo(map);

//     //***described code can be found in the function 'setFeature()'...I need that as function to the 'hide/show overlay'
//     var feature;
//     setFeature();
//     //****

//     var bounds = d3.geo.bounds(collection2);

//     reset();

//     map.on("viewreset", reset);
//     map.on("drag", reset);

//     feature.on("mousedown",function(d){
//       var coordinates = d3.mouse(this);

//       //console.log(d,coordinates,map.layerPointToLatLng(coordinates))

//       L.popup()
//       .setLatLng(map.layerPointToLatLng(coordinates))
//       .setContent("<b>" + d.properties.street + "</b> is " + d.properties.length + "km long.")
//       .openOn(map);
//     });

//     var transition_destination = -1;
//     feature.on("mousemove",function(d){
//       d3.select(this).transition().duration(2500).ease('bounce')
//         .style("stroke","#0f0")
//         .attr("transform", "translate(0,"+transition_destination*50+")");
//       transition_destination=transition_destination*(-1);
//     })

//     function reset() {
//       bounds = [[map.getBounds()._southWest.lng, map.getBounds()._southWest.lat],[map.getBounds()._northEast.lng, map.getBounds()._northEast.lat]]
//       var bottomLeft = project(bounds[0]),
//           topRight = project(bounds[1]);

//       svgContainer.attr("width", topRight[0] - bottomLeft[0])
//           .attr("height", bottomLeft[1] - topRight[1])
//           .style("margin-left", bottomLeft[0] + "px")
//           .style("margin-top", topRight[1] + "px");

//       group.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

//       feature.attr("d", path);

//     }

//     //******Additional: hide/show overlay ******
//     var content = "hide overlay", color='#070';
//     svgContainer.append("text").text(content)
//         .attr("x", 50).attr("y", 50)
//         .style("font-size","30px").style("stroke",color)
//         .on("mouseover",function(d){
//             if(content=='hide overlay'){
//               content='show overlay';color='#f70';
//               group.selectAll('path').remove();
//             }
//             else {
//              content='hide overlay';color='#070';
//              setFeature();
//              reset();
//             }
//             d3.select(this).text(content).style("stroke",color)
//     });

//     //this is just a function from the existing code...as I need it to restore the removed paths
//     function setFeature(){
//       feature = group.selectAll("path")
//         .data(collection2.features)
//         .enter()
//         .append("path")
//         .attr("id","overlay");
//     }
//     //***************************
//   })

// })
function cargarMenu(id) {
  fetch("http://pcalles.masakisanto.net/index.php/ws/tcategorias/")
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      let cat = resp;
      console.log(cat);
      let catprincipal = cat.filter(resp=>{
          return resp.idtipocategoria==11 && resp.idcategoria!=154
      })
      
      let n=0;
      for (const key of catprincipal) {
        // fetch('http://localhost/myapp/index.php/ws/gi_parroquia/'+key.idcategoria).
        // then(response=> {
        // console.log(response)
        // })
        // $("#categorias").append(
        //   '<option value="' +
        //     key.idcategoria +
        //     '">' +
        //     key.categoria +
        //     "</option>"
        // );
        $('#categorias').append('        <button class="btn btn-primary btnc bt'+key.idcategoria+'" type="button" class="list-group-item list-group-item-action" onclick="accionCat(' +
             key.idcategoria +
             ')">' +
             key.categoria +'</button>        ');
        graficarCalle1(key.idcategoria);
        // $('#bt'+key.idcategoria).css('background-color',colors[n]);
        $('.bt'+key.idcategoria).click(r=>{
            if($('.bt'+key.idcategoria).hasClass( "activo" )){
                $('.bt'+key.idcategoria).removeClass('activo')
            }else{
                $('.bt'+key.idcategoria).addClass('activo')
            }
            
        })
        n++
      }
    
    }); // <option value="volvo">Volvo</option>
   
}
function accionCat(id){
    //$('.cat'+id).toggle();
    if($('.cat'+id).hasClass( "cactivo" )){
        $('.cat'+id).removeClass('cactivo')
    }else{
        $('.cat'+id).addClass('cactivo')
    }
}
cargarMenu();
function graficarCalle1(id) {
    fetch("http://www.digytronic.com/test/json/json" + id+'.php')
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        var geojson = L.geoJson(resp, {
            style:{
           
                className:'cat'+id
            },

          });
          geojson.setStyle({className: 'cat'+id})
          geojson.addTo(map);
       
        var overlays = {
          geoJson: geojson,
        };
  
        // function onEachFeature(feature, layer) {
        //   if (feature.properties) {
        //     layer.bindPopup(
        //       "<b>" +
        //         feature.properties.name +
        //         "</b>  " +
        //         feature.properties.prop0 +
        //         "."
        //     );
        //   }
        // }
  
        // var svgContainer = d3.select(map.getPanes().overlayPane).append("svg");
        //  var group = svgContainer.append("g");
        // var path = d3.geo.path().projection(project);
      });
  }
// function graficarCalle(id) {
//   fetch("http://localhost/myapp/index.php/ws/gi_parroquia/" + id)
//     .then((response) => {
//       return response.json();
//     })
//     .then((resp) => {
//       var geojson = L.geoJson(resp, {
//         onEachFeature: onEachFeature,
//       }).addTo(map);

//       var overlays = {
//         geoJson: geojson,
//       };

//       function onEachFeature(feature, layer) {
//         if (feature.properties) {
//           layer.bindPopup(
//             "<b>" +
//               feature.properties.prop0 +
//               "</b> is " +
//               feature.properties.length +
//               "km long."
//           );
//         }
//       }

//       var svgContainer = d3.select(map.getPanes().overlayPane).append("svg");
//       var group = svgContainer.append("g").attr("class", "leaflet-zoom-hide");
//       var path = d3.geo.path().projection(project);
//     });
// }
let i = 500;
let f = 1500;

function myTimer() {
  i++;
  console.log(i);
  if (i == f) {
    clearTimeout(myVar);
  }

  graficarCalle(i);
}
var myVar;

function anterior() {
  // myVar = setInterval(myTimer, 50)
  graficarCalle(1);
}
function siguiente() {
  clearTimeout(myVar);
}

function myTimer() {
  i++;
  console.log(i);
  graficarCalle(i);
}
function project(point) {
  var latlng = new L.LatLng(point[1], point[0]);
  var layerPoint = map.latLngToLayerPoint(latlng);
  return [layerPoint.x, layerPoint.y];
}
