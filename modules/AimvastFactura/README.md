# Aimvast Folio

## API

### Get Organization Tax Information

URL:
`GET /dashboard/aimvast/factura/folio/info/organization`

Request:

none

Response:

```json
{
    "business_name":"HAULMER SPA",
    "direction":"ARTURO PRAT 527   CURICO",
    "village":"Curic\u00f3",
    "giro":"PRODUCTOS Y SERVICIOS RELACIONADOS CON INTERNET, SOFTWARE, DISPOSITIVO",
    "phone":"+56999999999999",
    "cdg":"81303347",
    "branch":[
        {
            "direction":"AVENIDA AUSTRAL 1814",
            "village":"Puerto Montt",
            "phone":"52 2412361",
            "cdg":"77482211"
        },
        {
            "direction":"COLON ESQUINA SANTA ROSA S\/N",
            "village":"Puerto Varas",
            "phone":null,
            "cdg":"85484490"
        },
        {
            "direction":"CERRO TRONADOR 1613   VALLE VOLCANES",
            "village":"Puerto Montt",
            "phone":"65 2242971",
            "cdg":"82912121"
        }
    ]
}
```

### Get Tax payer's Tax information

URL:
`GET /dashboard/aimvast/factura/folio/info/tax_payer?rut=xxxxxx-y`

Request Parameter:
```
rut=76239805-2
```

Response:
```json
{
    "business_name":"UNCLE BILL SPA",
    "direction":"AVENIDA AUSTRAL 1814",
    "village":"Puerto Montt",
    "phone":"52 2412361",
    "branch":[
        {
            "direction":"AVENIDA AUSTRAL 1814",
            "village":"Puerto Montt",
            "phone":"52 2412361",
            "cdg":"77482211"
        },
        {
            "direction":"COLON ESQUINA SANTA ROSA S\/N",
            "village":"Puerto Varas",
            "phone":null,
            "cdg":"85484490"
        },
        {
            "direction":"CERRO TRONADOR 1613   VALLE VOLCANES",
            "village":"Puerto Montt",
            "phone":"65 2242971",
            "cdg":"82912121"
        }
    ]
}
```

### Get Folio PDF:

URL:
`GET /dashboard/aimvast/factura/folio/pdf?order_id=xxxxxx`

Request Parameter:
```
order_id=123
```

Response:

contain type: application/pdf


