<script src="https://printjs-4de6.kxcdn.com/print.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://printjs-4de6.kxcdn.com/print.min.css">
<script>
//nsHooks.addAction( 'ns-cart-after-refreshed', 'folio-hook', ( fields ) => {
//});
const FOLIO_TYPE_RECIEPT = 1
const FOLIO_TYPE_BOLATA = 39
const FOLIO_TYPE_FACTURA = 33

nsHooks.addAction( 'ns-pos-payment-mounted', 'order-hook', ( order_value ) => {

    // Reciept
    const radio_reciept = document.createElement('input');
    radio_reciept.type = 'radio';
    radio_reciept.name = 'folio-type';
    radio_reciept.checked = 'checked';
    radio_reciept.value = FOLIO_TYPE_RECIEPT;

    const label_reciept = document.createElement('label');
    label_reciept.for = 'radio_reciept';
    label_reciept.textContent = 'Reciept';

    // Boleta
    const radio_bolata = document.createElement('input');
    radio_bolata.type = 'radio';
    radio_bolata.name = 'folio-type'
    radio_bolata.value = FOLIO_TYPE_BOLATA;

    const label_bolata = document.createElement('label');
    label_bolata.for = 'radio_reciept';
    label_bolata.textContent = 'Boleta';

    // Factura
    const radio_factura = document.createElement('input');
    radio_factura.type = 'radio';
    radio_factura.name = 'folio-type';
    radio_factura.value = FOLIO_TYPE_FACTURA;

    const label_factura = document.createElement('label');
    label_factura.for = 'radio_reciept';
    label_factura.textContent = 'Factura';

    //const text_factura = document.createElement('input');
    //text_factura.type = 'text';

    const div = document.createElement('div');
    div.className = 'flex ns-button info';

    div.appendChild(radio_reciept);
    div.appendChild(label_reciept);

    div.appendChild(radio_bolata);
    div.appendChild(label_bolata);

    div.appendChild(radio_factura);
    div.appendChild(label_factura);

    const div2 = document.createElement('div');
    const hash = (Math.random() + 1).toString(36).substring(7);

    /*
    folio_button_click = (type) => {
        order = POS.order.getValue();

        const button_reciept = document.getElementById('folio-receipt');
        const button_bolata = document.getElementById('folio-boleta');

        if(type=='receipt') {
            button_reciept.classList.add('error');
            button_reciept.classList.remove('info');
            button_bolata.classList.add('info');
            button_bolata.classList.remove('error');
        } else {
            button_reciept.classList.add('info');
            button_reciept.classList.remove('error');
            button_bolata.classList.remove('info');
            button_bolata.classList.add('error');
        }

        order.folio = {
            'hash': hash,
            'type': type,
        };
        console.log(order.folio);
    };

    div2.innerHTML = `
    <div class='flex justify-end'>
        <div class='flex ns-button'>
        <button onclick='folio_button_click("receipt")' id='folio-receipt' class='flex rounded error border items-center cursor-pointer py-2 px-3 font-semibold'>
            Reciept
        </button>
        <button onclick='folio_button_click("boleta")' id='folio-boleta' class='flex rounded border items-center cursor-pointer py-2 px-3 font-semibold'>
            Boleta
        </button>
        </div>
    </div>
    `
    div.appendChild(div2);
     */

    setTimeout(() => {
        document.querySelector('.ns-payment-footer').appendChild(div);
        fill_folio_info = () => {
            order = POS.order.getValue();
            type = document.querySelector('input[name="folio-type"]:checked').value;

            order.folio = {
                'hash': hash,
                'type': type,
                'cdg': '',
                'giro': '',
                'recv_giro': '',
                'recv_cdg': '',
            };
            // XXX Hard code for test
            if(type==FOLIO_TYPE_FACTURA) {
                order.folio.rut = '76239805-2';
                order.folio.cdg = '';
                order.folio.giro = '474100';
                order.folio.recv_giro = '3345678';
                order.folio.recv_cdg = '85484490';
            } else if (type==FOLIO_TYPE_BOLATA) {
                order.folio.rut = '76239805-2';
            } else {
            }
            console.log(order.folio);
        };
        fill_folio_info(); //init at 1st time;

        radio_reciept.addEventListener('click', fill_folio_info);
        radio_bolata.addEventListener('click', fill_folio_info);
        radio_factura.addEventListener('click', fill_folio_info);


    }, 200 );


});

nsHooks.addAction( 'ns-order-submit-successful', 'folio-print-hook', ( result ) => {
    const order = result.data.order;
    var url = '/dashboard/aimvast/factura/folio/pdf?order_id='+order.id;
    console.log("OpenUrl:" + url);
    print_pdf = function (url) {
        var iframe = this._printIframe;
        if (!this._printIframe) {
            iframe = this._printIframe = document.createElement('iframe');
            document.body.appendChild(iframe);

            iframe.style.display = 'none';
            iframe.id = 'printing-folio';
            iframe.onload = function() {
                setTimeout(function() {
                    if(iframe.status == '200') {
                        iframe.focus();
                        iframe.contentWindow.print();
                    }
                }, 1000);
            };
        }
        iframe.src = url;
    }

    if (navigator.userAgent.indexOf("Firefox") != -1) {
        print_pdf(url);
    } else {
        //printJS({printable:url, type:'pdf', showModal:true})
        printJS(url);
    }



})

</script>
