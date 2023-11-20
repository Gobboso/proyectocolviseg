(function ($) {
    "use strict";

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $(document).ready(function() {
        function updateDivClass() {
            if ($(window).width() > 992) {
                $('.box').addClass('animate__animated');
                $('.box').addClass('wow');
            } else {
                $('.box').removeClass('animate__animated');
                $('.box').removeClass('wow');
            }
        }

        // Llamamos a la función al cargar la página
        updateDivClass();

        // Y también la llamamos cuando se redimensiona la ventana
        $(window).resize(function() {
            updateDivClass();
        });
    });

    // Desplazarse suavemente al principio de la página al hacer clic en el botón
    $('.btn-back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutExpo');
    });

    // Verificar la posición de desplazamiento inicial y mostrar u ocultar el botón en consecuencia
    $(document).ready(function () {
        if ($(window).scrollTop() > 200) {
            $('.back-to-top').show();
        }
    });

    $(".menu-toggle").click(function () {
        $(".menu-toggle").toggleClass('open');
        $(".menu-round").toggleClass('open');
    });

    $(document).ready(function () {
        var headerHeight = $('#fixed-header').outerHeight();
        $('#header-placeholder').css('height', headerHeight);
        $('#header-placeholder').css('display', 'none');

        $(window).on('scroll', function () {
            if ($(window).width() >= 992) {
                if ($(window).scrollTop() > 200) {
                    $('#fixed-header').addClass('fixed-top');
                    $('#header-placeholder').css('display', 'block');
                } else {
                    $('#fixed-header').removeClass('fixed-top');
                    $('#header-placeholder').css('display', 'none');
                }
            }
        });
    });

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


    $(document).ready(function () {
        const paths = {};
        const strokes = {};

        $('#map path').each(function () {
            const pathId = $(this).attr('id');
            const originalColor = $(this).css('fill');
            const originalStroke = $(this).css('stroke')
            paths[pathId] = originalColor;
            strokes[pathId] = originalStroke;
        });

        $('.city-link').mouseenter(function () {
            const color = $(this).data('color');
            const pathId = $(this).data('path');
            $(`#${pathId}`).addClass('city-map').css('fill', color);
            $(`#${pathId}`).addClass('city-map').css('stroke', color);
        });

        $('.city-link').mouseleave(function () {
            const pathId = $(this).data('path');
            const originalColor = paths[pathId];
            const originalStroke = strokes[pathId];
            $(`#${pathId}`).removeClass('city-map').css('fill', originalColor);
            $(`#${pathId}`).removeClass('city-map').css('stroke', originalStroke);
        });
    });

    $(document).ready(function () {
        // Seleccionamos los elementos que queremos manipular
        const divElement = $(".shadow-remove");
        const divElement2 = $(".shadow-sm-remove");
        const resizableDiv = $(".size-adjust");
        const resizableDiv2 = $(".size-adjust-2");
        const resizableDiv3 = $(".size-adjust-3");

        // Definimos la función que se ejecutará cuando se redimensione la pantalla
        function onResize() {
            // Obtenemos el ancho de la pantalla
            const windowWidth = $(window).width();

            // Si el ancho de la pantalla es menor que 992 píxeles
            if (windowWidth < 992) {
                // Removemos la clase "shadow" del primer elemento
                divElement.removeClass("shadow");
                divElement2.removeClass("shadow-sm");

                // Removemos las propiedades CSS "right" y "margin-left" de los elementos redimensionables
                resizableDiv.removeClass("size-adjust");
                resizableDiv2.removeClass("size-adjust-2");
                resizableDiv3.removeClass("size-adjust-3");
            } else {
                // Si no, agregamos la clase "shadow" al primer elemento
                resizableDiv.addClass("size-adjust");
                resizableDiv2.addClass("size-adjust-2");
                resizableDiv3.addClass("size-adjust-3");
                divElement.addClass("shadow");
                divElement2.addClass("shadow-sm");
            }
        }
        // Ejecutamos la función cuando se carga la página y cuando se redimensiona la pantalla
        $(window).on('load resize', onResize);
    });


    $(document).ready(function () {
        // Controlar eventos de clic en elementos de menú con submenús
        $('.dropdown-toggle').on('click', function (e) {
            e.preventDefault();

            // Cerrar todos los submenús excepto el submenú actual
            $('.dropdown-toggle').not(this).parent().removeClass('show');
            $('.dropdown-toggle').not(this).next('.dropdown-menu').removeClass('show');

            // Alternar la visibilidad del submenú actual
            $(this).parent().toggleClass('show');
            $(this).next('.dropdown-menu').toggleClass('show');
        });

        // Cerrar submenús al hacer clic fuera de ellos
        $(document).on('click', function (e) {
            if (!$('.navbar').is(e.target) && $('.navbar').has(e.target).length === 0) {
                $('.dropdown-toggle').parent().removeClass('show');
                $('.dropdown-toggle').next('.dropdown-menu').removeClass('show');
            }
        });
    });




    function animateCounter(target, duration, start, end) {
        const counterElement = $('#' + target);
        const content = counterElement.data('content'); // Obtiene el contenido personalizado del contador
    
        const range = end - start;
        const increment = end > start ? 1 : -1;
    
        const stepTime = Math.abs(Math.floor(duration / range));
    
        let current = start;
    
        const timer = setInterval(() => {
            current += increment;
            counterElement.text(current + ' ' + content);
    
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
            }
    
            if (Math.abs(current - end) <= Math.ceil(range / 10)) {
                clearInterval(timer);
    
                const newStepTime = Math.abs(Math.floor(duration / (range / 10)));
    
                const slowerTimer = setInterval(() => {
                    current += increment;
                    counterElement.text(current + ' ' + content);
    
                    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                        clearInterval(slowerTimer);
                    }
                }, newStepTime);
            }
        }, stepTime);
    }
    
    // Función de callback para la intersección en la observación del elemento
    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Obtiene los datos necesarios del elemento
                const target = $(entry.target).data('target');
                const duration = parseInt($(entry.target).data('duration'));
                const start = parseInt($(entry.target).data('start'));
                const end = parseInt($(entry.target).data('end'));
    
                // Inicia la animación del contador
                animateCounter(target, duration, start, end);
    
                // Deja de observar el elemento
                observer.unobserve(entry.target);
            }
        });
    }    

    // Obtiene todos los elementos de contador
    const counterElements = $('.counter');

    if ('IntersectionObserver' in window) {
        // Crea una instancia de IntersectionObserver si es compatible con el navegador
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observa cada elemento de contador
        counterElements.each(function () {
            observer.observe(this);
        });
    } else {
        // Si no es compatible con IntersectionObserver, inicia la animación de los contadores de forma predeterminada
        counterElements.each(function () {
            animateCounter($(this).data('target'), parseInt($(this).data('duration')), parseInt($(this).data('end')));
        });
    }


    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false, 
                margin: 15
            },
            600: {
                items: 3,
                nav: false,
                margin: 15
            },
            1000: {
                items: 4,
                nav: false,
                margin: 15
            }
        },
    });

    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });
})(jQuery)