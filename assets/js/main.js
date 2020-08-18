var nizRadio = ["18-29","30-39","40-49","50-59","60-99"];
var brisanje=document.getElementsByClassName("brisanje");
var uspesnaPoruka=document.getElementById("ispisTacnePoruke");
var nizGradovi=[
   { "value": "BG","tekst": "Beograd"},
   { "value": "NS","tekst": "Novi Sad"},
   { "value": "KG","tekst": "Kragujevac"},
   { "value": "NI","tekst": "Niš"},
   { "value": "UE","tekst": "Užice"},
   { "value": "PP","tekst": "Prijepolje"},
   { "value": "ZR","tekst": "Zrenjanin"},
   { "value": "SU","tekst": "Subotica"},
   { "value": "KR","tekst": "Kraljevo"},
   { "value": "PŽ","tekst": "Požega"},
   { "value": "ŠA","tekst": "Šabac"}
]
function potvrda() {

        
        var ispravno = true;
        uspesnaPoruka.innerHTML="";
        var reIme = /^[A-ZŽŠĐČĆ][a-zšđčćž]{2,11}$/;
        var rePrezime = /^([A-ZŽŠĐČĆ][a-zšđčćž]{2,15})(\s[A-ZŽŠĐČĆ][a-zšđčćž]{2,15})*$/;
        var reEmail = /^\w+([\.\-]\w+)*@\w+([\.\-]\w+)*(\.\w{2,4})+$/;
        var ime = document.querySelector("#ime").value.trim();
        var prezime = document.querySelector("#prezime").value.trim();
        var email = document.querySelector("#email").value.trim();
        var svrha = document.querySelector("#svrha").value.trim();
        var poruka = document.querySelector("#poruka").value.trim();
        var godine = document.querySelector("#godine");

        if(!reIme.test(ime)) {
            document.querySelector("#ime").classList.add("border");
             ispravno = false;
         } else{
            document.querySelector("#ime").classList.remove("border");
         }

         if(!rePrezime.test(prezime)) {
            document.querySelector("#prezime").classList.add("border");
             ispravno = false;
         } else{
            document.querySelector("#prezime").classList.remove("border");
         }

         if(!reEmail.test(email)) {
            document.querySelector("#email").classList.add("border");
             ispravno = false;
         } 
         else{
            document.querySelector("#email").classList.remove("border");
         }
         if(svrha == "") {
            document.querySelector("#svrha").classList.add("border");
            ispravno = false;  
         } 
         else{
            document.querySelector("#svrha").classList.remove("border");
         }
        if(poruka == "") {
            document.querySelector("#poruka").classList.add("border");
            ispravno = false;  
         } 
         else{
            document.querySelector("#poruka").classList.remove("border");
         }
         var radio = document.getElementsByName("godine");

        
         var odabrano=false;
         var god1="";
         for(var i = 0; i < radio.length; i++) {
             if(radio[i].checked) {
                odabrano=true;
                god1=radio[i].value;
                break;
            }
         }
        


         if(!odabrano){
            godine.classList.add("crveniTekst");
            ispravno = false;  
         }
         else{
            godine.classList.remove("crveniTekst");
         }
         var odabrano1=false;
         var drop1=""
         var drop=document.querySelectorAll(".drop");
         for(var i = 1; i < drop.length; i++) {
            if(drop[i].selected) {
               odabrano1=true;
               drop1=drop[i].value;
               break;
            }
        }
       

        if(!odabrano1){
            document.querySelector("#dropLista").classList.add("border");
            ispravno = false;  
         }
         else{
            document.querySelector("#dropLista").classList.remove("border");
         }

         if(ispravno){
            uspesnaPoruka.innerHTML="Uspešno ste poslali poruku!";
            uspesnaPoruka.style.color="#00ff00";
            uspesnaPoruka.style.fontSize="25px";   
            for (let i = 0; i < brisanje.length; i++) {
            brisanje[i].value="";
            }
            drop[0].selected=true; 
            for(var i = 0; i < radio.length; i++) {
                radio[i].checked=false;
            }

            if(localStorage){
               localStorage.setItem("ime",ime);
               localStorage.setItem("prezime",prezime);
               localStorage.setItem("email",email);
               localStorage.setItem("godine",god1);
               localStorage.setItem("drop",drop1); 
            }
            else{
               console.log("Ne podrzava rad sa localStorage-om");
            }
           
         }
}     

   
   function prikaziProizvode(){
      $.ajax({
         url : "podaci/proizvodi.json",
         method : "GET",
         type : "json",
         success : function(data) {   
            ispisProizvoda(data);
         },
         error : function(xhr, error, status) {
             alert(status);
         }
     });
   }
   function ispisProizvoda(data){
      let ispis='';
            for (let i of data) {          
               ispis+=`<div class="clanakDrugi">
               <img src="${i.slika.src}" alt="${i.slika.alt}"/>
               <h3>${i.ime}</h3>
               <p>${i.cena} RSD</p>
               <table class="tabela">
                     <tr>
                        <td>Pol:</td>
                        <td>${i.tabela.pol}</td>
                     </tr>
                     <tr>
                        <td>Narukkvica:</td>
                        <td>${i.tabela.narukvica}</td>
                     </tr>
                     <tr>
                        <td>Mehanizam:</td>
                        <td>${i.tabela.mehanizam}</td>
                     </tr>
                     <tr>
                        <td>Vodootpornost:</td>
                        <td>${i.tabela.vodootpornost}</td>
                     </tr>
                     <tr>
                        <td>Funkcije:</td>
                        <td>${i.tabela.funkcije}</td>
                     </tr>
               </table>
            </div>`;
               }
            document.getElementById("proizvodi").innerHTML=ispis;
   }

   function filtrirajPoMarki(markaId) {
      
      $.ajax({
          url : "podaci/proizvodi.json",
          method : "GET",
          type : "json",
          success : function(data) {
              data = data.filter(p => p.marke.id == markaId);
              ispisProizvoda(data);
          },
          error : function(xhr, error, status) {
              alert(status);
          }
      });
  }

  function sortirajRastuce(){
   $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {

         if(document.querySelector("#dropMarke").value==0){
            data.sort(function(a,b) {
               if(a.cena == b.cena)
                   return 0;
               return a.cena < b.cena ? -1 : 1;
           });
         }
         else{
         data = data.filter(p => p.marke.id == document.querySelector("#dropMarke").value);

          data.sort(function(a,b) {
            if(a.cena == b.cena)
                return 0;
            return a.cena < b.cena ? -1 : 1;
        });
          }
          
          ispisProizvoda(data);
      },
      error : function(xhr, error, status) {
          alert(status);
      }
   });
   
  }

  function sortirajOpadajuce(){
   $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {
         if(document.querySelector("#dropMarke").value==0){
            data.sort(function(a,b) {
               if(a.cena == b.cena)
                   return 0;
               return a.cena > b.cena ? -1 : 1;
           });
         }
         else{
         data = data.filter(p => p.marke.id == document.querySelector("#dropMarke").value);

          data.sort(function(a,b) {
            if(a.cena == b.cena)
                return 0;
            return a.cena > b.cena ? -1 : 1;
        });
          }
          
          ispisProizvoda(data);
      },
      error : function(xhr, error, status) {
          alert(status);
      }
  });
  }

  function filterSearch() {

   $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {

         let vrednost = document.getElementById("search").value;
         let podaci = data.filter(p=> p.ime.toUpperCase().indexOf(vrednost.trim().toUpperCase()) != -1);
         ispisProizvoda(podaci);
      
      },
      error : function(xhr, error, status) {
          alert(status);
      }
  });
   
 }


window.onload = function () {

  
   
   prikaziProizvode();
    
    $.ajax({
      url : "podaci/mreze.json",
      method : "GET",
      type : "json",
      success : function(data) {
         let ispis='';
         data.forEach(function (deo) {
             ispis += `<li><a href="${deo.mreza}" target="_blank"><i class="${deo.fafa}"></i></a></li>`;
         });
         document.getElementById("mreze1").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
          alert(status);
      }
  });
    $.ajax({
      url : "podaci/opis.json",
      method : "GET",
      type : "json",
      success : function(data) {
         let ispis=`<p class="tekstGalerije nevidljiv vidljiv">${data[0]}</p>`;
         
         for (let i = 1; i < data.length; i++) {
            ispis+=`<p class="tekstGalerije nevidljiv">${data[i]}</p>`;
         }
         document.getElementById("opis").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
          alert(status);
      }
  });

    $.ajax({
      url : "podaci/slike.json",
      method : "GET",
      type : "json",
      success : function(data) {
         let ispis=`<a href="assets/img/${data[0].velika}" data-lightbox="ourgallery">
         <img src="assets/img/${data[0].mala}" class="nevidljiv vidljiv" alt="${data[0].alt}"/></a>`;
         for (let i = 1; i < data.length; i++) {
            ispis+=`<a href="assets/img/${data[i].velika}" data-lightbox="ourgallery">
            <img src="assets/img/${data[i].mala}" class="nevidljiv" alt="${data[i].alt}"/></a>`;
            }
         document.getElementById("slike1").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
          alert(status);
      }
  });

  $.ajax({
      url : "podaci/marke.json",
      method : "GET",
      type : "json",
      success : function(data) {
         let ispis='';
         for (let i of data) {
            ispis+=`<option value="${i.id}">${i.naziv}</option>`;
         }
         
         document.getElementById("dropMarke").innerHTML+=ispis;
      },
      error : function(xhr, error, status) {
         alert(status);
      }
   });

   $.ajax({
      url : "podaci/brendovi.json",
      method : "GET",
      type : "json",
      success : function(data) {
         let ispis='';
         for (let i of data) {
            if(i.prvi){
               ispis+=`<div class="clanak" id="prviClanak">`;
            }
            else{
               ispis+=`<div class="clanak">`;

            }
				ispis+=`<h2>${i.naziv}</h2>
            <img src="${i.slika.src}" alt="${i.slika.alt}"/>
            <p>${i.tekst.manji}</p>
            <p class="tekstClanak">${i.tekst.veliki}</p>
            <button type="button" class="maloDugme">Više</button>
             </div>`;		       
         }
         document.getElementById("brendovi2").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
         alert(status);
      }
   });
   

   document.querySelector("#dropMarke").addEventListener("change", function() {
      Number(this.value) ? filtrirajPoMarki(this.value) : prikaziProizvode();
   });

   document.querySelector("#sortiranje").addEventListener("change", function() {
      let val= Number(this.value); 
      if(val==1){
         sortirajRastuce();
      }else if(val==2){
         sortirajOpadajuce();
      }

   });

   document.querySelector("#search").addEventListener("keyup", filterSearch);
   

    var brojac1=document.querySelector("#brojac");
    for (let i = 0; i <11; i++) {
        brojac1.innerHTML+=`<li class="brojac1">${i+1}</li>`;
    }

    brojac1.innerHTML+=`<li class="brojac1 aktivan">${12}</li>`;

   
   
    let ispis=`<option value="0" class="drop">Izaberite...</option>`;
    nizGradovi.forEach(function (deo) {
      ispis += `<option value="${deo.value}" class="drop">${deo.tekst}</option>`;
    });
    document.getElementById("dropLista").innerHTML=ispis;
	
	
	
	 document.getElementsByName("posalji")[0].addEventListener("click", potvrda);

 

    var radio=document.getElementById("radio");
    var ispisGodina=``;
    for(let i of nizRadio){
      ispisGodina+=`<li><label class="pol"> <input type="radio" name="godine" value="${i}"/>${i}</label></li>`; 
    }
    radio.innerHTML =ispisGodina;
    

    document.getElementsByName("brisanje")[0].addEventListener("click", function () {  
        uspesnaPoruka.innerHTML="";
        for (let i = 0; i < brisanje.length; i++) {
            brisanje[i].value=""
            brisanje[i].classList.remove("border");
            }
            document.getElementsByClassName("drop")[0].selected=true; 
            for(var i = 0; i < radio.length; i++) {
                radio[i].checked=false;
            }
            document.getElementById("godine").classList.remove("crveniTekst"); 
    });

    if(localStorage){
     
      document.querySelector("#ime").value=localStorage.getItem("ime");
      document.querySelector("#prezime").value=localStorage.getItem("prezime");
      document.querySelector("#email").value=localStorage.getItem("email");
      let god=localStorage.getItem("godine");
      let drop=localStorage.getItem("drop");


      let god1=document.getElementsByName("godine");
      let drop1=document.getElementsByClassName("drop");
     
      for(var i = 0; i < god1.length; i++) {
         if(god1[i].value==god) {
            god1[i].checked=true;
            break;
        }
       }
    
     for(var i = 0; i < drop1.length; i++) {
      if(drop1[i].value==drop) {
         drop1[i].selected=true;        
         break;
     }
     
    }

   }
}

	
							
							
							