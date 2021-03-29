module.exports = {
    database: {
        connectionLimit: 1000,
        host: '96.43.143.58',
        user: 'admin',
        password: 'C0l0mb1@',
        database: 'tqtravel',
        port: 3306
    },
    database1: {
        connectionLimit: 100,
        host: '213.190.6.64',
        user: 'u152781536_samir',
        password: '5a1d4rr1a9A*',
        database: 'u152781536_dbtq'
    },
    database2: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_links'
    },
    registro: {
        pin: 'hola',
        categoria: 'i'
    },
    Google: {
        client_id: "507038552414-0d2oul1ks021a2ajvh7p2771qmoel9ln.apps.googleusercontent.com", // 358691758390-ea426ocipho2d13q7aku48q3gmo9ktal.apps.googleusercontent.com
        project_id: "still-toolbox-253319",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "QRAaQqm5PmIA55bw6N2-hpE2", // lIFar1pydYRrcArlKxTe3S8h
        redirect_uris: [
            "https://tqtravel.herokuapp.com/auth/google/callback",
            "http://localhost:3000/auth/google/callback"
        ],
        javascript_origins: [
            "https://tqtravel.herokuapp.com",
            "http://localhost:3000"
        ]
    },
    Facebook: {
        client_id: '2450123638566580',
        client_secret: '458cba23923008c134dffcf01ad57e59',
        redirect_uris: [
            "https://tqtravel.herokuapp.com/auth/facebook/callback",
            "http://localhost:3000/auth/facebook/callback"
        ]
    },
    Soat: {
        secret_id: 'qM6xM8mN7gW1jN8rE7tH6hC8sJ6qO1tU0tO3hY5wB6wK4hM2gD',
        client_id: '37eb1267-6c33-46b1-a76f-33a553fd812f',
        otro: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTI4Mg.RO7HFV11U1YNtFNpPnCcOIaQcHU72f7tPn3HoOCMXOg'
    },
    Calendario: {
        client_secret: 'QRAaQqm5PmIA55bw6N2-hpE2', // W8_LvfwX552MdYbzN0wfzgGx
        client_id: '281961950966-dqv72su3fjcbhi003no1vp1rrattf8t9.apps.googleusercontent.com',
        redirect_uris: 'http://localhost:3000/calendario'
    }
};