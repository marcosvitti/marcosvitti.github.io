window.addEventListener('load', () => {
    if (document.getElementById('preloader')) {
        setTimeout(() => {
            document.getElementById('preloader').style.visibility = 'hidden';
            document.getElementById('preloader').style.opacity = '0';
        }, 350);
    }

    activateMenu();
} , false);
 
//Menu
// Toggle menu
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')

    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};
 
//Menu Active
function getClosest(elem, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
            let matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) { }
            return i > -1;
        };
    }

    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    return null;
};
 
function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");

    if (menuItems) {
        var matchingMenuItem = null;

        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }
 
        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');

            var immediateParent = getClosest(matchingMenuItem, 'li');
            if (immediateParent) {
                immediateParent.classList.add('active');
            }

            var parent = getClosest(immediateParent, '.child-menu-item');
            if (parent) {
                parent.classList.add('active');
            }
 
            var parent = getClosest(parent || immediateParent , '.parent-menu-item');
            if (parent) {
                parent.classList.add('active');
 
                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }
 
                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
             } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}

// Clickable Menu
if(document.getElementById("navigation")){
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for(var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if(elem.target.getAttribute("href") === "javascript:void(0)") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}
 
// Menu sticky
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if (navbar!=null) {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}
 
window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
});
 
// back-to-top
let mybutton = document.getElementById("back-to-top");
window.onscroll = function () {
    scrollFunction();
};
 
function scrollFunction() {
    if (mybutton!=null) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Feather icon
feather.replace();
 
 // dd-menu
let ddmenu = document.getElementsByClassName("dd-menu");
for (let i = 0, len = ddmenu.length; i < len; i++) {
    ddmenu[i].onclick = function (elem) {
        elem.stopPropagation();
    }
}
 
//Tooltip
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   return new bootstrap.Tooltip(tooltipTriggerEl)
});

//Contact js
try {
    function validateForm() {
        let name = document.forms["contact"]["name"].value;
        let email = document.forms["contact"]["email"].value;
        let subject = document.forms["contact"]["subject"].value;
        let comments = document.forms["contact"]["comments"].value;

        document.getElementById("error-msg").style.opacity = 0;
        document.getElementById('error-msg').innerHTML = "";

        if (
            verifyData(name, 'Por favor, preencha seu Nome') &&
            verifyData(email, 'Por favor, preencha seu E-mail') &&
            verifyData(subject, 'Por favor, preencha o Assunto') &&
            verifyData(comments, 'Por favor, descreva seu projeto')
        ) {
            document.forms["contact"].reset();

            const encodedMessage = encodeURIComponent(`Olá, vim pelo portfólio, seguem os dados do meu projeto\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nDescrição do Projeto: ${comments}`);
            window.open(`https://wa.me/5519971510255?text=${encodedMessage}`, '_blank').focus()

            return true;
        }

        return false;
    }

    function verifyData(variable, text) {
        if (variable == "" || variable == null) {
            document.getElementById('error-msg').innerHTML = `<div class='alert alert-warning error_message'>*${text}*</div>`;
            fadeIn();

            return false;
        }

        return true;
    }

    function fadeIn() {
        let fade = document.getElementById("error-msg");
        let opacity = 0;
        let intervalID = setInterval(function () {
            if (opacity < 1) {
                opacity = opacity + 0.5
                fade.style.opacity = opacity;
            } else {
                clearInterval(intervalID);
            }
        }, 200);
    }
} catch (error) {
     
}