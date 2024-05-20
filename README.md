# QR code generator

## Usage

- `https://qr-maks11060.deno.dev/svg?text=hello`
- `https://qr-maks11060.deno.dev/png?text=world`

Example
```ts
const uri = new URL('https://qr-maks11060.deno.dev/svg')
uri.searchParams.set('text', 'hello')
uri.searchParams.set('text', 'https://google.com')
uri.searchParams.set('s', '500') // set size
uri.searchParams.set('b', '1') // set border

console.log(uri.toString())
```


### Query params

| Name   | Default value | Description  |
| ------ | :-----------: | ------------ |
| `text` |     `""`      | QR Content   |
| `s`    |     `300`     | Size in `px` |
| `b`    |      `4`      | QR border    |
