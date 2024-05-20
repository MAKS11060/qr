# QR code generator

## Examples

Usage in `HTML`
```html
<img src="https://genqr.deno.dev/svg?text=hello" alt="">

<img src="https://genqr.deno.dev/png?text=world&s=400" alt="">

<img src="https://genqr.deno.dev/svg?text=https%3A%2F%2Fgithub.com%2Fmaks11060%2Fqr&s=500" alt="">
```

Usage in `JS/TS`
```ts
const uri = new URL('https://genqr.deno.dev/svg')
uri.searchParams.set('text', 'hello')
uri.searchParams.set('text', 'https://github.com/maks11060/qr')
uri.searchParams.set('s', '500') // set size
uri.searchParams.set('b', '4') // set border

console.log(uri.toString()) // get encoded url
```

### Query params

| Name          | Default value | Description            |
| ------------- | :-----------: | ---------------------- |
| `text`        |     `""`      | QR Content             |
| `s`           |     `300`     | Size in `px`           |
| `b`           |      `4`      | QR border              |
| [`ecl`](#ecl) |     `LOW`     | Error correction level |


### `ecl`

| value      | Description             |
| ---------- | ----------------------- |
| `LOW`      | 7% erroneous codewords  |
| `MEDIUM`   | 15% erroneous codewords |
| `QUARTILE` | 25% erroneous codewords |
| `HIGH`     | 30% erroneous codewords |
