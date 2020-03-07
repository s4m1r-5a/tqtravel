var scaling = 1;
//count
var currentSliderCount = 0;
var videoCount = $(".row").children().length;
var showCount = 0;
var sliderCount = 1;
var controlsWidth = 40;
var scollWidth = 0;
var win = $(window);
var prev = $(".prev");
var next = $(".next");
//sizes
var windowWidth = 0;
var frameWidth = 0;

$(document).ready(function() {
    var player = new Playerjs({ id: "player" });
    var player2 = new Playerjs({ id: "player2" });
    var player3 = new Playerjs({ id: "player3" });
    var player4 = new Playerjs({ id: "player4" });
    var player5 = new Playerjs({ id: "player5" });
    $(".tile").on({
        mouseenter: function() {
            play = $(this).children('.tile__media').attr("id");
            pley = play + '.api("play", "https://mdstrm.com/live-stream-playlist/57d01d6c28b263eb73b59a5a.m3u8");';
            sto = play + '.api("stop");';
            eval(pley);
        },
        mouseleave: function() {
            eval(sto);
        }
    });
    init();
});
$(window).resize(function() {
    init();
});

function init() {
    windowWidth = win.width();
    frameWidth = win.width() - 80;
}

next.on("click", function() {
    var padre = $(this).parent();
    scollWidth = parseFloat(padre.children(".px").val());
    scollWidth = scollWidth - frameWidth;
    padre.children(".px").val(scollWidth)
    padre.children("div.row").velocity({
        left: scollWidth
    }, {
        duration: 700,
        easing: "swing",
        queue: "",
        loop: false, // Si la animación debe ciclarse
        delay: false, // Demora
        mobileHA: true // Acelerado por hardware, activo por defecto
    });
    padre.children("div.row").css("left", scollWidth);
    currentSliderCount--;
    padre.children(".ctn").val(currentSliderCount);
    console.log(currentSliderCount)
});

prev.on("click", function() {
    var padre = $(this).parent();
    scollWidth = parseFloat(padre.children(".px").val());
    scollWidth = scollWidth + frameWidth;
    padre.children(".px").val(scollWidth)
    console.log(padre.children(".ctn").val() + ' ' + (sliderCount - 1))
    if (parseFloat(padre.children(".ctn").val()) >= sliderCount - 1) {
        padre.children("div.row").css("left", 0);
        currentSliderCount = 0;
        padre.children(".ctn").val(currentSliderCount);
        //scollWidth = 0;
        padre.children(".px").val(0)
    } else {
        currentSliderCount++;
        padre.children(".ctn").val(currentSliderCount);
        padre.children('div.row').velocity({
            left: scollWidth
        }, {
            duration: 700,
            easing: "swing",
            queue: "",
            //begin: function() {
            //console.log("iniciando animación")
            //},
            //progress: function() {
            //console.log("animación en proceso")
            //},
            //complete: function() {
            // console.log("animación completada")
            //},
            loop: false, // Si la animación debe ciclarse
            delay: false, // Demora
            mobileHA: true // Acelerado por hardware, activo por defecto
        });
    }
});


























//funciones glovales
function Moneda(valor) {
    valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
    return valor;
}
//mensajes
function SMSj(tipo, mensaje) {
    var message = mensaje;
    var title = "Tq Travel";
    var type = tipo;
    toastr[type](message, title, {
        positionClass: "toast-top-right",
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
        timeOut: 7500
    });
};
$(document).ready(function() {
    moment.locale('es');
    $('a.r').css("color", "#bfbfbf");
    $("a.r").hover(function() {
            $(this).next('div.reditarh').show();
            $(this).css("color", "#000000");
        },
        function() {
            $('.reditarh').hide("slow");
            $(this).css("color", "#bfbfbf");
        });

});




var $validationForm = $("#smartwizard-arrows-primary");
$validationForm.smartWizard({
    theme: "arrows",
    showStepURLhash: false,
    lang: { // Variables del lenguaje
        next: 'Siguiente',
        previous: 'Atras'
    },
    toolbarSettings: {
        toolbarPosition: 'bottom', // none, top, bottom, both
        toolbarButtonPosition: 'right', // left, right
        showNextButton: true, // show/hide a Next button
        showPreviousButton: false // show/hide a Previous button
            //toolbarExtraButtons: [$("<button class=\"btn btn-submit btn-primary\" type=\"button\">Finish</button>")]
    },
    autoAdjustHeight: false,
    backButtonSupport: false,
    useURLhash: false
}).on("leaveStep", () => {
    var fd = $('form').serialize();
    let skdt;
    $.ajax({
        url: '/links/id',
        data: fd,
        type: 'POST',
        async: false,
        success: function(data) {
            //alert(data)
            if (data != 'Pin de registro invalido, comuniquese con su distribuidor!') {
                $('.h').attr("disabled", false);
                $('#categoria').val(data[0].categoria)
                skdt = true;
            } else if ($('#ipin').val() != "") {
                $(".alert").show();
                $('.alert-message').html('<strong>Error!</strong> ' + data);
                setTimeout(function() {
                    $(".alert").fadeOut(3000);
                }, 2000);
                skdt = false;
            }
        }
    });
    return skdt;
});

function init_events(ele) {
    ele.each(function() {
        // crear un objeto de evento (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // no necesita tener un comienzo o un final
        var eventObject = {
                title: $.trim($(this).text()) // Usa el texto del elemento como título del evento.
            }
            // almacenar el objeto de evento en el elemento DOM para que podamos acceder a él más tarde
        $(this).data('eventObject', eventObject)
            // haz que el evento se pueda arrastrar usando jQuery UI
        $(this).draggable({
            zIndex: 1070,
            revert: true, // hará que el evento vuelva a su
            revertDuration: 0 //  Posición original después del arrastre
        })
    })
};

$('.pagarpayu').attr("disabled", true);
$('.ntfx').attr("disabled", true);
$('input[name="nombre"]').attr("disabled", true);

$('.pagar').change(function() {
    card = $(this).parents('div.card').attr("id")
    var fd = $(`#${card} form`).serialize();
    actualizardatos(card, fd)
});

function actualizardatos(card, fd, ot) {
    if ($(`#${card} input[name="telephone"]`).val() != "" && $(`#${card} input[name="buyerFullName"]`).val() != "" && $(`#${card} input[name="buyerEmail"]`).val() != "") {
        $.ajax({
            url: '/links/cliente',
            data: fd,
            type: 'POST',
            async: false,
            success: function(data) {
                if (data[0] !== 'smg') {
                    $(`#${card} .pagarpayu`).attr("disabled", false);
                    if (ot) {
                        $(`.pagarpayu`).attr("disabled", false);
                        $(`input[name="telephone"]`).val(data[2][0].id);
                        $(`input[name="buyerFullName"]`).val(data[2][0].name);
                        $(`input[name="buyerEmail"]`).val(data[2][0].email);
                    }
                    $('input[name="signature"]').val(data[0]);
                    $('input[name="referenceCode"]').val(data[1]);
                } else {
                    $('#actualizardatos').html(`${data[1]}Si desea realizar alguna modificacion a tu cuenta presione editar, en caso contrario verifique bien los datos ingresados e intentelo nuevamente, para mayor informacion puede contactarnos al 3012673944 Wtspp`)
                    $('#actualizar').modal('toggle');
                    let cont = 0;
                    let dat = data[2].map((r) => {
                        cont++
                        return `<li class="mb-4">
                            <input type="text" name="telephone" class="form-control pagar g${cont}" placeholder="Movil"
                            style="text-align:center" value="${r.id}">
                        </li>
                        <li class="mb-4">
							<input type="hidden" name="actualizar" class="g${cont}" value="${r.id}">
						</li>
                        <li class="mb-4">
                            <input type="text" name="buyerFullName" class="form-control pagar g${cont}"
                            placeholder="Nombre completo" style="text-align:center;" value="${r.name}">
                        </li>
                        <li class="mb-4">
                            <input type="email" name="buyerEmail" class="form-control pagar g${cont}" placeholder="Email"
                            style="text-align:center;" value="${r.email}">
                        </li>
                        <li class="mb-4">
                            <hr width=400>
                        </li>`
                    });
                    $('#datosactualiza').html(dat);
                }
            }
        });
    }
}
$(".pagar").keydown(function() {
    $(`.pagarpayu`).attr("disabled", true);
});
$('#meterdat').on('click', function() {
    card = $(this).parents('div.card').attr("id")
    var fd = $(`#${card} form`).serialize(),
        ot = 'ot';
    actualizardatos(card, fd, ot)
});
$('#eliminard').on('click', function() {
    $(".g2").remove('input');
    $(".g1").remove('input');
});
$('#datosactualiza').on('change', '.g1', function() {
    $(".g2").remove('input');
});
$('#datosactualiza').on('change', '.g2', function() {
    $(".g1").remove('input');
});
if ($('#iuxemail').html() == '' && $('#iuxemail').is(':visible')) {
    window.location.href = "https://iux.com.co/app/login";
};
if ($('#msg').html() == 'aprobada') {
    history.pushState(null, "", "planes?iux=ir");
};
$('#iriux').click(function() {
    window.location.href = "https://iux.com.co/app/login";
});
if ($('#pin').is(':visible') || $('.ver').is(':visible')) {
    $('.h').attr("disabled", true);
} else {
    $("nav.navbar").show();
};
$('#quien').change(function() {
    var fd = { quien: $('#quien').val() };
    $.ajax({
        url: '/links/patro',
        data: fd,
        type: 'POST',
        success: function(data) {
            $('#id').val(data[0].id);
            $('input[name="id"]').val(data[0].usuario);
        }
    });
});
$(`.movil`).change(function() {
    $('form input[name="nombre"]').val("");
    $('form input[name="user"]').val("");
    var fd = { movil: $(this).val().replace(/-/g, "") };
    $.ajax({
        url: '/links/movil',
        data: fd,
        type: 'POST',
        success: function(data) {
            $(`#${formu} input[name="nombre"]`).val(data[0].nombre);
            $(`#${formu} input[name="user"]`).val(data[0].id);
        }
    });
    $(`form input[name="nombre"]`).attr("disabled", true);
    $(`form .ntfx`).attr("disabled", true);
    $(`#${formu} input[name="nombre"]`).attr("disabled", false);
    $(`#${formu} .ntfx`).attr("disabled", false);
});
$('#ventaiux').click(function() {
    var fd = $('#formulario').serialize();
    //alert($('input[name="movil"]').val());
    $.ajax({
        url: 'https://iux.com.co/x/venta.php',
        data: fd,
        type: 'POST',
        success: function(data) {
            alert(data);
        }
    });
});
$('#canjear').click(function() {
    var fd = { pin: $('#pin').val() };
    $.ajax({
        url: '/links/canjear',
        data: fd,
        type: 'POST',
        success: function(data) {
            if (data !== 'Pin invalido!') {
                $('#precio').html('$' + data[0].precio);
                $('#tiempo').html(data[0].dias + ' Dias');
                $('input[name="pin"]').val(data[0].pin);
                $('.z').show("slow");
                $('.y').hide("slow");
            } else {
                alert(data)
            }
        }
    });
});
$('#ediact').click(function() {
    $('.p').hide("slow");
    $('.q').show("slow");
});
$('.plancito').click(function() {
    card = $(this).parents('div.card').attr("id")
    let clase = $(this).attr('href');
    $(`#${card} ${clase}`).show("slow");
    $(`#${card} .z`).hide("slow");
});
$('.payu').click(function() {
    card = $(this).parents('div.card').attr("id")
    let clase = $(this).attr('name');
    $(`#${card} ${clase}`).show("slow");
});
$('.plancit').click(function() {
    let clase = $(this).attr('href');
    $(clase).hide("slow");
    $('.x').hide("slow");
    $('.z').show("slow");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (window.location == `${window.location.origin}/links/calendario`) {
    $(document).ready(function() {
        /*$('#precio').mask('000,000,000', {
            reverse: true,
            selectOnFocus: true
        });*/
        // $('.example').mask('0#'); hace que solo permita numeros en el campo
        //$('.date').cleanVal(); Obtener el valor escrito sin máscara osea sin puntos
        //$('.docu').mask('0#');
        $('.clu').mask('0#');
        $('.val').mask('000,000,000', { reverse: true });
        $('a.reditar').css("color", "#bfbfbf");
        let p = '',
            valors = new Array(),
            nuevoclient = false,
            nuevaruta = false;
        $('#agregarpax').on('click', function() {
            if ($('.datospax').is(':visible') && $('.nomb').val() !== "") {
                let doc = $('.docu').val() || 'null',
                    clu = $('.clu').val() || 'null',
                    dir = $('.dircc').val() || 'null',
                    pasajero = $('.nomb').val() + '-' + doc + '-' + clu + '-' + dir
                $('.pasajero').append(`<a class="ele ${pasajero}"><spam class="badge badge-primary mr-1 eli">${pasajero},</spam></a>`);
                $('.pasajeros').show("slow");
                $('.nomb').val('');
                $('.docu').val('');
                $('.clu').val('');
                $('.dircc').val('');
            } else {
                $('.datospax').show("slow");
            }
        })
        $('#pasajero').on('dblclick', 'a.ele', function() {
            let cont, clas = '.' + $(this).text().replace(/ /g, ".");
            $(clas.replace(/,/g, "")).remove();
            cont = $("a.ele").length;
            if (cont < 1) { $('.pasajeros').hide("slow") };
        })
        $('#editarreserva').click(function() {
            $('.editar').show("slow");
            $('.sineditar').hide("slow");
        })
        $('.cancelarpax').click(function() {
            $('.datospax').hide("slow");
            $('.docu').val('');
            $('.clu').val('');
            $('.nomb').val('');
            $('.dircc').val('');
        })
        $('#npasajeros').change(function() {
            let ide = '.' + $('#destino').val(),
                nuevoprecio = new Array();
            valors = $('input' + ide).val().split('-');
            if ($('#destino').val() !== "" && $('#yvuelta').val() === 'SI...') {
                $.each(valors, function(index, elemento) {
                    nuevoprecio[index] = parseFloat(elemento.replace(/(?!\w|\s).| /g, "")) * 2;
                })
                if ($(this).val() >= 1 && $(this).val() <= 3) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[0].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 4 && $(this).val() <= 7) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[1].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 8 && $(this).val() <= 11) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[2].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 12 && $(this).val() <= 15) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[3].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 16 && $(this).val() <= 20) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[4].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 21 && $(this).val() <= 23) {
                    $('#precio').val(Moneda(parseFloat(nuevoprecio[5].replace(/(?!\w|\s).| /g, ""))));
                };
            } else if ($('#destino').val() !== "") {
                if ($(this).val() >= 1 && $(this).val() <= 3) {
                    $('#precio').val(Moneda(parseFloat(valors[0].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 4 && $(this).val() <= 7) {
                    $('#precio').val(Moneda(parseFloat(valors[1].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 8 && $(this).val() <= 11) {
                    $('#precio').val(Moneda(parseFloat(valors[2].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 12 && $(this).val() <= 15) {
                    $('#precio').val(Moneda(parseFloat(valors[3].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 16 && $(this).val() <= 20) {
                    $('#precio').val(Moneda(parseFloat(valors[4].replace(/(?!\w|\s).| /g, ""))));
                } else if ($(this).val() >= 21 && $(this).val() <= 23) {
                    $('#precio').val(Moneda(parseFloat(valors[5].replace(/(?!\w|\s).| /g, ""))));
                };
            };
        })
        $('#irOrden').on('click', function() {
            RecolectarDatosGUI();
            var url = `/links/ordendeservicio?id=${NuevoEvento.id}&title=${NuevoEvento.title}`;
            $(location).attr('href', url);
        });
        $('#rguardar').on('click', function() {
            let accion;
            if ($('#idreserv').val()) {
                accion = 'edit'
            } else {
                accion = 'add'
            }
            RecolectarDatosGUI();
            EnviarInformacion(accion, NuevoEvento);
        });
        $('#eliminar').on('click', function() {
            let eliminar = $('#idreserv').val();
            $('#ModalEventos').modal('toggle');
            $("#ModalConfir").modal();
            $('#btnDelet').click(function() {
                EnviarInformacion('delete', { id: eliminar }, true);
            });
        });
        $("a.reditar").hover(function() {
                $(this).next('div.reditarh').show();
                $(this).css("color", "#000000");
            },
            function() {
                $('.reditarh').hide("slow");
                $(this).css("color", "#bfbfbf");
            });

        $(".reditar").on({
            focus: function() {
                $(this).css("background-color", "#FFFFCC");
                $(this).next('div.reditarh').show("slow");
                this.select();
                if ($(this).attr("id") === 'yvuelta') {
                    p = '#' + $(this).attr("id");
                    $('.yvuelta').show("slow");
                }
            },
            blur: function() {
                $(this).css({
                    "background-color": "transparent"
                });
                $('.reditarh').hide("slow");
                $('.item').hide("slow");
                $('.yvuelta').hide("slow");
            },
            change: function() {
                if ($(this).attr('id') === 'destino' && nuevaruta) {
                    $('.editar').hide("slow");
                    $('.modal-header').hide("slow");
                    $('#ingresarutas').show("slow");
                    $('spam.titulorutas').text(titleCase(`Registrar ruta de ${$('#origen').val()} hasta ${$('#destino').val()}`))
                } else if ($(this).attr('id') === 'reserva' && nuevoclient) {
                    $('.editar').hide("slow");
                    $('.modal-header').hide("slow");
                    $('#ingresaClient').show("slow");
                    $('spam.tituloClient').text(titleCase(`Registra a ${$('#reserva').val()}...`))
                }
                $(this).val($(this).val().toLowerCase().trim().split(' ').map(v => v[0].toUpperCase() + v.substr(1)).join(' '))
            }
        });
        $('.cerrarutas').click(function() {
            $('#destino').val('');
            $('#precio').val('');
            $('.editar').show("slow");
            $('.modal-header').show("slow");
            $('#ingresarutas').hide("slow");
            $('spam.titulorutas').text('')
            $('input.val').val('');
        })
        $('.cerrarClient').click(function() {
            $('.editar').show("slow");
            $('.modal-header').show("slow");
            $('#ingresaClient').hide("slow");
            $('spam.tituloClient').text('');
            $('#reserva').val('');
            $('.reditar.nit').val('');
            $('.reditar.tel').val('');
            $('.reditar.email').val('');
            $('.reditar.web').val('');
            $('.reditar.addres').val('');
            //$('input[name="tipoClient"]').attr('checked', false);
            $('input[name="tipoClient"]').removeAttr('checked');
        })
        $('#registraClient').click(() => {
            let cliente = {
                categoria: $('input:radio[name=tipoClient]:checked').val(),
                nombre: $('#reserva').val(),
                nit: $('.reditar.nit').val(),
                telefono: $('.reditar.tel').val(),
                email: $('.reditar.email').val(),
                dominio: $('.reditar.web').val(),
                direccion: $('.reditar.addres').val()
            }
            $.ajax({
                url: '/links/clientes',
                data: cliente,
                type: 'POST',
                async: false,
                success: function(data) {
                    //$('div.item.reserva').detach()
                    $.each(data, function(index, elemento) {
                        if ($(`.item.reserva.r${data[0][index].id}`).length < 1) {
                            $('.reserv').append(
                                `<div class="item reserva r${data[0][index].id}" style="display: none;">
                                <a class="nombres" id="r${data[0][index].id}">${data[0][index].nombre}</a>
                            </div>`);
                        }
                    });
                    $('#cliente').val(data[1]);
                    $('.editar').show("slow");
                    $('.modal-header').show("slow");
                    $('#ingresaClient').hide("slow");
                    $('spam.tituloClient').text('');
                    $('.reditar.nit').val('');
                    $('.reditar.tel').val('');
                    $('.reditar.email').val('');
                    $('.reditar.web').val('');
                    $('.reditar.addres').val('');
                    $('input[name="tipoClient"]').removeAttr('checked');
                    SMSj('success', 'Cliente registrado exitosamente');
                }
            });
        })
        $('#registraruta').click(() => {
                let precio = new Array();
                $('input.val').each(function(index, elemento) {
                    precio[index] = $(elemento).val()
                })
                let ruta = {
                    origen: $('#origen').val(),
                    destino: $('#destino').val(),
                    precio1: precio[0].replace(/(?!\w|\s).| /g, ""),
                    precio2: precio[1].replace(/(?!\w|\s).| /g, ""),
                    precio3: precio[2].replace(/(?!\w|\s).| /g, ""),
                    precio4: precio[3].replace(/(?!\w|\s).| /g, ""),
                    precio5: precio[4].replace(/(?!\w|\s).| /g, ""),
                    precio6: precio[5].replace(/(?!\w|\s).| /g, "")
                }
                $.ajax({
                    url: '/links/rutas',
                    data: ruta,
                    type: 'POST',
                    async: false,
                    success: function(data) {
                        $.each(data, function(index, elemento) {
                            if ($(`.item.destino.${data[0][index].origen}`).length < 1) {
                                $('.rutad').append(
                                    `<div class="item destino ${data[0][index].origen}" style="display: none;">
                                    <a class="nombres encontrado ${data[0][index].destino} ${data[0][index].id}" id="${data[0][index].precio1}">${data[0][index].destino}</a>
                                    <input class="valores ${data[0][index].destino} ${data[0][index].id}" type="hidden"
                                    value="${data[0][index].precio1}-${data[0][index].precio2}-${data[0][index].precio3}-${data[0][index].precio4}-${data[0][index].precio5}-${data[0][index].precio6}">
                                </div>`
                                );
                            };
                            if ($(`.item.origen.${data[0][index].origen}`).length < 1) {
                                $('#rutao').append(
                                    `<div class="item origen ${data[0][index].origen}" style="display: none;">
                                    <a class="nombres encontrado" id="${data[0][index].id}">${data[0][index].origen}</a>
                                </div>`
                                );
                            }
                        })
                        $('#ruta').val(data[1])
                        $('#precio').val('');
                        $('.editar').show("slow");
                        $('.modal-header').show("slow");
                        $('#ingresarutas').hide("slow");
                        $('spam.titulorutas').text('')
                        $('input.val').val('');
                        SMSj('success', 'Ruta registrada exitosamente');
                    }
                });
            })
            //Buscador
        $('.reditar').keyup(function() {
            p = $(this).attr("id")
            if ($(this).val() != "") {
                var nombres = $('.nombres');
                var buscando = $(this).val().toLowerCase();
                var item = '',
                    f, clas, valu;
                if (p === 'destino') {
                    f = `.item.${p}.${$('#origen').val().replace(/ /g, ".")}`;
                } else {
                    f = `.item.${p}`;
                }
                p = '#' + p
                for (var i = 0; i < nombres.length; i++) {
                    item = $(nombres[i]).html().toLowerCase();
                    for (var x = 0; x < item.length; x++) {
                        if (buscando.length == 0 || item.indexOf(buscando) > -1) {
                            $(nombres[i]).parents(f).show("slow");
                        } else {
                            $(nombres[i]).parents(f).hide("slow");
                        }
                    }
                }
                //if ($(this).attr("id") === 'destino' && $('.item:hidden').length < 1){
                if ($(this).attr("id") === 'destino' && $('.item:visible').length < 1) {
                    nuevaruta = true;
                }
                if ($(this).attr("id") === 'reserva' && !$('.item.reserva:visible').length) {
                    nuevoclient = true;
                }
                //ocultar todos las rutas de origen con el mismo valor
                $('#rutao div.item').each(function(index, elemento) {
                    clas = '.' + $(elemento).attr("class").replace(/ /g, ".");
                    valu = $(elemento).text()
                    $(clas).filter(function() {
                        return this.textContent === valu;
                    }).slice(0, -1).detach();
                });
            } else {
                $('.item').hide("slow");
                nuevaruta = false;
                nuevoclient = false;
            }
        });

        $(".nombres").on({
            mousedown: function() {
                $(p).focus();
                nuevaruta = false;
            },
            mouseup: function() {
                let pax = $('#npasajeros').val();
                if (p === '#origen') {
                    let ide = '.' + $(this).attr('id')
                    $(p).val($(this).text());
                    $('#destino').val($(ide).text());
                    $('#ruta').val($(this).attr('id'));
                    valors = $('input' + ide).val().split('-');
                    if (pax >= 1 && pax <= 3) {
                        $('#precio').val(Moneda(parseFloat(valors[0].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 4 && pax <= 7) {
                        $('#precio').val(Moneda(parseFloat(valors[1].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 8 && pax <= 11) {
                        $('#precio').val(Moneda(parseFloat(valors[2].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 12 && pax <= 15) {
                        $('#precio').val(Moneda(parseFloat(valors[3].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 16 && pax <= 20) {
                        $('#precio').val(Moneda(parseFloat(valors[4].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 21 && pax <= 23) {
                        $('#precio').val(Moneda(parseFloat(valors[5].replace(/(?!\w|\s).| /g, ""))));
                    };
                } else if (p === '#destino') {
                    let ide = '.' + $(this).attr('id')
                    $(p).val($(this).text());
                    $('#ruta').val($(this).attr('id'));
                    valors = $('input' + ide).val().split('-');
                    if (pax >= 1 && pax <= 3) {
                        $('#precio').val(Moneda(parseFloat(valors[0].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 4 && pax <= 7) {
                        $('#precio').val(Moneda(parseFloat(valors[1].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 8 && pax <= 11) {
                        $('#precio').val(Moneda(parseFloat(valors[2].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 12 && pax <= 15) {
                        $('#precio').val(Moneda(parseFloat(valors[3].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 16 && pax <= 20) {
                        $('#precio').val(Moneda(parseFloat(valors[4].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 21 && pax <= 23) {
                        $('#precio').val(Moneda(parseFloat(valors[5].replace(/(?!\w|\s).| /g, ""))));
                    };

                } else if ($(this).text() === 'SI...' && $('#precio').val() !== "") {
                    let precio = $('#precio').cleanVal();
                    $('#precio').val(Moneda(precio * 2));
                    $(p).val($(this).text());

                } else if ($(this).text() === 'NO...' && $('#precio').val() !== "") {
                    let ide = '.' + $('#destino').val();
                    valors = $('input' + ide).val().split('-');
                    if (pax >= 1 && pax <= 3) {
                        $('#precio').val(Moneda(parseFloat(valors[0].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 4 && pax <= 7) {
                        $('#precio').val(Moneda(parseFloat(valors[1].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 8 && pax <= 11) {
                        $('#precio').val(Moneda(parseFloat(valors[2].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 12 && pax <= 15) {
                        $('#precio').val(Moneda(parseFloat(valors[3].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 16 && pax <= 20) {
                        $('#precio').val(Moneda(parseFloat(valors[4].replace(/(?!\w|\s).| /g, ""))));
                    } else if (pax >= 21 && pax <= 23) {
                        $('#precio').val(Moneda(parseFloat(valors[5].replace(/(?!\w|\s).| /g, ""))));
                    };

                } else if (p === '#reserva') {
                    $(p).val($(this).text());
                    $('#cliente').val($(this).attr('id').replace(/r/g, ""));
                } else {
                    $(p).val($(this).text());
                }
            },
            mouseenter: function() {
                $(this).css("background-color", "#FFFFCC");
                //$(this).css("background-color", "lightgray");
            },
            mouseleave: function() {
                $(this).css("background-color", "transparent");
            }
        });
        //enviar informacion de la reserva
        function EnviarInformacion(accion, objEvento, modal) {
            $.ajax({
                url: '/links/' + accion,
                type: 'POST',
                //dataType: 'json',
                data: objEvento,
                success: function(data) {
                    if (data === true) {
                        $('#fullcalendar').fullCalendar('refetchEvents')
                        if (!modal) {
                            $('#ModalEventos').modal('toggle')
                        }
                        if (accion === 'delete') {
                            SMSj('success', 'La reserva se elimino correctamente...');
                        } else if (accion === 'edit') {
                            SMSj('success', 'La reserva fue editada correctamente...');
                        } else if (accion === 'add') {
                            SMSj('success', 'La reserva fue ingresada de manera exitosa...');
                        }
                    } else {
                        SMSj('error', data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
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
            })
        }
        //mensajes
        /*function SMSj(tipo, mensaje) {
            var message = mensaje;
            var title = "Tq Travel";
            var type = tipo;
            toastr[type](message, title, {
                positionClass: "toast-top-right",
                closeButton: true,
                progressBar: true,
                newestOnTop: true,
                rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
                timeOut: 7500
            });
        };*/
        //Single Date Picker
        $('#fecha').daterangepicker({
            locale: {
                'format': 'YYYY-MM-DD hh:mm A',
                'separator': ' a ',
                'applyLabel': 'Aplicar',
                'cancelLabel': 'Cancelar',
                'fromLabel': 'De',
                'toLabel': 'A',
                'customRangeLabel': 'Personalizado',
                'weekLabel': 'S',
                'daysOfWeek': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                'monthNames': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                'firstDay': 1
            },
            timePicker: true,
            timePickerIncrement: 15,
            timePicker24Hour: true,
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 2018,
            maxYear: 2025,
            startDate: "",
            showDropdowns: false
        }, function(start, end, label) {
            fech = $('#fecha').html()
            $(".hora").html(start.format('hh:mm A'));
            $("#fecha").html(start.format('YYYY-MM-DD HH:mm'));
        });

        //Recojer los datos del Modal
        function RecolectarDatosGUI() {
            NuevoEvento = {
                id: $('#idreserv').val(),
                title: $("#reserva").val(),
                cliente: $("#cliente").val(),
                pasajeros: $('#pasajero spam.eli').text(),
                start: $('#fecha').html(),
                docgrupo: '',
                grupo: '',
                adicionales: '',
                guia: '',
                ruta: $("#ruta").val(),
                partida: $('#origen').val(),
                destino: $('#destino').val(),
                observaciones: $('#descripcion').val(),
                usuario: $('#user').val(),
                creador: $('.user').html(),
                valor: $('#precio').val().replace(/(?!\w|\s).| /g, ""),
                vuelo: $('#vuelo').val(),
                idavuelta: $('#yvuelta').val(),
                pax: $('#npasajeros').val(),
            }
        };
    });
    $(document).ready(function() {
        var dateTime = moment('2016-06-30');
        var fullTime = dateTime.format('LLLL');

        var Template = [`<div class="popover" role="tooltip">
                          <div class="arrow"></div>
                          <h3 class="popover-header"></h3>
                          <div class="popover-body"></div>
                        </div>`].join('');

        function etiqueta() {
            $('#titu').append(`<button type="button" id="popovercerrar" class="close btn btn-light" >
                    <svg width="20" height="20" viewBox="0 0 24 24" focusable="false" class=" NMm5M">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                    </svg>
                    <!--<span aria-hidden="true">&times;</span>-->
                </button>`);
        }
        /* inicializar el calendario
         -----------------------------------------------------------------*/
        //Fecha de los eventos del calendario (datos ficticios)
        var date = new Date()
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear()
        $('#fullcalendar').fullCalendar({
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            header: {
                left: 'prev,next today, Miboton, Reporte',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            buttonText: {
                today: 'Hoy',
                month: 'mes',
                week: 'semana',
                day: 'dia',
                listMonth: 'lista'
            },
            //weekNumbers: true,               
            eventLimit: true,
            //editable: true,
            events: `${window.location.origin}/links/reservas`,
            eventRender: function(event, element) {
                var FechaIni = event.start._i.split(" "),
                    mayusmin = titleCase(event.title);
                var content = [
                    `<div >${FechaIni[0]} - ${FechaIni[1]}</div>`,
                    `<div >Origen : ${titleCase(event.partida)}</div>`,
                    `<div >Destino : ${titleCase(event.destino)}</div>`,
                ].join('');

                var titulo = [`<div id="titu"><i><h3>${mayusmin}</h3></i></div>`, ].join('');
                element.popover({
                    animation: true,
                    delay: 700,
                    placement: "auto",
                    trigger: 'hover',
                    title: titulo,
                    content: content,
                    template: Template,
                    html: true
                });
                /*element.on('inserted.bs.popover', function() {
                    etiqueta()
                    $('#titu').append(`<i><h3>${mayusmin}</h3></i>`)
                    $('#popovercerrar').click(function() {
                        element.popover('hide')
                    });
                })*/
            },
            customButtons: {
                Miboton: {
                    text: "Reservar",
                    click: function() {
                        $('#fechas').show();
                        $("#ModalEventos").modal();
                    }
                },
                Reporte: {
                    text: "Reportes",
                    click: function() {
                        var url = "reportes";
                        $(location).attr('href', url);
                    }
                }
            }, //Boton de reservar 

            dayClick: function(date, jsEvent, view) {
                $('#fecha').data('daterangepicker').setStartDate(date.format('YYYY-MM-DD 08:00'));
                $("#ModalEventos").modal();
                $('.id').val('');
                $('#fecha').html(date.format('YYYY-MM-DD 08:00'));
                $('.hora').html(date.format('hh:mm A'));
                $('.editar').show();
                $('.sineditar').hide();
                $('#eliminar').hide();
            }, //Cuando se da click en un espacio vacio de un dia del calendario

            eventClick: function(calEvent, jsEvent, view) {
                $('#fecha').data('daterangepicker').setStartDate(calEvent.start.format('YYYY-MM-DD HH:mm'));
                $('#eliminar').show();
                $('#idreserv').val(calEvent.id);
                $(".reserva").html(calEvent.title);
                $("#reserva").val(calEvent.title);
                $("#cliente").val(calEvent.cliente)
                $("#ruta").val(calEvent.ruta)
                $('.fech').html(calEvent.start.format('LLLL'));
                $('#fecha').html(calEvent.start.format('YYYY-MM-DD'));
                $('.hora').html(calEvent.start.format('hh:mm A'));
                $('.ruta').html(`${calEvent.partida} Hacia ${calEvent.destino}`);
                $('#origen').val(titleCase(calEvent.partida));
                $('.origene').html(calEvent.partida);
                $('#destino').val(calEvent.destino);
                $('.destinoe').html(calEvent.destino);
                $('.observacion').html(calEvent.observaciones);
                $('#descripcion').val(calEvent.observaciones);
                $('.usuario').html(calEvent.fullname);
                $('#vuelo').val(calEvent.vuelo);
                $('.vuelo').html(calEvent.vuelo);
                $('#precio').val(Moneda(parseFloat(calEvent.valor.replace(/(?!\w|\s).| /g, ""))));
                $('.precio').html(Moneda(parseFloat(calEvent.valor.replace(/(?!\w|\s).| /g, ""))));
                $('#npasajeros').val(calEvent.pax);
                $('.npasajeros').html(calEvent.pax);
                $('#yvuelta').val(calEvent.idavuelta);
                pasajeros = calEvent.pasajeros.split(",");
                a = 0;
                while (pasajeros[a]) {
                    if (pasajeros[a]) {
                        $('.pasajeros').show();
                        $('.pasajero').append(`<a class="ele ${pasajeros[a]}"><spam class="badge badge-primary mr-1 eli">${pasajeros[a]},</spam></a>`);
                    }
                    a++;
                };
                $("#ModalEventos").modal();
            }, //Recoje los datos de la base de datos
            editable: true,
            eventDrop: function(calEvent) {
                    $('#eliminar').show();
                    $('#idreserv').val(calEvent.id);
                    $(".reserva").html(calEvent.title);
                    $("#reserva").val(calEvent.title);
                    $("#cliente").val(calEvent.cliente)
                    $("#ruta").val(calEvent.ruta)
                    $('.fech').html(calEvent.start.format('LLLL'));
                    $('#fecha').html(calEvent.start.format('YYYY-MM-DD'));
                    $('.hora').html(calEvent.start.format('hh:mm A'));
                    $('.ruta').html(`${calEvent.partida} Hacia ${calEvent.destino}`);
                    $('#origen').val(titleCase(calEvent.partida));
                    $('.origene').html(calEvent.partida);
                    $('#destino').val(calEvent.destino);
                    $('.destinoe').html(calEvent.destino);
                    $('.observacion').html(calEvent.observaciones);
                    $('#descripcion').val(calEvent.observaciones);
                    $('.usuario').html(calEvent.fullname);
                    $('#vuelo').val(calEvent.vuelo);
                    $('.vuelo').html(calEvent.vuelo);
                    $('#precio').val(Moneda(parseFloat(calEvent.valor.replace(/(?!\w|\s).| /g, ""))));
                    $('.precio').html(Moneda(parseFloat(calEvent.valor.replace(/(?!\w|\s).| /g, ""))));
                    $('#npasajeros').val(calEvent.pax);
                    $('.npasajeros').html(calEvent.pax);
                    $('#yvuelta').val(calEvent.idavuelta);
                    pasajeros = calEvent.pasajeros.split(",");
                    a = 0;
                    while (pasajeros[a]) {
                        if (pasajeros[a]) {
                            $('.pasajeros').show('slow');
                            $('.pasajero').append(`<a class="ele ${pasajeros[a]}"><spam class="badge badge-primary mr-1 eli">${pasajeros[a]},</spam></a>`);
                        }
                        a++;
                    };
                    RecolectarDatosGUI();
                    EnviarInformacion('modificar', NuevoEvento, true);
                } //Para arrastrar las reservas en el tablero
        })
        $('#ModalEventos').on('hidden.bs.modal', function() {
            $('#idreserv').val('');
            $('#ruta').val('');
            $('#cliente').val('');
            $("spam.reserva").html('');
            $("#reserva").val('');
            $('.fech').html('');
            $('.hora').html('');
            $('.ruta').html('');
            $('#origen').val('');
            $('.origene').html('');
            $('#destino').val('');
            $('.destinoe').html('');
            $('.observacion').html('');
            $('#descripcion').val('');
            $('.usuario').html('');
            $('#vuelo').val('');
            $('.vuelo').html('');
            $('#precio').val('');
            $('.precio').html('');
            $('#npasajeros').val('');
            $('.npasajeros').html('');
            $('#yvuelta').val('')
            $('.pasajero').empty();
            $('.pasajeros').hide();
            $('.editar').hide();
            $('.sineditar').show();
        });

    });
    //Leva a mayúsculas la primera letra de cada palabra
    function titleCase(texto) {
        const re = /(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?:([a-záéíóúüñ])|([A-ZÁÉÍÓÚÜÑ]))|([A-ZÁÉÍÓÚÜÑ]+)/gu;
        return texto.replace(re,
            (m, caracterPrevio, minuscInicial, mayuscInicial, mayuscIntermedias) => {
                const locale = ['es', 'gl', 'ca', 'pt', 'en'];
                //Son letras mayúsculas en el medio de la palabra
                // => llevar a minúsculas.
                if (mayuscIntermedias)
                    return mayuscIntermedias.toLocaleLowerCase(locale);
                //Es la letra inicial de la palabra
                // => dejar el caracter previo como está.
                // => si la primera letra es minúscula, capitalizar
                //    sino, dejar como está.
                return caracterPrevio +
                    (minuscInicial ? minuscInicial.toLocaleUpperCase(locale) : mayuscInicial);
            }
        );
    }
}
if (window.location == "http://localhost:3000/links/reportes" || window.location == "https://tqtravel.herokuapp.com/links/reportes") {
    minDateFilter = "";
    maxDateFilter = "";
    $.fn.dataTableExt.afnFiltering.push(
        function(oSettings, aData, iDataIndex) {
            if (typeof aData._date == 'undefined') {
                aData._date = new Date(aData[3]).getTime();
            }
            if (minDateFilter && !isNaN(minDateFilter)) {
                if (aData._date < minDateFilter) {
                    return false;
                }
            }
            if (maxDateFilter && !isNaN(maxDateFilter)) {
                if (aData._date > maxDateFilter) {
                    return false;
                }
            }
            return true;
        }
    );
    $(document).ready(function() {
        $("#Date_search").html("");
        $('a.toggle-vis').on('click', function(e) {
            e.preventDefault();
            // Get the column API object
            var column = table.column($(this).attr('data-column'));
            // Toggle the visibility
            column.visible(!column.visible());
        });
    });

    var table = $('#datatable').DataTable({
        dom: 'Bfrtip',
        buttons: ['pageLength',
            {
                text: `Ocultar
                <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 33px, 0px);">
                    <a class="toggle-vis dropdown-item" data-column="0">Id</a>
                    <a class="toggle-vis dropdown-item" data-column="1">Nombre</a>
                    <a class="toggle-vis dropdown-item" data-column="2">Cliente</a>
                    <a class="toggle-vis dropdown-item" data-column="4">Guia</a>
                    <a class="toggle-vis dropdown-item" data-column="5">Adicionales</a>
                    <a class="toggle-vis dropdown-item" data-column="7">Rutas</a>
                    <a class="toggle-vis dropdown-item" data-column="10">Usuario</a>
                    <a class="toggle-vis dropdown-item" data-column="11">Vuelo</a>
                    <a class="toggle-vis dropdown-item" data-column="12">Ida y vuelta</a>
                    <a class="toggle-vis dropdown-item" data-column="13">Grupo</a>
                    <a class="toggle-vis dropdown-item" data-column="14">Document</a>
                    <a class="toggle-vis dropdown-item" data-column="16">Pasajeros</a>
                    <a class="toggle-vis dropdown-item" data-column="17">Valor</a>
                    <a class="toggle-vis dropdown-item" data-column="18">Creador</a>
                    <a class="toggle-vis dropdown-item" data-column="19">Factura</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Enlace separado</a>
                </div> `,
                attr: {
                    'data-toggle': 'dropdown',
                    'aria-haspopup': true,
                    'aria-expanded': false,
                    'text': 'ocultar'
                },
                className: 'btn dropdown-toggle'
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: `<div class="mb-0">
                            <i class="align-middle mr-2" data-feather="calendar"></i> <span class="align-middle">Fecha</span>
                       </div>`,
                attr: {
                    title: 'Fecha',
                    id: 'Date'
                },
                className: 'btn btn-secondary fech'
            }
        ],
        deferRender: true,
        autoWidth: true,
        paging: true,
        search: {
            regex: true,
            caseInsensitive: false,
        },
        responsive: true,
        language: {
            "lengthMenu": "Mostrar 10 filas",
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar : ",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        ajax: {
            method: "POST",
            url: "/links/report",
            dataSrc: "data"
        },
        columns: [
            { data: "id" },
            { data: "title" },
            { data: "pax" },
            {
                data: "start",
                render: function(data, method, row) {
                    return moment(data).format('YYYY-MM-DD HH:mm') //pone la fecha en un formato entendible
                }
            },
            { data: "partida" },
            { data: "destino" },
            { data: "vuelo" },
            { data: "idavuelta" },
            { data: "grupo" },
            { data: "observaciones" },
            { data: "pasajeros" },
            {
                data: "valor",
                render: function(data, method, row) {
                    return Moneda(parseFloat(data.replace(/(?!\w|\s).| /g, ""))) //replaza cualquier caracter y espacio solo deja letras y numeros
                }
            },
            { data: "creador" },
            { data: "factura" }
        ]
    }); //table.buttons().container().appendTo("#datatable_wrapper .col-sm-12 .col-md-6");

    // Daterangepicker 
    /*var start = moment().subtract(29, "days").startOf("hour");
    var end = moment().startOf("hour").add(32, "hour");*/
    $(".fech").daterangepicker({
        locale: {
            'format': 'YYYY-MM-DD HH:mm',
            'separator': ' a ',
            'applyLabel': 'Aplicar',
            'cancelLabel': 'Cancelar',
            'fromLabel': 'De',
            'toLabel': 'A',
            'customRangeLabel': 'Personalizado',
            'weekLabel': 'S',
            'daysOfWeek': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            'monthNames': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            'firstDay': 1
        },
        opens: "center",
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        opens: "right",
        alwaysShowCalendars: false,
        //autoApply: false,
        startDate: moment().subtract(29, "days"),
        endDate: moment(),
        ranges: {
            'Ayer': [moment().subtract(1, 'days').startOf("days"), moment().subtract(1, 'days').endOf("days")],
            'Ultimos 7 Días': [moment().subtract(6, 'days'), moment().endOf("days")],
            'Ultimos 30 Días': [moment().subtract(29, 'days'), moment().endOf("days")],
            'Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Este Mes': [moment().startOf('month'), moment().endOf('month')],
            'Hoy': [moment().startOf('days'), moment().endOf("days")],
            'Mañana': [moment().add(1, 'days').startOf('days'), moment().add(1, 'days').endOf('days')],
            'Proximos 30 Días': [moment().startOf('days'), moment().add(29, 'days').endOf("days")],
            'Próximo Mes': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {
        maxDateFilter = end;
        minDateFilter = start;
        table.draw();
        $("#Date_search").val(start.format('YYYY-MM-DD') + ' a ' + end.format('YYYY-MM-DD'));
    });
}
if (window.location == "http://localhost:3000/links/facturas" || window.location == "https://tqtravel.herokuapp.com/links/facturas") {
    let recargada = true,
        total = 0,
        cliente = "";
    minDateFilter = "";
    maxDateFilter = "";
    $.fn.dataTableExt.afnFiltering.push(
        function(oSettings, aData, iDataIndex) {
            if (typeof aData._date == 'undefined') {
                aData._date = new Date(aData[5]).getTime();
            }
            if (minDateFilter && !isNaN(minDateFilter)) {
                if (aData._date < minDateFilter) {
                    return false;
                }
            }
            if (maxDateFilter && !isNaN(maxDateFilter)) {
                if (aData._date > maxDateFilter) {
                    return false;
                }
            }
            return true;
        }
    );
    $(document).ready(function() {
        $('a.atras').on('click', function() {
            $("#cuadro2").hide("slow");
            $("#cuadro1").show("slow");
        })
    });

    function Dtas() {
        var table = $('#datatable').DataTable({
            dom: 'Bfrtip',
            buttons: ['pageLength',
                {
                    text: `<div class="mb-0">
                            <i class="align-middle mr-2" data-feather="calendar"></i> <span class="align-middle">Fecha</span>
                       </div>`,
                    attr: {
                        title: 'Fecha',
                        id: 'Date'
                    },
                    className: 'btn btn-secondary fech',
                },
                {
                    text: `<div class="mb-0">
                                <i class="align-middle mr-2" data-feather="file-text"></i> <span class="align-middle">Generar Factura</span>
                           </div>`,
                    attr: {
                        title: 'FacturaG',
                        id: 'factu'
                    },
                    className: 'btn btn-secondary',
                    action: function() {
                        if ($('#facturas span').text().length) {
                            let datosfactura = {
                                cliente,
                                nreservas: $('.facturas').text(),
                                reservas: $('#facturas').text().trim().replace(/(?!\w|\s).|  /g, "-"),
                                total: $('.total').text().replace(/(?!\w|\s).| /g, ""),
                                estado: 'pendiente'
                            };

                            $.ajax({
                                type: "POST",
                                url: '/links/generarafactura',
                                data: datosfactura,
                                success: function(data) {
                                    table.rows('.selected').remove().draw(false);
                                    total = 0;
                                    $('#facturas span').remove();
                                    $('span.total').text('');
                                    $('p.clientes').text('');
                                    $('.facturas').html('0');
                                    SMSj('success', 'Factura generada exitosamente')
                                    table2.ajax.reload(function(json) {
                                        $("#cuadro2").hide("slow");
                                        $("#cuadro1").show("slow");
                                    });
                                }
                            })
                        } else {
                            SMSj('warning', 'Debebe seleccionar las reservas a facturar antes de generar la factura')
                        }
                    }
                }
            ],
            deferRender: true,
            /*autoWidth: false,*/
            paging: true,
            search: {
                regex: true,
                caseInsensitive: false,
            },
            responsive: {
                details: {
                    type: 'column'
                }
            },
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets: 0
            }],
            order: [1, 'asc'],
            language: {
                "lengthMenu": "Mostrar 10 filas",
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar : ",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            ajax: {
                method: "POST",
                url: "/links/report",
                dataSrc: "data"
            },
            columns: [{
                    defaultContent: ``
                },
                { data: "id" },
                { data: "title" },
                { data: "cliente" },
                { data: "pax" },
                {
                    data: "start",
                    render: function(data, method, row) {
                        return moment(data).format('YYYY-MM-DD HH:mm') //pone la fecha en un formato entendible
                    }
                },
                { data: "partida" },
                { data: "destino" },
                { data: "vuelo" },
                { data: "idavuelta" },
                { data: "observaciones" },
                { data: "pasajeros" },
                {
                    data: "valor",
                    render: function(data, method, row) {
                        return Moneda(parseFloat(data.replace(/(?!\w|\s).| /g, ""))) //replaza cualquier caracter y espacio solo deja letras y numeros
                    }
                },
                { data: "creador" }
            ]
        });

        // Daterangepicker  
        var start = moment().subtract(29, "days").startOf("hour");
        var end = moment().startOf("hour").add(32, "hour");
        $(".fech").daterangepicker({
            locale: {
                'format': 'YYYY-MM-DD HH:mm',
                'separator': ' a ',
                'applyLabel': 'Aplicar',
                'cancelLabel': 'Cancelar',
                'fromLabel': 'De',
                'toLabel': 'A',
                'customRangeLabel': 'Personalizado',
                'weekLabel': 'S',
                'daysOfWeek': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                'monthNames': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                'firstDay': 1
            },
            opens: "center",
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 15,
            opens: "right",
            alwaysShowCalendars: false,
            startDate: start,
            endDate: end,
            ranges: {
                'Ayer': [moment().subtract(1, 'days').startOf("days"), moment().subtract(1, 'days').endOf("days")],
                'Ultimos 7 Días': [moment().subtract(6, 'days'), moment().endOf("days")],
                'Ultimos 30 Días': [moment().subtract(29, 'days'), moment().endOf("days")],
                'Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Este Mes': [moment().startOf('month'), moment().endOf('month')],
                'Hoy': [moment().startOf('days'), moment().endOf("days")],
                'Mañana': [moment().add(1, 'days').startOf('days'), moment().add(1, 'days').endOf('days')],
                'Proximos 30 Días': [moment().startOf('days'), moment().add(29, 'days').endOf("days")],
                'Próximo Mes': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
            }
        }, function(start, end, label) {
            maxDateFilter = end;
            minDateFilter = start;
            table.draw();
        });
    }

    $('#datatable').on('click', 'tr', function() {
        var data = $('#datatable').DataTable().row(this).data();
        if (cliente === "" || cliente === data.title || $('span.facturas').text() === "0") {
            if (cliente !== data.title) {
                $('p.clientes').text(`Facturacion realizada a ${data.title}`);
            }
            cliente = data.title;
            $(this).toggleClass('selected');
            var facturas = $('#datatable').DataTable().rows('.selected').data().length,
                factura = ` <span class="badge badge-success ${data.id}"> ${data.id}</span>`;
            $('.facturas').html(facturas);
            if ($(`span.${data.id}`).length) {
                $("span").remove(`.${data.id}`);
                total -= parseFloat(data.valor.replace(/(?!\w|\s).| /g, ""));
            } else {
                $('#facturas').append(factura);
                total += parseFloat(data.valor.replace(/(?!\w|\s).| /g, ""));
            }
            $('span.total').mask('000,000,000', { reverse: true });
            $('span.total').text(Moneda(total));
        } else {
            SMSj('info', 'No puedes seleccionar una reserva que no pertenesca a este clliente ' + cliente)
        }
    });
    // Eliminar facturas
    $('#datatable2').on('click', '#eliminarFactura', function() {
        var fila = $(this).parents('tr');
        var data = $('#datatable2').DataTable().row(fila).data();
        var datos = { id: data.id, reservas: data.reservas };
        $('#ModalConfir').modal('toggle');
        $('#btnDeletf').on('click', function() {
            $.ajax({
                type: "POST",
                url: '/links/eliminarfactura',
                data: datos,
                success: function(data) {
                    fila.remove();
                    SMSj('success', 'Factura eliminada correctamente')
                }
            })
        })
    });
    // Ver facturas
    $('#datatable2').on('click', '#verFactura', function() {
        var fila = $(this).parents('tr');
        var data = $('#datatable2').DataTable().row(fila).data();
        var url = `/links/factura?id=${data.id}&fecha=${data.fecha}&cliente=${data.cliente}&nreservas=${data.nreservas}&reservas=${data.reservas}&total=${data.total}`;
        $(location).attr('href', url);
    });
    var table2 = $('#datatable2').DataTable({
        dom: 'Bfrtip',
        buttons: ['pageLength',
            {
                text: `<div class="mb-0">
                            <i class="align-middle mr-2" data-feather="file-text"></i> <span class="align-middle">Facturar</span>
                       </div>`,
                attr: {
                    title: 'Fecha',
                    id: 'facturar'
                },
                className: 'btn btn-secondary',
                action: function() {
                    $("#cuadro2").show("slow");
                    $("#cuadro1").hide("slow");
                    if (recargada) {
                        recargada = false;
                        Dtas()
                    }
                }
            }
        ],
        deferRender: true,
        autoWidth: false,
        paging: true,
        search: {
            regex: true,
            caseInsensitive: false,
        },
        responsive: true,
        language: {
            "lengthMenu": "Mostrar 10 filas",
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar : ",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        ajax: {
            method: "POST",
            url: "/links/fact",
            dataSrc: "data"
        },
        columns: [
            { data: "id" },
            {
                data: "fecha",
                render: function(data, method, row) {
                    return moment(data).format('YYYY-MM-DD HH:mm') //pone la fecha en un formato entendible
                }
            },
            { data: "cliente" },
            { data: "nreservas" },
            { data: "reservas" },
            {
                data: "total",
                render: function(data, method, row) {
                    return Moneda(parseFloat(data.replace(/(?!\w|\s).| /g, ""))) //replaza cualquier caracter y espacio solo deja letras y numeros
                }
            },
            { data: "estado" },
            {
                defaultContent: `<a id="verFactura" class="ver"><i class="align-middle mr-1 far fa-fw fa-eye"></i></a>
                            <a id="editarFactura" class="edit"><i class="align-middle mr-1 far fa-fw fa-edit"></i></a>
                            <a id="eliminarFactura" class="elim"><i class="align-middle mr-1 far fa-fw fa-trash-alt"></i></a>`
            }
        ]
    });
}
if (window.location.pathname == `/links/orden`) {
    //moment.locale('es');
    $("#qrImg").attr("src", $('#imgQr').val());
    $(document).ready(function() {
        $('#fechaOrden').text(moment($('#fechaOrden').text()).format('lll'))
        if ($('#observa p').html() !== '') {
            $('#observa').show()
        }
        if ($('#paxOrden').val() !== '') {
            $('.card-body.pasajeros').show()
            let pax = "";
            const paxs = $('#paxOrden').val().split(",");

            paxs.forEach(function(item, index) {
                cs = item.split("-")
                if (cs[0] !== undefined && cs[1] !== undefined) {
                    pax += `<tr>
                                <th>${cs[0]}</th>
                                <th>${cs[1]}</th>
                            </tr>`
                }
            });
            $('#tablePax tbody').append(pax);
        }
        $('.footer').hide()
        window.print();
    })
}
if (window.location.pathname == `/links/ordendeservicio`) {
    let p = '';

    function RecogerDatos() {
        dts = {
            id: '',
            reserva: $('#idTitle').val(),
            conductor: $('#idChofer').val(),
            vehiculo: $('#idCar').val()
        };
    };
    $(".edi").on({
        focus: function() {
            $(this).css("background-color", "#FFFFCC");
            $(this).next('div.reditarh').show("slow");
            this.select();
        },
        blur: function() {
            $(this).css({
                "background-color": "transparent"
            });
            $('.reditarh').hide("slow");
            $('.item').hide("slow");
        },
        change: function() {
            $(this).val($(this).val().toLowerCase().trim().split(' ').map(v => v[0].toUpperCase() + v.substr(1)).join(' '))
        }
    });

    $('.edi').keyup(function() {
        p = $(this).attr("id")
        if ($(this).val() != "") {
            var nombres = $('.nombres');
            var buscando = $(this).val().toLowerCase();
            var item = '',
                f, clas, valu;
            f = `.item.${p.replace(/ /g, ".")}`;
            for (var i = 0; i < nombres.length; i++) {
                item = $(nombres[i]).html().toLowerCase();
                for (var x = 0; x < item.length; x++) {
                    if (buscando.length == 0 || item.indexOf(buscando) > -1) {
                        $(nombres[i]).parents(f).show("slow");
                    } else {
                        $(nombres[i]).parents(f).hide("slow");
                    }
                }
            }
            //ocultar todos las rutas de origen con el mismo valor
            $(`div.item.${p.replace(/ /g, ".")}`).each(function(index, elemento) {
                clas = '.' + $(elemento).attr("class").replace(/ /g, ".");
                valu = $(elemento).text()
                $(clas).filter(function() {
                    return this.textContent === valu;
                }).slice(0, -1).detach();
            });
            p = '#' + p
        } else {
            $('.item').hide("slow");
        }
    });

    $(".nombres").on({
        mousedown: function() {
            $(p).focus();
            $(p).val($(this).text());
            $(p).next().val($(this).attr('id'));
            if ($(this).parents('div.vehiculos').attr('id') !== '') { //' input[type="hidden"]' $("li.start").next()
                $("#car").attr("src", $(this).parents('div.vehiculos').attr('id'));
            }
        },
        mouseup: function() {

        },
        mouseenter: function() {
            $(this).css("background-color", "#FFFFCC");
        },
        mouseleave: function() {
            $(this).css("background-color", "transparent");
        }
    });
    minDateFilter = "";
    maxDateFilter = "";
    $.fn.dataTableExt.afnFiltering.push(
        function(oSettings, aData, iDataIndex) {
            if (typeof aData._date == 'undefined') {
                aData._date = new Date(aData[1]).getTime();
            }
            if (minDateFilter && !isNaN(minDateFilter)) {
                if (aData._date < minDateFilter) {
                    return false;
                }
            }
            if (maxDateFilter && !isNaN(maxDateFilter)) {
                if (aData._date > maxDateFilter) {
                    return false;
                }
            }
            return true;
        }
    );
    $('#editarOrden').on('click', function() {
        console.log('dhfd');
        $("#ModalOrden input").prop('disabled', false);
    });
    $('#datatable2').on('click', '.te', function() {
        var fila = $(this).parents('tr');
        if ($(fila).hasClass('selected')) {
            $(fila).removeClass('selected');
        } else {
            $('#datatable2').DataTable().$('tr.selected').removeClass('selected');
            $(fila).addClass('selected');
        }
        var data = $('#datatable2').DataTable().row(fila).data();
        var seleccion = $('#datatable2').DataTable().rows('.selected').data();
        $('#title').val(data.title);
        $('#idTitle').val(data.idreserva);
        $('#conductores').val(data.fullname);
        $('#idChofer').val(data.idchofer);
        $('#vehiculos').val(data.placa);
        $('#idCar').val(data.idcar);
        $("#car").attr("src", data.img);
        $("#ModalOrden input").prop('disabled', true);
        $('#ModalOrden').modal('toggle');
    });
    $('#ModalOrden').on('hidden.bs.modal', function() {
        $('#datatable2 tr.selected').toggleClass('selected');
        $("#ModalOrden input").val('');
        $("#car").attr("src", '/img/car.jpg');
    });

    // Guardar o Actualizar Orden
    $('#guardarOrden').on('click', function() {
        var seleccion = $('#datatable2').DataTable().row('.selected').data(),
            tipo = '';
        RecogerDatos()
        if (seleccion !== undefined) {
            dts.id = seleccion.id;
            tipo = 'PUT';
        } else {
            tipo = 'POST';
        }
        console.log(tipo)
        $.ajax({
            type: tipo,
            url: '/links/orden',
            data: dts,
            success: function(data) {
                tableOrden.ajax.reload(function(json) {
                    $('#ModalOrden').modal('toggle');
                    SMSj('success', 'Factura eliminada correctamente')
                });
            }
        })
    });
    if ($('#idTitle').val() !== '') {
        $('#ModalOrden').modal('toggle');
    }
    //Eliminar Orden
    $('#eliminarOrden').on('click', function() {
        var seleccion = $('#datatable2').DataTable().row('.selected').data();
        RecogerDatos()
        if (seleccion !== undefined) {
            dts.id = seleccion.id;
            $.ajax({
                type: 'DELETE',
                url: '/links/orden',
                data: dts,
                success: function(data) {
                    tableOrden.row('.selected').remove().draw(false);
                    $('#ModalOrden').modal('toggle');
                    SMSj('success', 'Factura eliminada correctamente')
                }
            })
        } else {
            SMSj('error', 'No es posible eliminar esta orden');
        }
    });
    // Ver Orden de servicio
    $('#mostrarOrden').on('click', function() {
        var data = $('#datatable2').DataTable().row('.selected').data();
        var url = `/links/orden?id=${data.id}`;
        $(location).attr('href', url);
    });
    var tableOrden = $('#datatable2').DataTable({
        dom: 'Bfrtip',
        buttons: ['pageLength',
            {
                text: `<div class="mb-0">
                    <i class="align-middle mr-2" data-feather="calendar"></i> <span class="align-middle">Fecha</span>
               </div>`,
                attr: {
                    title: 'Fecha',
                    id: 'Date'
                },
                className: 'btn btn-secondary fech',
            }
        ],
        deferRender: true,
        paging: true,
        search: {
            regex: true,
            caseInsensitive: false,
        },
        responsive: {
            details: {
                type: 'column'
            }
        },
        columnDefs: [{
            className: 'control',
            orderable: true,
            targets: 0
        }],
        order: [1, 'asc'],
        language: {
            "lengthMenu": "Mostrar 10 filas",
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar : ",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        ajax: {
            method: "GET",
            url: "/links/orden",
            dataSrc: "data"
        },
        columns: [
            { data: "id" },
            {
                data: "start",
                className: 'te',
                render: function(data, method, row) {
                    return moment(data).format('YYYY-MM-DD HH:mm') //pone la fecha en un formato entendible
                }
            },
            {
                data: "fullname",
                className: 'te'
            },
            {
                data: "title",
                className: 'te'
            },
            {
                data: "placa",
                className: 'te'
            },
            {
                data: "pax",
                className: 'te'
            },
            {
                data: "partida",
                className: 'te'
            },
            {
                data: "destino",
                className: 'te'
            }
        ]
    });
    // Daterangepicker  
    var start = moment().subtract(29, "days").startOf("hour");
    var end = moment().startOf("hour").add(32, "hour");
    $(".fech").daterangepicker({
        locale: {
            'format': 'YYYY-MM-DD HH:mm',
            'separator': ' a ',
            'applyLabel': 'Aplicar',
            'cancelLabel': 'Cancelar',
            'fromLabel': 'De',
            'toLabel': 'A',
            'customRangeLabel': 'Personalizado',
            'weekLabel': 'S',
            'daysOfWeek': ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            'monthNames': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            'firstDay': 1
        },
        opens: "center",
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15,
        opens: "right",
        alwaysShowCalendars: false,
        startDate: start,
        endDate: end,
        ranges: {
            'Ayer': [moment().subtract(1, 'days').startOf("days"), moment().subtract(1, 'days').endOf("days")],
            'Ultimos 7 Días': [moment().subtract(6, 'days'), moment().endOf("days")],
            'Ultimos 30 Días': [moment().subtract(29, 'days'), moment().endOf("days")],
            'Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Este Mes': [moment().startOf('month'), moment().endOf('month')],
            'Hoy': [moment().startOf('days'), moment().endOf("days")],
            'Mañana': [moment().add(1, 'days').startOf('days'), moment().add(1, 'days').endOf('days')],
            'Proximos 30 Días': [moment().startOf('days'), moment().add(29, 'days').endOf("days")],
            'Próximo Mes': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {
        maxDateFilter = end;
        minDateFilter = start;
        tableOrden.draw();
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#totalLetras').text(`POR CONCEPTO DE ${$('#nservicios').val()} SERVICIOS PRESTADOS CON UN VALOR ESPRESADO EN LETRAS DE ${NumeroALetras($('#vLetras').val())}`)
    var table2 = $('#tablaFactura').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        //deferRender: true,
        autoWidth: true,
        responsive: false,
        columnDefs: [{
                render: function(data, type, row) {
                    return `El día ${moment(row[3]).format('llll')}, ${row[2]} pasajeros fueron trasladados de ${row[4]} con destino a ${row[5]}`;
                },
                targets: 1
            },
            {
                render: function(data, type, row) {
                    return '$' + Moneda(parseFloat(data.replace(/(?!\w|\s).| /g, "")));
                },
                targets: 10
            },
            { visible: false, targets: [2, 3, 4, 5, 6, 7, 8, 9] }
        ]
    });
})

//}
if (window.location == "http://localhost:3000/tablero" || window.location == "https://tqtravel.herokuapp.com/tablero") {
    // Bar chart
    new Chart(document.getElementById("chartjs-dashboard-bar"), {
        type: "bar",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
                label: "Last year",
                backgroundColor: window.theme.primary,
                borderColor: window.theme.primary,
                hoverBackgroundColor: window.theme.primary,
                hoverBorderColor: window.theme.primary,
                data: [
                    $('#1').val(),
                    $('#2').val(),
                    $('#3').val(),
                    $('#4').val(),
                    $('#5').val(),
                    $('#6').val(),
                    $('#7').val(),
                    $('#8').val(),
                    $('#9').val(),
                    $('#10').val(),
                    $('#11').val(),
                    $('#12').val()
                ]
            }, {
                label: "This year",
                backgroundColor: "#E8EAED",
                borderColor: "#E8EAED",
                hoverBackgroundColor: "#E8EAED",
                hoverBorderColor: "#E8EAED",
                data: [
                    $('#m1').val(),
                    $('#m2').val(),
                    $('#m3').val(),
                    $('#m4').val(),
                    $('#m5').val(),
                    $('#m6').val(),
                    $('#m7').val(),
                    $('#m8').val(),
                    $('#m9').val(),
                    $('#m10').val(),
                    $('#m11').val(),
                    $('#m12').val()
                ]
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    stacked: false,
                    ticks: {
                        stepSize: 100
                    }
                }],
                xAxes: [{
                    barPercentage: .5,
                    categoryPercentage: .5,
                    stacked: false,
                    gridLines: {
                        color: "transparent"
                    }
                }]
            }
        }
    });

    $("#datetimepicker-dashboard").datetimepicker({
        inline: true,
        sideBySide: false,
        format: "L"
    });

    var ld = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Line chart
    var f = new Date(),
        pro = 0,
        sum = 0,
        prom = 0,
        promedio = 0;
    $(".datos").each(function() {
        if ($(this).attr('id') == undefined) {
            if ($(this).attr('class') == 'datos dos') {
                $('#ventames').html($(this).val());
            } else {
                $('#utilidad').html($(this).val());
            }
        } else {
            if ($(this).attr('id') <= f.getMonth()) {
                pro += 1;
                prom += parseFloat($(this).val());
                prom /= pro;
                promedio = Math.round(prom);
            } else if (parseFloat($(this).attr('id')) > (f.getMonth() + 1)) {
                sum += parseFloat($(this).val());
            }
        }
    });
    $('#rpendientes').html(sum);
    $('#ventaprecio').html($(`.${f.getMonth()+1}`).val());
    $('#promedio').html(promedio);
    $('#promedio').mask('000,000,000', { reverse: true });
    $('#utilidad').mask('000,000,000', { reverse: true });
    $('#ventaprecio').mask('000,000,000', { reverse: true });
    new Chart(document.getElementById("chartjs-line"), {
        type: "line",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
                label: "RESERVAS (#)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: window.theme.primary,
                data: [
                    $('.1').val(),
                    $('.2').val(),
                    $('.3').val(),
                    $('.4').val(),
                    $('.5').val(),
                    $('.6').val(),
                    $('.7').val(),
                    $('.8').val(),
                    $('.9').val(),
                    $('.10').val(),
                    $('.11').val(),
                    $('.12').val()
                ]
            }, {
                label: "PASAJEROS (#)",
                fill: true,
                backgroundColor: "transparent",
                borderColor: window.theme.tertiary,
                borderDash: [4, 4],
                data: [
                    $('#m1').val(),
                    $('#m2').val(),
                    $('#m3').val(),
                    $('#m4').val(),
                    $('#m5').val(),
                    $('#m6').val(),
                    $('#m7').val(),
                    $('#m8').val(),
                    $('#m9').val(),
                    $('#m10').val(),
                    $('#m11').val(),
                    $('#m12').val()
                ]
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 10000000
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }]
            }
        }
    });

    // Pie chart 
    new Chart(document.getElementById("chartjs-dashboard-pie"), {
        type: "pie",
        data: {
            labels: ["Direct", "Affiliate", "E-mail", "Other"],
            datasets: [{
                data: [2602, 1253, 541, 1465],
                backgroundColor: [
                    window.theme.primary,
                    window.theme.warning,
                    window.theme.danger,
                    "#E8EAED"
                ],
                borderColor: "transparent"
            }]
        },
        options: {
            responsive: !window.MSInputMethodContext,
            maintainAspectRatio: false,
            legend: {
                display: false
            }
        }
    });

    $("#datatables-dashboard-projects").DataTable({
        pageLength: 6,
        lengthChange: false,
        bFilter: false,
        autoWidth: false
    });
};

function Unidades(num) {

    switch (num) {
        case 1:
            return "UN";
        case 2:
            return "DOS";
        case 3:
            return "TRES";
        case 4:
            return "CUATRO";
        case 5:
            return "CINCO";
        case 6:
            return "SEIS";
        case 7:
            return "SIETE";
        case 8:
            return "OCHO";
        case 9:
            return "NUEVE";
    }

    return "";
}

function Decenas(num) {

    decena = Math.floor(num / 10);
    unidad = num - (decena * 10);

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0:
                    return "DIEZ";
                case 1:
                    return "ONCE";
                case 2:
                    return "DOCE";
                case 3:
                    return "TRECE";
                case 4:
                    return "CATORCE";
                case 5:
                    return "QUINCE";
                default:
                    return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0:
                    return "VEINTE";
                default:
                    return "VEINTI" + Unidades(unidad);
            }
        case 3:
            return DecenasY("TREINTA", unidad);
        case 4:
            return DecenasY("CUARENTA", unidad);
        case 5:
            return DecenasY("CINCUENTA", unidad);
        case 6:
            return DecenasY("SESENTA", unidad);
        case 7:
            return DecenasY("SETENTA", unidad);
        case 8:
            return DecenasY("OCHENTA", unidad);
        case 9:
            return DecenasY("NOVENTA", unidad);
        case 0:
            return Unidades(unidad);
    }
} //Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + " Y " + Unidades(numUnidades)

    return strSin;
} //DecenasY()

function Centenas(num) {

    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch (centenas) {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2:
            return "DOSCIENTOS " + Decenas(decenas);
        case 3:
            return "TRESCIENTOS " + Decenas(decenas);
        case 4:
            return "CUATROCIENTOS " + Decenas(decenas);
        case 5:
            return "QUINIENTOS " + Decenas(decenas);
        case 6:
            return "SEISCIENTOS " + Decenas(decenas);
        case 7:
            return "SETECIENTOS " + Decenas(decenas);
        case 8:
            return "OCHOCIENTOS " + Decenas(decenas);
        case 9:
            return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
} //Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
} //Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "MIL", "MIL");
    strCentenas = Centenas(resto);

    if (strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;

    //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
} //Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    strMiles = Miles(resto);

    if (strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;

    //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
} //Millones()

function NumeroALetras(num, centavos) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
    };
    if (centavos == undefined || centavos == false) {
        data.letrasMonedaPlural = "PESOS";
        data.letrasMonedaSingular = "PESO";
    } else {
        data.letrasMonedaPlural = "CENTAVOS";
        data.letrasMonedaSingular = "CENTAVO";
    }

    if (data.centavos > 0)
        data.letrasCentavos = "CON " + NumeroALetras(data.centavos, true);

    if (data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
} //NumeroALetras()