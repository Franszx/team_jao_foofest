
const key = process.env.NEXT_PUBLIC_RESTDB_KEY

export function sendMail(content) {
    fetch('https://foofest-843f.restdb.io/mail', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-apikey': key,
        'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(content)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
    console.error('Error:', error);
    });
}


