if (window.location == `${window.location.origin}/links/calendario`) {
    $(document).ready(function () {
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
        $('#agregarpax').on('click', function () {
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
        $('#pasajero').on('dblclick', 'a.ele', function () {
            let cont, clas = '.' + $(this).text().replace(/ /g, ".");
            $(clas.replace(/,/g, "")).remove();
            cont = $("a.ele").length;
            if (cont < 1) { $('.pasajeros').hide("slow") };
        })
        $('#editarreserva').click(function () {
            $('.editar').show("slow");
            $('.sineditar').hide("slow");
        })
        $('.cancelarpax').click(function () {
            $('.datospax').hide("slow");
            $('.docu').val('');
            $('.clu').val('');
            $('.nomb').val('');
            $('.dircc').val('');
        })
        $('#npasajeros').change(function () {
            let ide = '.' + $('#destino').val(),
                nuevoprecio = new Array();
            valors = $('input' + ide).val().split('-');
            if ($('#destino').val() !== "" && $('#yvuelta').val() === 'SI...') {
                $.each(valors, function (index, elemento) {
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
        $('#irOrden').on('click', function () {
            RecolectarDatosGUI();
            var url = `/links/ordendeservicio?id=${NuevoEvento.id}&title=${NuevoEvento.title}`;
            $(location).attr('href', url);
        });
        $('#rguardar').on('click', function () {
            let accion;
            if ($('#idreserv').val()) {
                accion = 'edit'
            } else {
                accion = 'add'
            }
            RecolectarDatosGUI();
            EnviarInformacion(accion, NuevoEvento);
        });
        $('#eliminar').on('click', function () {
            let eliminar = $('#idreserv').val();
            $('#ModalEventos').modal('toggle');
            $("#ModalConfir").modal();
            $('#btnDelet').click(function () {
                EnviarInformacion('delete', { id: eliminar }, true);
            });
        });
        $("a.reditar").hover(function () {
            $(this).next('div.reditarh').show();
            $(this).css("color", "#000000");
        },
            function () {
                $('.reditarh').hide("slow");
                $(this).css("color", "#bfbfbf");
            });

        $(".reditar").on({
            focus: function () {
                $(this).css("background-color", "#FFFFCC");
                $(this).next('div.reditarh').show("slow");
                this.select();
                if ($(this).attr("id") === 'yvuelta') {
                    p = '#' + $(this).attr("id");
                    $('.yvuelta').show("slow");
                }
            },
            blur: function () {
                $(this).css({
                    "background-color": "transparent"
                });
                $('.reditarh').hide("slow");
                $('.item').hide("slow");
                $('.yvuelta').hide("slow");
            },
            change: function () {
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
        $('.cerrarutas').click(function () {
            $('#destino').val('');
            $('#precio').val('');
            $('.editar').show("slow");
            $('.modal-header').show("slow");
            $('#ingresarutas').hide("slow");
            $('spam.titulorutas').text('')
            $('input.val').val('');
        })
        $('.cerrarClient').click(function () {
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
                success: function (data) {
                    //$('div.item.reserva').detach()
                    $.each(data, function (index, elemento) {
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
            $('input.val').each(function (index, elemento) {
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
                success: function (data) {
                    $.each(data, function (index, elemento) {
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
        $('.reditar').keyup(function () {
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
                $('#rutao div.item').each(function (index, elemento) {
                    clas = '.' + $(elemento).attr("class").replace(/ /g, ".");
                    valu = $(elemento).text()
                    $(clas).filter(function () {
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
            mousedown: function () {
                $(p).focus();
                nuevaruta = false;
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
            mouseup: function () {
                
            },
            mouseenter: function () {
                $(this).css("background-color", "#FFFFCC");
            },
            mouseleave: function () {
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
                success: function (data) {
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
                error: function (jqXHR, textStatus, errorThrown) {
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
        }, function (start, end, label) {
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
    $(document).ready(function () {
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

         /*inicializar el calendario
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
                left: 'month listMonth',
                center: 'title',
                right: 'today,prev,next'
                //right: 'month,agendaWeek,agendaDay,listMonth'
            },
            buttonText: {
                today: 'Hoy',
                month: 'mes',
                week: 'samana',
                day: 'dia',
                listMonth: 'lista'
            },
            //weekNumbers: true,               
            eventLimit: 4,
            //windowResize: function(view) {
              //  if (win.width() <= 300) {
                //    $('#fullcalendar').fullCalendar({eventLimit: 1});
                //}
                //alert(win.width());                
              //},
            //editable: true,
            events: `${window.location.origin}/links/reservas`,
            eventRender: function (event, element) {
                var mayusmin = titleCase(event.title);
                var content = [
                    `<div >${event.start.format('LLL')}</div>`,
                    `<div >Origen : ${titleCase(event.partida)}</div>`,
                    `<div >Destino : ${titleCase(event.destino)}</div>`,
                ].join('');

                var titulo = [`<div id="titu"><i><h3>${mayusmin}</h3></i></div>`,].join('');
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
                
            },
            

            dayClick: function (date, jsEvent, view) {
                $('#fecha').data('daterangepicker').setStartDate(date.format('YYYY-MM-DD 08:00'));
                $("#ModalEventos").modal();
                $('.id').val('');
                $('#fecha').html(date.format('YYYY-MM-DD 08:00'));
                $('.hora').html(date.format('hh:mm A'));
                $('.editar').show();
                $('.sineditar').hide();
                $('#eliminar').hide();
            }, //Cuando se da click en un espacio vacio de un dia del calendario

            eventClick: function (calEvent, jsEvent, view) {
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
            eventDrop: function (calEvent) {
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
        $('#ModalEventos').on('hidden.bs.modal', function () {
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