// See sources on GitHub:
// https://github.com/mkalygin/snowflakes

var snowConfig = {
    color: [161 / 256, 197 / 256, 231 / 256],
    count: 1000,
    opacity: 0.8,
    density: 1 / 50,
  };
  var questions = [
    {question:"What's your first name?"},
  ]
  
  /**********
  
    !!!!!
    New Version: https://codepen.io/arcs/pen/rYXrNQ
    !!!!!
    
    Credits for the design go to XavierCoulombeM
    https://dribbble.com/shots/2510592-Simple-register-form
    
    This Pen uses no libraries except fonts and should 
    work on all modern browsers
    
    The answers are stored in the `questions` array
    with the key `value`. 
  
   **********/
  
  ;(function(){
  
    var tTime = 100  // transition transform time from #register in ms
    var wTime = 200  // transition width time from #register in ms
    var eTime = 1000 // transition width time from inputLabel in ms
  
    // init
    // --------------
    var position = 0
  
    putQuestion()
  
    progressButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e){
      transform(0, 0) // ie hack to redraw
      if(e.keyCode == 13) validate()
    })
  
    // functions
    // --------------
  
    // load the next question
    function putQuestion() {
      inputLabel.innerHTML = questions[position].question
      inputField.value = ''
      inputField.type = questions[position].type || 'text'  
      inputField.focus()
      showCurrent()
    }
   
    // when all the questions have been answered
    function done() {
        var obj = [
            {"name": "Arjun", "code": "prayaga"}, 
            {"name": "Balaji", "code": "haneesh"}, 
            {"name": "Jincy", "code": "arul"}, 
            {"name": "Prayaga", "code": "manasa"}, 
            {"name": "Arul", "code": "arjun"},
            {"name": "Vineeth", "code": "anitha"},
            {"name": "Sandeep", "code": "nisha"},
            {"name": "Bhushan", "code": "tejaswini"},
            {"name": "Haneesh", "code": "jijna"},
            {"name": "Jiya", "code": "vishal"},
            {"name": "Vishal", "code": "balaji"}
            
          ];
          
          // the code you're looking for
          var needle =questions[0].value;
          var name = needle.toLowerCase();
          
          // iterate over each element in the array
          for (var i = 0; i < obj.length; i++){
            // look for the entry with a matching `code` value
            if (obj[i].code == name){
               // we found it
              var x= obj[i].name
            }
          }

          
      // remove the box if there is no next question
      register.className = 'close'
      // add the h1 at the end with the welcome text
      var h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('Your Santa was ' + x + '!'))
      setTimeout(function() {
        register.parentElement.appendChild(h1)     
        setTimeout(function() {h1.style.opacity = 1}, 50)
      }, eTime)
    }
  
    // when submitting the current question
    function validate() {
  
      // set the value of the field into the array
      questions[position].value = inputField.value
  
      // check if the pattern matches
      if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
      else ok(function() {
        
        // set the progress of the background
        progress.style.width = ++position * 100 / questions.length + 'vw'
  
        // if there is a new question, hide current and load next
        if (questions[position]) hideCurrent(putQuestion)
        else hideCurrent(done)
               
      })
  
    }
  
    // helper
    // --------------
  
    function hideCurrent(callback) {
      inputContainer.style.opacity = 0
      inputProgress.style.transition = 'none'
      inputProgress.style.width = 0
      setTimeout(callback, wTime)
    }
  
    function showCurrent(callback) {
      inputContainer.style.opacity = 1
      inputProgress.style.transition = ''
      inputProgress.style.width = '88%'
      setTimeout(callback, wTime)
    }
  
    function transform(x, y) {
      register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }
  
    function ok(callback) {
      register.className = ''
      setTimeout(transform, tTime * 0, 0, 10)
      setTimeout(transform, tTime * 1, 0, 0)
      setTimeout(callback,  tTime * 2)
    }
  
   
  
  }())

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } 
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        
    });
  }
  
  /*An array containing all the country names in the world:*/
  var countries = ["Prayaga","Haneesh", "Arul", "Arjun", "Anitha", "Manasa", "Nisha", "Balaji",];
  
  /*initiate the autocomplete function on the "inputField" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("inputField"), countries);