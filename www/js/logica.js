
var  url_dominio = "http://192.168.1.7:8080/LuzDelNorteClient";
//var  url_dominio = "http://192.168.43.198:8080/LuzDelNorteClient";
var pagina = window.location.pathname; 

$(document).on('ready',function(){


    if( ( sessionStorage.getItem("nsuministro") != null ) && pagina !="/login.html" )
    {
    
          
    var  fecha = new Date();  
    $("#nombreId").text( " Usuario Responsable : " + sessionStorage.getItem("nombre") );    
    $("#suministroId").val( sessionStorage.getItem("nsuministro") );
    $("#fechaId").val( fecha.getDate() + "/" + ( fecha.getMonth() + 1 )  + "/" + fecha.getFullYear() );

    }



		$("#registrarId").on('click',function(){


        // Variables

  
				var nsuministro = $("#suministroId").val();				
				var consumo = $("#consumoId").val();
				var fecha = $("#fechaId").val(); 
        var  fecha1 = new Date();    

        var mes =  fecha1.getFullYear() + "" + ( fecha1.getMonth() + 1 ) ;

        url = url_dominio + "/RegistrarConsumoServlet";
        url += "?nsuministro=" + nsuministro + "&mes=" + mes + "&fecha=" + fecha + "&consumo=" + consumo + "&callback=?";
        


        $.getJSON( url , function(data){

          var mensaje = "";                  

          if(data.status == "OK")
          {

              mensaje = "registro correcto";

          }

          else
          {

            mensaje = "Hubo un error";

          }

           $("#dialogoId").text( mensaje);
           showDialog('dialog-1');
           window.location.href = "login.html";


        }); 

          

          
          


        //Variables del web service
        //var webServiceUrl = "http://192.168.1.7:8080/LuzDelNorteWS/LuzDelNorte";
        //var soapMessage = obtenerMensaje( nsuministro , consumo , fecha , mes );        
        //?nsuministro=71000489&mes=201605&fecha=12-05-2016&consumo=2001&callback=?
        //alert(soapMessage);
        //soap( webServiceUrl , soapMessage );

      });


    $("#ingresarId").on('click', function(){

      var nsuministro = $("#suministroId").val();
      //var  url = "http://192.168.43.198:8080/LuzDelNorteClient/RegistrarConsumoServlet";
      url = url_dominio +  "/ValidarClienteServlet";
      url += "?nsuministro=" + nsuministro  + "&callback=?";



      $.getJSON( url , function(data){

        console.log(data);

          if( data.status == "OK")
          {

             window.location.href = "registro.html";
             sessionStorage.setItem( "nsuministro" , nsuministro);
             sessionStorage.setItem( "nombre" , data.mensaje);             

          }else
          {

              showDialog( 'dialog-1' );

          }




      });


    });


		$("#resetId").on('click',function(){


				$("#consumoId").val('');


		});


});


// Funciones

var showDialog = function(id) 
{
  
  document.getElementById(id).show();

};

var hideDialog = function(id) 
{
  
  document.getElementById(id).hide();

};

/*

function obtenerMensaje( nsuministro , consumo , fecha , mes )
{

  var mensaje="";

  mensaje += '<?xml version="1.0" encoding="UTF-8"?>';
  mensaje += '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">';
  mensaje += '<SOAP-ENV:Header/>';
  
  mensaje += '<S:Body>';
  mensaje += '<ns2:registrarConsumo xmlns:ns2="http://ws/">';
  
  mensaje += '<nsuministro>' + nsuministro + '</nsuministro>';
  mensaje += '<mes>' + mes + '</mes>';
  mensaje += '<fecha>' + fecha + '</fecha>';
  mensaje += '<consumo>' + consumo + '</consumo>';

  mensaje += '</ns2:registrarConsumo>';
  mensaje += '</S:Body>';
  mensaje += '</S:Envelope>';


  return mensaje;

}


function soap( webService , mensajeXml ) 
{

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', webService , true);



xmlhttp.onreadystatechange = function () 
{

    if (xmlhttp.readyState == 4) 
    {
          if (xmlhttp.status == 200) 
          {
          
              alert('done. use firebug/console to see network response');

          }
    }

}

// Send the POST request

xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*')
xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
xmlhttp.send( mensajeXml );


}





function failAjax( jqXHR, textStatus, errorThrown)
{

  if (jqXHR.status === 0) {

    alert('Not connect: Verify Network.');

  } else if (jqXHR.status == 404) {

    alert('Requested page not found [404]');

  } else if (jqXHR.status == 500) {

    alert('Internal Server Error [500].');

  } else if (textStatus === 'parsererror') {

    alert('Requested JSON parse failed.');

  } else if (textStatus === 'timeout') {

    alert('Time out error.');

  } else if (textStatus === 'abort') {

    alert('Ajax request aborted.');

  } else {

    alert('Uncaught Error: ' + jqXHR.responseText);

  }

}


*/
