# QR code designer

This is a QR design web app that you can use to create QR codes that have arbitrary designs in the middle section. Compared to other qr designs, this does not take advantage of error correction that QR codes use, but rather deterministically turns some pixels in the code pattern on or off without affecting what the QR code is pointing to.

## Prerequisites

The designer is a Nuxt v2 app, statically generated. It had been part of a larger app that I have separated it from. There may be references to `sw.ink` and `qr.new` lying around; those were the domains I had that the app was being served from.

There are some prerequisites to making QR codes with the designer.

In order to maximize designer space, the url that the QR codes links to is expected to be exactly 25 characters long from the set of [alphanumeric characters](https://en.wikipedia.org/wiki/QR_code#Design) - `0–9, A–Z (upper-case only), space, $, %, *, +, -, ., /, :`

It is currently [hardcoded](https://github.com/kochrt/qr-designer/blob/84d61675083347171018db95ed3fec0215a27bef/components/Design/QRGroup.vue#L138) to be `HTTPS://GITHUB.COM/KOCHRT`.

When I had the `sw.ink` and `qr.new` domains, it would direct to `HTTPS://SW.INK/${QR_ID}` where `QR_ID` would be a 10 alphanumeric-character long id set as part of the link shortening process.

If you want to change this you would do it in [components/Design/QRGroup.vue](components/Design/QRGroup.vue) at line 138.

## Installing and running

Node version 16 is expected.

```bash
> npm i
> npm run generate
> npm run start
```

## Examples

![](static/example_designs/1.png)
![](static/example_designs/2.png)
![](static/example_designs/3.png)
![](static/example_designs/4.png)
![](static/example_designs/5.png)
![](static/example_designs/6.png)
![](static/example_designs/7.png)
![](static/example_designs/8.png)
